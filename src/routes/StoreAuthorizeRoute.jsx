import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import AuthLoading from '../components/Loading/AuthLoading';
import useRole from '../hooks/useRole';


const StoreAuthorizeRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading, logOut } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user && role === 'storeManager') {
        return children;
    }
    if (user && role === 'shopKeeper') {
        return children;
    }
    else {
        logOut();
        return (<Navigate to='/login' state={{ from: location }} replace></Navigate>);
    }

};
StoreAuthorizeRoute.propTypes = {
    children: PropTypes.node
};

export default StoreAuthorizeRoute;