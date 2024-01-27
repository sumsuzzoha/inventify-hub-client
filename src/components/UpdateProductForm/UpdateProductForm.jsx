import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProductForm = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [dataLoaded, setDataLoaded] = useState(false);
  // State to store product data
  const [product, setProduct] = useState(null);


  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      productName: '',
      productCategory: '',
      productLocation: '',
      productQuantity: '',
      productDiscount: '',
      productionCost: '',
      profitMargin: '',
      productImage: '', // File inputs cannot have default values for security reasons
      productDescription: '',
    },
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/product/${id}`);
        setProduct(res.data);

        // Reset the form with loaded data
        reset({
          productName: res.data?.name || '',
          productCategory: res.data?.category || '',
          productLocation: res.data?.productLocation || '',
          productQuantity: res.data?.stockQuantity || '',
          productDiscount: res.data?.discount || '',
          productionCost: res.data?.productionCost || '',
          profitMargin: res.data?.profitMargin || '',
          productImage: '',
          productDescription: res.data?.description || '',
        });

        setTimeout(() => {
          setDataLoaded(true);
        }, 1500);
      } catch (error) {
        // Handle error if needed
        console.error(error);
        setDataLoaded(true); // Set to true even on error to stop loading
      }
    };

    fetchData();
  }, [axiosSecure, id, reset]);



  const onSubmit = (data) => {
    const productionCost = parseFloat(data.productionCost);
    const profitMargin = parseFloat(data.profitMargin);

    // Calculate SellingPrice based on the provided formula
    const buyingPrice = productionCost + productionCost * 0.075;
    const profitAmount = (buyingPrice * profitMargin) / 100;
    const formatedSellingPrice = (buyingPrice + profitAmount).toFixed(2);
    const sellingPrice = parseFloat(formatedSellingPrice);

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

        let image = product.image;

        if (data.productImage) {
          const imgFile = { image: data.productImage[0] }
          const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
              "content-type": "multipart/form-data",
            }
          });
          image = res.data.data.display_url;
        }
        const productInfo = {
          name: data.productName,
          image: image,
          category: data.productCategory,
          stockQuantity: parseInt(data.productQuantity),
          productLocation: data.productLocation,
          productionCost: parseFloat(data.productionCost),
          buyingPriceWhVat: parseFloat(buyingPrice),
          profitMargin: parseFloat(data.profitMargin),
          discount: parseFloat(data.productDiscount),
          description: data.productDescription,
          sellingPrice: sellingPrice,
        }
        const response = await axiosSecure.patch(`/updateProduct/${product._id}`, productInfo);

        if (response.data.acknowledged == true) {
          Swal.fire({
            title: "Updated",
            text: `Your product ${productInfo?.name} has been updated.`,
            icon: "success"
          });
          reset();
        }
      }
    });
  };

  if (!dataLoaded) {
    return <>
      <div className='text-center my-20'>
        <span className="loading loading-spinner text-accent"></span>

      </div>
    </>;
  }

  return (
    <div>
      <Helmet>
        <title>Inventify Hub | Update Product</title>
      </Helmet>
      <div className="bg-blue-500 p-4 ">
        <div>
          <h3 className='text-3xl font-bold py-4'>Update Product</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-2">
          <div className="w-full">
            <label >Product Name</label>
            <input
              className="input input-bordered w-full max-w-x"
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
              <input type="file" {...register('productImage',)} className="file-input file-input-bordered w-full max-w-x" />
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
            Update Product
          </button>
        </form>
      </div>

    </div>
  );
};

export default UpdateProductForm;
