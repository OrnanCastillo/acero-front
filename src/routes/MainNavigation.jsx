import { Route, Routes, useLocation } from "react-router-dom"
import Login from "../pages/Login";
import Tools from "../pages/Tools";
import Materials from "../pages/Materials";
import MovementsHistorial from "../pages/MovementstHistorial";

import PrivateRoutes from "./PrivateRoutes";
import Sidebar from "../components/shared/Sidebar";

const MainNavigation = () => {

    const location = useLocation();
    const hideSidebarRoutes = ["/Login"];
    const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
    
    return (
        <div className="flex h-screen">
            {!shouldHideSidebar && <Sidebar />}
            <div className={`flex-1 ${!shouldHideSidebar ? "lg:ml-0" : ""} overflow-auto`}>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route
                        path="/Herramientas"
                        element={
                            <PrivateRoutes>
                                <Tools />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoutes>
                                <Tools />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="/Materiales"
                        element={
                            <PrivateRoutes>
                                <Materials />
                            </PrivateRoutes>
                        }
                    />
                    <Route
                        path="/Historial"
                        element={
                            <PrivateRoutes>
                                <MovementsHistorial />
                            </PrivateRoutes>
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}

export default MainNavigation;
