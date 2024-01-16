import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn}= useAuth();
    // const navigate = useNavigate();
    // const location = useLocation()

    const handleGoogleLogin = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            // const userInfo ={
            //     email: res.user?.email,
            //     name: res.user?.displayName,
            // }
            // axiospublic.post('/users', userInfo)
            // .then(
            //     navigate(location.state?.from.pathname || '/')
            //     // res=>{ console.log(res.data); }
            // )
        })
    }
    return (
        <div className='flex justify-center gap-10 text-3xl'>
            <button><FaFacebook /> </button>
            <button onClick={handleGoogleLogin}><FaGoogle /></button>
            <button><FaGithub /></button>



        </div>
    );
};

export default SocialLogin;