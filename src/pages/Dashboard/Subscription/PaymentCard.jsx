import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PaymentCard = ({ amount, limit, description, pack }) => {

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-md m-4 p-6 w-72 h-80 flex flex-col justify-between text-center text-white">
            <div>
                <h3 className="text-2xl font-semibold mb-2">Payment Plan</h3>
                <h3 className="text-xl font-semibold mb-2">{pack}</h3>
                <p className="text-gray-400 mb-2">{description}</p>
            </div>
            <div>
                <Link to={`/dashboard/payment/${amount}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                        Pay ${amount}
                    </button>
                </Link>
                <p className="text-gray-400 mt-2">Increased Limit: {limit}</p>
            </div>
        </div>
    );
};

PaymentCard.propTypes = {
    amount: PropTypes.number,
    limit: PropTypes.number,
    description: PropTypes.string,
    pack: PropTypes.string,
};

export default PaymentCard;
