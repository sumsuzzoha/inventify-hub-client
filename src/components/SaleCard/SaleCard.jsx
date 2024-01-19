import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SaleCard = ({ product }) => {
    // console.log(product);
    const { productId, name, image, stockQuantity, discount, sellingPrice } = product;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const formattedSellingPrice = parseInt(sellingPrice);
    const totalPriceWithDiscount = sellingPrice - (sellingPrice * discount) / 100;
    const formattedTotalPrice = totalPriceWithDiscount.toFixed(2);

    const handleCheckOut = () => {

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
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const cartItem = {
                    productId: productId,
                    name: name,
                    image: image,
                    discount: discount,
                    sellingPrice: sellingPrice,
                    totalPriceWhDisc: parseFloat(formattedTotalPrice),
                    issueBy: user.email,
                    issueDate: formattedDate,
                }
                axiosSecure.post('/carts', cartItem)
                    .then(() => {
                        // console.log(res.data)
                        Swal.fire({
                            title: "Addeded",
                            text: `${name} has been addeded.`,
                            icon: "success"
                        });
                    })
            }
        });
    }

    return (
        <div className="bg-base-100 rounded-lg overflow-hidden shadow-lg max-w-sm">
            <img className="w-full h-48 p-2 object-cover object-center" src={image} alt={name} />
            <div className="p-4">
                <div className="text-gray-700 font-semibold">Product ID: {productId}</div>
                <div className="text-xl text-gray-900 leading-tight mb-2">{name}</div>
                <div className="mb-2">
                    <span className="text-gray-700">Quantity: {stockQuantity}</span>
                    <span className="ml-4 text-gray-700">Discount: {discount}%</span>
                </div>
                <div className="font-bold mb-2">Selling Price: ${formattedSellingPrice}</div>
                <div className="text-green-500 font-bold">Sell price after Discount: ${formattedTotalPrice}</div>
            </div>
            <div className="p-2 ">
                <button onClick={() => handleCheckOut(product)} className="btn btn-warning btn-sm w-full mx-auto">Check-out</button>
            </div>
        </div>
    );
};
SaleCard.propTypes = {
    product: PropTypes.object
};
export default SaleCard;
