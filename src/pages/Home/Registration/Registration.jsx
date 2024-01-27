import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/SignUser.png'
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const Registration = () => {
    const { createUser, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        const { email, password, name, photoUrl } = data;
        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        // set users info in DB 
                        const userInfo = {
                            name: name,
                            email: email,
                            role: 'user',                   
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Successeded",
                                        text: "User created successfully",
                                        icon: "success"
                                    });
                                    navigate('/');
                                    reset();
                                }else{
                                    Swal.fire({
                                        title: "Warning",
                                        text: "Problem found with useremail. Contact with IT Dept.",
                                        icon: "warning"
                                    });
                                    navigate('/');
                                }
                            })
                        // Profile updated!
                    }).catch(() => {
                    });
            })
            .catch(() => {
            })
    };

    return (
        <>
            <Helmet>
                <title>Inventify Hub | Registration</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <div >
                <div className="hero min-h-screen">
                    <div className="hero-content shadow-2xl rounded-lg flex-col lg:flex-row-reverse">
                        <div className="hidden md:block md:w-[450px] mx-auto my-auto">
                            <img src={logo} className='w-[450px] h-[450px]' alt="" />
                        </div>
                        <div className="card shrink-0 w-[350px]  ">
                            <div className='px-10'>
                                <h3 className='text-3xl font-bold my-2'>Registration Here</h3>
                                <p>Create your account on Inventify</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-2">
                                <div className="form-control">
                                    <input type="text" {...register("name", { required: true })} placeholder="Full name" className="input input-bordered" />
                                    {errors.name && <span className='text-red-400'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo url" className="input input-bordered" />
                                    {errors.name && <span className='text-red-400'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                    {errors.email && <span className='text-red-400'>Email is required</span>}
                                </div>
                                <div className=''>
                                    <div className="form-control">
                                        <input type="password"
                                            {...register("password",
                                                {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters long",
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|[\]{};:/<>,.])(?=.*[0-9]).{6,}$/,
                                                        message: "Password should contain at least one uppercase letter, one lowercase letter, and one special character",
                                                    }
                                                }
                                            )}
                                            aria-invalid={errors.password ? "true" : "false"}
                                            placeholder="Password" className="input input-bordered" />
                                        {errors.password && <p role="alert">{errors.password.message}</p>}

                                    </div>

                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className="btn btn-outline btn-info text-lg" value='Submit' />
                                </div>
                            </form>
                            <div className='text-center mb-4'>
                                <p>Already register?? <span><Link to='/login'>Go to login</Link></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Registration;