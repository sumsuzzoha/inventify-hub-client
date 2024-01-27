import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateShop = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Create it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const imgFile = { image: data.shopLogo[0] }
                const res = await axiosPublic.post(image_hosting_api, imgFile, {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                });
                if (res.data.success == true) {
                    const shopInfo = {
                        shopId: data.shopName,
                        shopName: data.shopName,
                        shopDetails: data.shopDetails,
                        shopLocation: data.shopLocation,
                        shopOwnerEmail: user.email,
                        shopOwnerName: user.displayName,
                        shopLogo: res.data.data.display_url,
                        shopEmployees: [
                            user.email,

                        ],
                        package: 'Bronze Pack',
                        productLimit: 3,
                        lineOfProduct: 0,

                    }
                    const shopRes = await axiosSecure.post('/addShop', shopInfo)
                    if (shopRes.data.insertedId) {
                        Swal.fire({
                            title: "Created!",
                            text: "Your Shop has been Created.",
                            icon: "success"
                        });
                        reset();
                        navigate('/');
                    } else {
                        Swal.fire({
                            title: "Failed!",
                            text: `Your ${data.shopName} is already exist or You have Already a Shop`,
                            icon: "error"
                        });
                    }

                }


            }
        });

    };






    return (
        <div>
            <Helmet>
                <title>Inventify Hub || Create Shop</title>
            </Helmet>
            <div className='card shrink-0 mb-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='card-body w-full max-w-lg lg:max-w-2xl mx-auto'>
                    <div className="form-control">
                        <input type="text" {...register("shopName", { required: true })} placeholder="Shop Name" className="input input-bordered" />
                        {errors.shopName && <span className='text-red-400'>Shop Name is required</span>}
                    </div>


                    <div className="form-control">
                        {/* <input type="text" {...register("shopName", { required: true })}  /> */}
                        <textarea {...register('shopDetails', { required: true })} placeholder="Shop Info (Description)" className="input input-bordered" />
                        {errors.shopName && <span className='text-red-400'>Shop Name is required</span>}
                    </div>

                    <div className="form-control">
                        <input {...register('shopLocation', { required: true })} placeholder="Shop Address" className="input input-bordered" />
                        {errors.shopName && <span className='text-red-400'>Shop Name is required</span>}
                    </div>

                    <div className="form-control">
                        <input type="file" {...register('shopLogo', { required: true })} className="file-input file-input-bordered w-full max-w-x" />
                        {errors.shopName && <span className='text-red-400'>Shop Name is required</span>}
                    </div>

                    <div className="form-control">
                        <input {...register('shopOwnerEmail',)} defaultValue={user.email} disabled placeholder="Shop-Owner Email" className="input input-bordered" />
                        {/* {errors.shopName && <span className='text-red-400'>Shop Name is required</span>} */}
                    </div>
                    <div className="form-control">
                        <input {...register('shopOwnerName',)} defaultValue={user.displayName} disabled placeholder="Shop-Owner Name" className="input input-bordered" />
                        {/* {errors.shopName && <span className='text-red-400'>Shop Name is required</span>} */}
                    </div>

                    {/* <div className="form-control">
                    <input {...register('shopLocation', { required: true })} placeholder="Shop Location" className="input input-bordered" />
                    {errors.shopName && <span className='text-red-400'>Shop Name is required</span>}
                </div> */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn  btn-info text-lg">Create Shop</button>
                    </div>
                </form>
                <div className="divider px-10 w-full max-w-lg lg:max-w-2xl mx-auto">OR</div>
                <div className="card-body w-full max-w-lg lg:max-w-2xl mx-auto">
                    <Link to='/joinShop'><button type="submit" className="btn  btn-warning text-lg w-full max-w-lg lg:max-w-2xl mx-auto text-center">Join in Shop</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CreateShop;


// [
//     {
//         shopId: data.shopName,
//         shopName: data.shopName,
//         shopDetails: data.shopDetails,
//         shopLocation: data.shopLocation,
//         shopOwnerEmail: user.email,
//         shopOwnerName: user.displayName,
//         shopLogo: res.data.data.display_url,
//         shopEmployes: [
//             'sarah.jones@email.com',
//             'alex.smith@email.com',
//             'david.miller@email.com',
//         ],
//         productLimit: 3,
//         lineOfProduct: 0,
//     },
//     {
//         shopId: data.shopName,
//         shopName: data.shopName,
//         shopDetails: data.shopDetails,
//         shopLocation: data.shopLocation,
//         shopOwnerEmail: user.email,
//         shopOwnerName: user.displayName,
//         shopLogo: res.data.data.display_url,
//         shopEmployes: [
//             'sarah.jones@email.com',
//             'alex.smith@email.com',
//             'david.miller@email.com',
//         ],
//         productLimit: 3,
//         lineOfProduct: 0,
//     },
//     {
//         shopId: "techhaven0001",
//         shopName: "Tech Haven",
//         shopDetails: "Computers, Smartphones, Audio Devices",
//         shopLocation: "456 Innovation Avenue, Techland",
//         shopOwnerEmail: "alex.smith@email.com",
//         shopOwnerName: "AlexSmith",
//         shopEmployes: [
//             'sarah.jones@email.com',
//             'alex.smith@email.com',
//             'david.miller@email.com',
//         ],
//         shopLogo: "https://i.ibb.co/hdqFBRt/Photo300x300.jpg",
//         productLimit: 3,
//         lineOfProduct: 3
//     },
//     {
//         shopId: "techhaven0006",
//         shopName: "Tech Garden",
//         shopDetails: "Computers, Smartphones, Audio Devices",
//         shopLocation: "456 Innovation Avenue, Techland",
//         shopOwnerEmail: "alex.smith@email.com",
//         shopOwnerName: "AlexSmith",
//         shopEmployes: [
//             'olivia.wilson@email.com',
//             'jason.davis@email.com',
//             'lisa.thomas@email.com',
//         ],
//         shopLogo: "https://i.ibb.co/hdqFBRt/Photo300x300.jpg",
//         productLimit: 3,
//         lineOfProduct: 3
//     },
// ]