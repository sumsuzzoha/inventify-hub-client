import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProductForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        const productionCost = parseFloat(data.productionCost);
        const profitMargin = parseFloat(data.profitMargin);

        // Calculate SellingPrice based on the provided formula
        const buyingPrice = productionCost + productionCost * 0.075;
        const profitAmount = (buyingPrice * profitMargin) / 100;
        const sellingPrice = buyingPrice + profitAmount;

        // configure th date formated
        const addedDate = new Date();
        const formattedDate = addedDate.toLocaleString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });



        // console.log(productInfo);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const imgFile = { image: data.productImage[0] }
                    // console.log(imgFile);
                    const res = await axiosPublic.post(image_hosting_api, imgFile, {
                        headers: {
                            "content-type": "multipart/form-data",
                        }
                    });
                    if (res.data.success == true) {
                        const productInfo = {
                            name: data.productName,
                            image: res.data.data.display_url,
                            category: data.productCategory,
                            stockQuantity: parseInt(data.productQuantity),
                            productLocation: data.productLocation,
                            productionCost: parseFloat(data.productionCost),
                            profitMargin: parseFloat(data.profitMargin),
                            discount: parseFloat(data.productDiscount),
                            description: data.productDescription,
                            sellingPrice: sellingPrice,
                            productAddedDate: formattedDate,
                            saleCount: 0,
                            shopOwnerEmail: user.email,
                            shopOwnerName: user.displayName,
                
                
                        }                        
                        const response = await axiosSecure.post('/addProduct', productInfo);
                        console.log(response);

                        if (response.data.insertedId) {
                            Swal.fire({
                                title: "Added!",
                                text: `Your product ${productInfo?.name} has been Addeded.`,
                                icon: "success"
                            });
                        }
                    }

                } catch (error) {
                    // TODO: navigate to Increase Limit page
                    Swal.fire({
                        title: "Error",
                        text: "Your Product limit is over. Please increase the limit.",
                        icon: "error"
                    });
                }




            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Product Form</title>
            </Helmet>
            <div className="bg-blue-500 p-4 ">
                <div>
                    <h3 className='text-3xl font-bold py-4'>Product Form</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-2">
                    <div className="w-full">
                        <label >Product Name</label>
                        <input
                            className="input input-bordered w-full max-w-x"
                            placeholder='Product Name'
                            {...register('productName', { required: 'Product Name is required' })}
                        />
                        {errors.productName && <span className="text-red-500">{errors.productName.message}</span>}
                    </div>
                    <div className='md:flex gap-4'>
                        <div className="w-full">
                            <label >Product Category</label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-x"
                                placeholder='Product Category'
                                {...register('productCategory', { required: 'Product Category is required' })}
                            />
                            {errors.productCategory && (
                                <span className="text-red-500">{errors.productCategory.message}</span>
                            )}
                        </div>
                        <div className="w-full">
                            <label >Product Location</label>
                            <input
                                type='text'
                                className="input input-bordered w-full max-w-x"
                                {...register('productLocation', { required: 'Product Location is required' })}
                            />
                            {errors.productLocation && (
                                <span className="text-red-500">{errors.productLocation.message}</span>
                            )}
                        </div>
                    </div>
                    <div className='md:flex gap-4 w-full'>
                        <div className="w-full">
                            <label >Product Quantity</label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-x"
                                {...register('productQuantity', { required: 'Product Quantity is required' })}
                            />
                            {errors.productQuantity && (
                                <span className="text-red-500">{errors.productQuantity.message}</span>
                            )}
                        </div>
                        <div className="w-full">
                            <label >Discount (%)</label>
                            <input
                                type='text'
                                className="input input-bordered w-full max-w-x"
                                {...register('productDiscount', { required: 'Discount is required' })}
                            />
                            {errors.productDiscount && (
                                <span className="text-red-500">{errors.productDiscount.message}</span>
                            )}
                        </div>
                    </div>
                    <div className='md:flex gap-4'>
                        <div className="w-full">
                            <label>Production Cost</label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-x"
                                {...register('productionCost', { required: 'Production Cost is required' })}
                            />
                            {errors.productionCost && (
                                <span className="text-red-500">{errors.productionCost.message}</span>
                            )}
                        </div>
                        <div className="w-full">
                            <label>Profit Margin (%)</label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-x"
                                {...register('profitMargin', { required: 'Profit Margin is required' })}
                            />
                            {errors.profitMargin && (
                                <span className="text-red-500">{errors.profitMargin.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Image Uploading System</label>
                        <div className="w-full">
                            <input type="file" {...register('productImage', { required: 'Product Image is required' })} className="file-input file-input-bordered w-full max-w-x" />
                            {errors.productImage && (
                                <span className="text-red-500">{errors.productImage.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Product Description</label>
                        <textarea className="input input-bordered w-full max-w-x" {...register('productDescription')} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Add Product
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AddProductForm;
