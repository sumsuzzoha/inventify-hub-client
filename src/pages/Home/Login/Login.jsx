
// import { useEffect, useRef, useState, } from 'react';
import logo from '../../../assets/SignUser.png'
// import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    // const captchaRef = useRef(null);
    // const [disabled, setDisabled] = useState(true);
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // console.log(location.state)



    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = data => {
        logIn(data.email, data.password)
            .then(
                // (result) => {
                //     console.log('signin', result.user)
                // }
                navigate(from, { replace: true })
            )
            .catch(() => {
                // const errorMessage = error.message;
            });

    }

    // const handleValidateCaptcha = (e) => {
    //     e.preventDefault();
    //     const userCaptchaValue = captchaRef.current.value;
    //     if (validateCaptcha(userCaptchaValue) === true) {
    //         setDisabled(false);
    //     }
    // }

    return (
        <>
            <Helmet>
                <title>Inventify Hub || Login</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>

            <div>
                <div className="hero min-h-screen">
                    <div className="hero-content shadow-2xl rounded-lg flex-col lg:flex-row-reverse">
                        <div className="hidden md:block md:w-[450px] mx-auto my-auto">
                            <img src={logo} className='w-[450px] h-[450px]' alt="" />
                        </div>
                        <div className="card shrink-0 w-[350px]  ">
                            <div className='px-10'>
                                <h3 className='text-3xl font-bold my-2'>Login Here</h3>
                                <p>Login to stay connected</p>
                            </div>
                            <form onSubmit={handleSubmit(handleLogin)} className="card-body space-y-3">
                                <div className="form-control">
                                    <input
                                        type="email"
                                        {...register('email', { required: 'Email is required' })}
                                        placeholder="Email"
                                        className="input input-bordered"
                                    />
                                    {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
                                    {/* {errors.email && <span></span>} */}
                                </div>

                                <div className="form-control">
                                    <input
                                        type="password"
                                        {...register('password', { required: 'Password is required' })}
                                        placeholder="Password"
                                        className="input input-bordered"
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>

                                {/* <div className="form-control">
                                    <label className="lebel m-2">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <div className="join w-full border">
                                        <input
                                            ref={captchaRef}
                                            className="input input-bordered w-full join-item"
                                            // {...register('captcha', { required: 'Captcha is required' })}
                                            type="text"
                                            placeholder="Enter the captcha"
                                        />
                                        <button onClick={handleValidateCaptcha} className="btn btn-outline join-item rounded-r-lg">Submit</button>
                                    </div>
                                    {errors.captcha && <span>{errors.captcha.message}</span>}
                                </div> */}

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-outline btn-info text-lg">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className='text-center space-y-4 mb-4'>
                                <p>New here?? <span className="link link-hover link-primary"><Link to='/register'>Create a New Account</Link></span></p>
                                <p>or login with</p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;