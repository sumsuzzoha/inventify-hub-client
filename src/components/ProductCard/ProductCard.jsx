import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import useProduct from '../../hooks/useProduct';

const ProductCard = ({product,refetch}) => {
    // console.log(typeof product)
    // console.log(typeof refetch)
    const { _id, name, image, price, stock, saleCount, } = product;
    const axiosSecure = useAxiosSecure();
    // const[, refetch]= useProduct();
    // console.log(refetch)

    const handleUpdate = () => {
        console.log('Update')

    }
    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
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
        <div className="bg-white w-full max-w-sm p-4 rounded-md shadow-md">
            <div className="mb-4">
                <img src={image} alt={`productName`} className="w-full h-32 object-cover rounded-md" />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-600 mb-2">Price: ${price}</p>
                <p className="text-gray-600 mb-2">Stock Quantity: {stock}</p>
                <p className="text-gray-600 mb-4">Sale Count: {saleCount}</p>
                <div className="flex justify-between space-x-">
                    <button onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >Update</button>
                    <button onClick={() => handleDelete(_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
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
