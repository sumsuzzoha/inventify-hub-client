import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import AuthLoading from '../components/Loading/AuthLoading';
import useRole from '../hooks/useRole';
import Error403 from '../othersPages/Error403/Error403';


const AdminManagerRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading,  } = useAuth();
    const [role, isRoleLoading] = useRole();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user && role === 'admin') {
        return children;
    }
    if (user && role === 'storeManager') {
        return children;
    }
    else {
        return <Error403></Error403>;
    }

};
AdminManagerRoute.propTypes = {
    children: PropTypes.node
};

export default AdminManagerRoute;