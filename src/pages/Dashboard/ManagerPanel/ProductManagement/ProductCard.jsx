import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    // console.log(product);
    const { name, image, price, stock, saleCount, } = product;

    const handleUpdate = () => {
        console.log('Update')

    }
    const handleDelete = () => {
        console.log('Delete')

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
                    <button onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >Delete</button>
                </div>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    product: PropTypes.object,
  };

export default ProductCard;
