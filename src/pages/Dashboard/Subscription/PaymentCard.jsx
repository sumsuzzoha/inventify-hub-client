import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const PaymentCard = ({ amount, limit, description }) => {
    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64">
            <h3 className="text-xl font-semibold mb-4">Payment Plan</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link to={`/dashboard/payment/${amount}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Pay ${amount}</button>
            </Link>
            <p className="mt-4">Increased Limit: {limit}</p>
        </div>
    );
};
PaymentCard.propTypes = {
    amount: PropTypes.string,
    limit: PropTypes.number,
    description: PropTypes.string,
};
export default PaymentCard;
