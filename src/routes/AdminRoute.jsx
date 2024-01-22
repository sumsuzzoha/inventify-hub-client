import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router-dom';
import AuthLoading from '../components/Loading/AuthLoading';

const AdminRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading, logOut } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user && role === 'admin') {
        return children;
    } else {
        logOut();
        return (<Navigate to='/login' state={{ from: location }} replace></Navigate>);
    }
};
AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;