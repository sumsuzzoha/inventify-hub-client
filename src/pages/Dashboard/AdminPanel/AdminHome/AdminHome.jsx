import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import AdminBarChart from "../../../../components/ChartComponent/AdminBarChart";


const AdminHome = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: allProducts = [], } = useQuery({
        queryKey: [user?.email, 'allProducts'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProducts`);
            return res.data;

        }
    });

    const { data: chartData = [], } = useQuery({
        queryKey: [user?.email, 'admin-chartData'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-chartData`);
            return res.data;

        }
    });


    const totalSubsAmount = chartData.reduce((total, item) => total + item.totalLimit, 0);

    const totalSaleQty = allProducts.reduce((total, item) => total + item.saleCount, 0);
    const totalSaleAmount = allProducts.reduce((total, item) => {
        const discountPerc = item.discount / 100;
        const discountedPrice = item.sellingPrice - (item.sellingPrice * discountPerc);
        return total + discountedPrice;
    }, 0);

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Admin Home</title>
            </Helmet>
            <div className="w-full md:max-w-3l lg:max-w-5x mx-auto">
                <div className="bg-blue-500 p-4 mb-2 text-center md:text-left md:flex justify-between items-center rounded-lg  mx-auto ">
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6  md:w-72 h-40">
                        <h3 className="text-xl font-semibold my-2">Total Income <span className="text-base">(Subscription)</span></h3>
                        <p className="mt-4 font-bold">Shop Subscribed: {chartData?.length}</p>
                        <p className="text-gray-600 my-2">Subscription amount: {parseFloat(totalSubsAmount).toFixed(2)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 md:w-72 h-40 text-center">
                        <h3 className="text-xl font-semibold my-2">Total Product</h3>
                        <p className="text-gray-600 my-2"></p>
                        <p className="mt-4 font-bold">Line Item: {parseInt(allProducts.length)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 md:w-72 h-40 text-center">
                        <h3 className="text-xl font-semibold my-2">Total Sales of Products</h3>
                        <p className="mt-4 font-bold">Quantity: {parseFloat(totalSaleQty).toFixed(0)}</p>
                        <p className="text-gray-600 my-2">Total Amount: ${parseFloat(totalSaleAmount).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div style={{ width: '90%', height: 'auto' }} className="mx-auto my-10">
                <AdminBarChart data={chartData}></AdminBarChart>
            </div>
        </div>
    );
};

export default AdminHome;