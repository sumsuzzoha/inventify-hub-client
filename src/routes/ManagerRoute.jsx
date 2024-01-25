import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import AuthLoading from '../components/Loading/AuthLoading';
import useRole from '../hooks/useRole';
import Error403 from '../othersPages/Error403/Error403';


const ManagerRoute = ({ children }) => {
    // const [user, isLoading]= useAuth();
    const { user, loading,  } = useAuth();
    const [role, isRoleLoading] = useRole();
    // const location = useLocation();

    if (loading || isRoleLoading) {
        return <AuthLoading></AuthLoading>

    }
    if (user && role === 'storeManager') {
        return children;
    }else {
        return <Error403></Error403>;
    }

};
ManagerRoute.propTypes = {
    children: PropTypes.node
};

export default ManagerRoute;