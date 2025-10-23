import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Hammer, Warehouse, LogOut, ChevronDown, ChevronRight, History, HardHat } from "lucide-react";
import logo from "../../assets/logo.png";
import useAuthContext from "../../hooks/useAuthContext";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    const { handleLogout } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = (name) =>
        setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));

    const isActive = (href, children) => {
        if (href && href !== "#") {
            return location.pathname === href;
        }
        if (children?.length) {
            return children.some((c) => location.pathname === c.href);
        }
        return false;
    };

    const handleNavigation = (href) => {
        if (href && href !== "#") {
            navigate(href);
            setSidebarOpen(false);
        } else {
            handleLogout();
        }
    };

    const navigation = [
        { name: "Herramientas", href: "/Herramientas", icon: Hammer },
        {
            name: "Materiales",
            href: null,
            icon: Warehouse,
            children: [
                { name: "Vigas", href: "/Materiales/Vigas" },
            ],
        },
        { name: "Historial movimientos", href: "/Historial", icon: History },
        { name: "Obras", href: "/Obras", icon: HardHat },
        { name: "Cerrar sesión", href: "#", icon: LogOut },
    ];

    const NavList = ({ vertical = false }) => (
        <ul className="space-y-1">
            {navigation.map((item) => {
                const active = isActive(item.href, item.children);
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;

                const MainButton = (
                    <button
                        onClick={() => (hasChildren ? toggleMenu(item.name) : handleNavigation(item.href))}
                        className={classNames(
                            active ? "bg-red-50 border-red-500 text-red-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "w-full group flex items-center justify-between px-3 py-3 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-200 text-left"
                        )}
                        aria-expanded={!!openMenus[item.name]}
                        aria-controls={hasChildren ? `submenu-${item.name}` : undefined}
                    >
                        <div className="flex items-center">
                            {item.icon && (
                                <item.icon
                                    className={classNames(
                                        active ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                                        "mr-3 h-5 w-5 flex-shrink-0"
                                    )}
                                />
                            )}
                            {item.name}
                        </div>

                        {hasChildren ? (
                            <span className="ml-2">
                                {openMenus[item.name] ? (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                )}
                            </span>
                        ) : null}
                    </button>
                );

                return (
                    <li key={item.name}>
                        {MainButton}

                        {hasChildren && (
                            <div
                                id={`submenu-${item.name}`}
                                className={classNames(
                                    openMenus[item.name] ? "max-h-96" : "max-h-0",
                                    "overflow-hidden transition-[max-height] duration-300 ease-in-out"
                                )}
                            >
                                <ul className={classNames(vertical ? "ml-6" : "ml-6", "mt-1 space-y-1")}>
                                    {item.children.map((child) => {
                                        const childActive = location.pathname === child.href;
                                        return (
                                            <li key={child.name}>
                                                <button
                                                    onClick={() => handleNavigation(child.href)}
                                                    className={classNames(
                                                        childActive
                                                            ? "bg-red-50 text-red-700"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                        "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200"
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            childActive ? "text-red-500" : "text-gray-400",
                                                            "mr-2 h-4 w-4"
                                                        )}
                                                    >
                                                        *
                                                    </span>
                                                    {child.name}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <>
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </div>
            )}

            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden bg-white shadow-md"
            >
                <Menu className="h-6 w-6" />
            </button>

            <div
                className={classNames(
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto"
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src={logo} alt="Diseño y Acero" className="h-10 w-10 rounded-full object-cover" />
                        </div>
                        <div className="ml-3">
                            <h2 className="text-lg font-semibold text-gray-900">Diseño y Acero</h2>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-4 px-4 pb-4">
                    <NavList vertical />
                </nav>
            </div>

            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-80 bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img src={logo} alt="Diseño y Acero" className="h-10 w-10 rounded-full object-cover" />
                            </div>
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold text-gray-900">Diseño y Acero</h2>
                                <p className="text-xs text-gray-500">Manejo de Inventario</p>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-4 flex-1 px-4 pb-4 overflow-y-auto">
                        <NavList />
                    </nav>
                </div>
            </div>
        </>
    );
}
