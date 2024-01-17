import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleLogIn}= useAuth();
    const axiosPublic = useAxiosPublic();
    
    const navigate = useNavigate();
    // const location = useLocation()

    const handleGoogleLogin = ()=>{
        googleLogIn()
        .then(res=>{
            console.log(res.user);
            const userInfo ={
                name: res.user?.displayName,
                email: res.user?.email,
                role: 'user',
            }
            axiosPublic.post('/users', userInfo)
            .then(
                navigate(location.state?.from.pathname || '/')
                // res=>{ console.log(res.data); }
            )
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