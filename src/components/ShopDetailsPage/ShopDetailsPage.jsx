// import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ShopDetailsPage = ({ shopDetail }) => {

    return (
        <div className="container mx-auto mt-8 p-4 shadow-lg">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold mb-4">{shopDetail?.shopName}</h1>
                    {/* <Link to={`/dashboard/updateShop/${shopDetail?._id}`} ><button className="btn btn-sm btn-info w-1/2">Update Shop</button></Link> */}
                </div>
                <img
                    src={shopDetail?.shopLogo}
                    alt={`${shopDetail?.shopName}'s logo`}
                    className="w-72 h-60 object-fit rounded-xl"
                />
            </div>
            <div className="bg-white shadow-md rounded p-6">
                <p className="text-gray-700 mb-2">Shop ID: {shopDetail?.shopId}</p>
                <p className="text-gray-700 mb-2">Location: {shopDetail?.shopLocation}</p>
                <p className="text-gray-700 mb-2">Owner: {shopDetail?.shopOwnerName}</p>
                <p className="text-gray-700 mb-2">Details: {shopDetail?.shopDetails}</p>
                <p className="text-gray-700 mb-2">Product Limit: {shopDetail?.productLimit}</p>
                <p className="text-gray-700 mb-2">Total Line of Product: {shopDetail?.lineOfProduct}</p>
                <p className="text-gray-700 mb-2">Vacancies: {shopDetail?.vacancies.join(', ')}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};
ShopDetailsPage.propTypes = {
    shopDetail: PropTypes.object
};
export default ShopDetailsPage;
