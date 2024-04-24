import { Outlet } from 'react-router-dom'
import { useContext } from "react";
import UserContext from "../contexts/usercontext";

const PrivateRoutes = () => {
    const { user } = useContext(UserContext);
    return(
        user.isAdmin ? <Outlet/> : <><p>Not Authorized</p></>
    )
}

export default PrivateRoutes
