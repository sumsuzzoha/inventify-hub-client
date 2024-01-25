import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import AuthLoading from '../components/Loading/AuthLoading';
import Error403 from '../othersPages/Error403/Error403';

const AdminRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading, } = useAuth();
    const [role, isRoleLoading] = useRole();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user && role === 'admin') {
        return children;
    } else {
        return <Error403></Error403>;
    }
};
AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;