import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, refetch }) => {
    const { _id, name, image, sellingPrice, stockQuantity, saleCount, } = product;
    const axiosSecure = useAxiosSecure();

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteProduct/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }
    return (
        <div className="bg-white w-full  max-w-sm p-4 rounded-md shadow-md text-left">
            <div className=" w-[280px] h-[280px] mx-auto mb-4 border">
                <img src={image} alt={name} className="w-[280px] h-[280px] object-fit rounded-xl" />
            </div>
            <div className='w-[320px] h-[200px] mx-auto'>
                <h2 className="text-lg font-semibold mb-2">{name}</h2>
                <p className="text-lg text-gray-600 mb-2">Price: ${sellingPrice}</p>
                <p className="text-lg text-gray-600 mb-2">Stock Quantity: {stockQuantity}</p>
                <p className="text-lg text-gray-600 mb-4">Sale Count: {saleCount}</p>
                <div className="flex justify-between bg-gray-200 px-4 py-2 rounded">
                    <Link to={`/dashboard/productManagement/updateProduct/${_id}`}><button
                        className="text-lg btn btn-sm btn-outline btn-info"
                    >Update</button></Link>
                    <button onClick={() => handleDelete(_id)}
                        className="text-lg btn btn-sm btn-outline btn-warning"
                    >Delete</button>
                </div>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    product: PropTypes.object,
    refetch: PropTypes.func,
};

export default ProductCard;
