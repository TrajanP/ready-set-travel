//Library Imports
import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
//Middleware Imports
import { UserContext } from '../context/UserContext';

export const PrivateRoutes = () => {

    const { user, setUser } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(user.isAuth);

    return (
        user.isAuth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;