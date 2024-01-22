import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useShopUserWise from "../../../../hooks/useShopUserWise";
import { Helmet } from "react-helmet-async";
import useProductShopWise from "../../../../hooks/useProductShopWise";
import useCartShopWise from "../../../../hooks/useCartShopWise";
import useInvoiceShopWise from "../../../../hooks/useInvoiceShopWise";
import SimpleBarChart from "../../../../components/ChartComponent/SimpleBarChart";

const ShopHome = () => {
    const [shop = [], isShopLoading] = useShopUserWise();
    const [products = []] = useProductShopWise();
    const [cartItems = []] = useCartShopWise();
    const [allInvoices = []] = useInvoiceShopWise();
    // console.log(cartItems);
    const axiosSecure = useAxiosSecure();

    const { data: saleItems = [], } = useQuery({
        queryKey: [shop.shopId, 'invoices'],
        enabled: !isShopLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/chart-data?shop=${shop.shopId}`);
            return res.data;

        }
    });
    // console.log(saleItems);

    const totalProductQty = products.reduce((total, item) => total + item.stockQuantity, 0);
    const totalSaleQty = saleItems.reduce((total, item) => total + item.totalSaleQuantity, 0);



    return (
        <div>
            <Helmet><title>Inventify Hub | Shop Home </title></Helmet>
            <div className="bg-blue-500 p-4 mb-2 md:text-left md:flex justify-between items-center rounded-lg  mx-auto ">

                <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64 h-40">
                    <h3 className="text-xl font-semibold mb-4">Products in Shop</h3>
                    <p className="text-gray-600 mb-4">Product Line Item :{products?.length}</p>
                    <p className="mt-4 font-bold">Stock Quantity: {totalProductQty}</p>
                </div>
                <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64 h-40 text-center">
                    <h3 className="text-xl font-semibold mb-4">Products in Check-Out</h3>
                    <p className="text-gray-600 mb-4"></p>
                    <p className="mt-4 font-bold">Total Quantity: {cartItems?.length}</p>
                </div>
                <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64 h-40 text-center">
                    <h3 className="text-xl font-semibold mb-4">Total Product Sale</h3>
                    <p className="text-gray-600 mb-4">Invoices Count: {allInvoices?.length}</p>
                    <p className="mt-4 font-bold ">Product Quantity: {totalSaleQty}</p>
                </div>
            </div>
            <div className="my-10">
                <SimpleBarChart data={saleItems} />
            </div>
        </div>
    );
};

export default ShopHome;