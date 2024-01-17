import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import AuthLoading from '../components/Loading/AuthLoading';
import useRole from '../hooks/useRole';


const ManagerRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user || role === 'storeManager') {
        return children;
    }
    return (<Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};
ManagerRoute.propTypes = {
    children: PropTypes.node
};

export default ManagerRoute;