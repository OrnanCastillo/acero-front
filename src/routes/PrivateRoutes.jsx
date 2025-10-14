import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoutes = ({ children }) => {
    const { user } = useAuthContext();

    return user ? children : <Navigate to="/Login" />;
};

export default PrivateRoutes;
