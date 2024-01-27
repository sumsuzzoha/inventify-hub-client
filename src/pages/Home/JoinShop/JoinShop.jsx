import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth'; // Replace with your actual path
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const JoinShop = () => {
    const { user, loading } = useAuth();
    
    const axiosSecure = useAxiosSecure();
    const [selectedShop, setSelectedShop] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const { data: recruiterShops = [], } = useQuery({
        queryKey: [user?.email, 'recruiterShops'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/recruiterShops`);
            return res.data;
        }
    });

    const allVacancies = recruiterShops.reduce((acc, shop) => {
        return [...acc, ...shop.vacancies];
    }, []);
    // use a Set to collect unique values in array
    const uniqueVacancies = [...new Set(allVacancies)];

    const filteredRecruiterShops = recruiterShops.filter(shop => shop.vacancies.includes(selectedPost));

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            candidateName: user.displayName || '',
            candidateEmail: user.email || '',
            candidateImage: user.photoURL || '',
            candidateAddress: '',
            joinReason: '',
            joinPost: '',
            selectedShopId: '',
            selectedShopName: '',
            requests: 'pending',
        },
    });

    const handleShopSelect = (shopId) => {
        setValue('selectedShopId', shopId);
        const selectedShopDetails = recruiterShops.find((shop) => shop.shopId === (shopId));
        setSelectedShop(selectedShopDetails);
        setValue('selectedShopName', selectedShopDetails.shopName);
    };
    const handlePostSelect = (post) => {
        setValue('joinPost', post);
        setSelectedPost(post);
    };

    const onSubmit = (data) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/joinRequest', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                title: "Done",
                                text: "Your Join request submited.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Failed",
                            text: "Your Join request failed.",
                            icon: "error"
                        });
                    });
            }
        });


   };

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Join a Shop</title>
            </Helmet>
            <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">User Information</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="candidateName">
                                User Name
                            </label>
                            <input
                                type="text"
                                id="candidateName"
                                {...register('candidateName', { required: 'This field is required.' })}
                                className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 ${errors.candidateName && 'border-red-500'
                                    }`}
                            />
                            {errors.candidateName && (
                                <p className="text-red-500 text-sm mt-1">{errors.candidateName.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="candidateEmail">
                                User Email
                            </label>
                            <input
                                type="email"
                                id="candidateEmail"
                                {...register('candidateEmail', { required: 'This field is required.' })}
                                className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 ${errors.candidateEmail && 'border-red-500'
                                    }`}
                            />
                            {errors.candidateEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.candidateEmail.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="candidateAddress">
                                User Address
                            </label>
                            <input
                                type="text"
                                id="candidateAddress"
                                {...register('candidateAddress', { required: 'This field is required.' })}
                                className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 ${errors.candidateAddress && 'border-red-500'
                                    }`}
                            />
                            {errors.candidateAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.candidateAddress.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="joinReason">
                                Why do you want to join this shop (30 words)?
                            </label>
                            <textarea
                                id="joinReason"
                                {...register('joinReason', { required: 'This field is required.' })}
                                rows="4"
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            ></textarea>
                            {errors.joinReason && (
                                <p className="text-red-500 text-sm mt-1">{errors.joinReason.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="joinPost">
                                Join Post
                            </label>
                            <select
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                onChange={(e) => handlePostSelect(e.target.value)}
                            >
                                <option value="" >
                                    Select a Post
                                </option>
                                {uniqueVacancies.map((vacancy, idx) => (
                                    <option key={idx} value={vacancy}>
                                        {vacancy}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">Select a Shop</h2>
                        <select
                            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={(e) => handleShopSelect(e.target.value)}
                        >
                            <option value="" >
                                Select a Shop
                            </option>
                            {filteredRecruiterShops.map((shop) => (
                                <option key={shop._id} value={shop.shopId}>
                                    {shop.shopName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Shop Information Display */}
                    {selectedShop && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold mb-2">Shop Information</h3>
                            <img className="w-full h-auto mb-2" src={selectedShop.shopLogo} alt={selectedShop.shopName} />
                            <p className="text-xl mb-1">Name: {selectedShop.shopName} <span className='text-sm'>{selectedShop.shopId}</span></p>
                            <p className=" mb-1">Location: {selectedShop.shopLocation}</p>
                            <p className="text-sm mb-4">Description: {selectedShop.shopDetails}</p>
                        </div>
                    )}


                    <button
                        className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
                        type="submit"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinShop;
