import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import AuthLoading from "../components/Loading/AuthLoading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <AuthLoading></AuthLoading>
    }
    if (user) {
        return children;
    }
    return (<Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};
PrivateRoute.propTypes = {
    children: PropTypes.node
};
export default PrivateRoute;