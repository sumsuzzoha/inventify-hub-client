import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import AuthLoading from "../components/Loading/AuthLoading";

const Main = () => {
    const { loading } = useAuth();
    const location = useLocation();
    const hideNavFoot = location.pathname.includes('login') || location.pathname.includes('register');

    if (loading) {
        <AuthLoading></AuthLoading>
    }

    return (
        <div>
            {hideNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
            {hideNavFoot || <Footer></Footer>}
        </div>
    );
};

export default Main;