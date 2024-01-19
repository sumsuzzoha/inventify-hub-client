import { Helmet } from "react-helmet-async";
import useProduct from "../../../hooks/useProduct";
import SaleCard from "../../../components/SaleCard/SaleCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const SalesCollection = () => {
    const [products = []] = useProduct();
    // console.log(products)

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product => {
        // Case-insensitive search by Product ID
        return product.productId.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Sales Collection</title>
            </Helmet>
            <div>
                <div className="bg-blue-500 p-4 mb-2 text-white text-center md:text-left md:flex justify-between items-center rounded-lg ">
                    <div className="mb-3 md:mb-0">
                        <h1 className="text-2xl font-semibold">Sales Management</h1>
                        <p className="text-sm mt-1">Sale your products efficiently</p>
                        <p className="text-m mt-1">Total {products.length} Product in shop</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-8">
                        <div className="indicator text-3xl">
                            <FaShoppingCart />
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                        <div>
                            <Link to='/dashboard/checkOut'><button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none">
                                Check-out Cart
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div className="mb-4 w-full text-center">
                    <input
                        type="text"
                        placeholder="Search by Product ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-md w-full md:w-1/2 text-center mx-auto"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                    {
                        filteredProducts.map(product => <SaleCard key={product._id} product={product}></SaleCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SalesCollection;