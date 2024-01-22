import { Helmet } from "react-helmet-async";
import useProductShopWise from "../../../hooks/useProductShopWise";
import SaleCard from "../../../components/SaleCard/SaleCard";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import useCartShopWise from "../../../hooks/useCartShopWise";
import DashPageHeader from "../../../components/DashPageHeader/DashPageHeader";

const SalesCollection = () => {
    const [products = [], , refetchProd] = useProductShopWise();
    const [cartItems = [], , refetchCart] = useCartShopWise();

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
                <DashPageHeader
                    title={"Sales Management"}
                    subTitle={"Product in shop"}
                    description={'Sale your products efficiently'}
                    data={products}
                    dynamicLink={'/dashboard/checkOut'}
                    link_Btn_Title={'Check-Out Cart'}
                    icon={<FaShoppingCart />}
                    items={cartItems}
                // func={handleGenarateInvoice}
                ></DashPageHeader>

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
                        filteredProducts.map(product => <SaleCard key={product._id} product={product} refetchProd={refetchProd} refetchCart={refetchCart}></SaleCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SalesCollection;