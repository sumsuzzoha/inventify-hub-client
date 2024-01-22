import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: allProducts = [], } = useQuery({
        queryKey: [user?.email, 'allProducts'],
        enabled: !loading,
        queryFn: async () => {
            // console.log(user.email);
            const res = await axiosSecure.get(`/allProducts`);
            return res.data;

        }
    });
    // console.log(allProducts);

    const totalSaleAmount = allProducts.reduce((total, item) => total + item.totalPriceWhDisc, 0);
    const totalInvest = allProducts.reduce((total, item) => total + item.buyingPriceWhVat, 0);
    const totalProfit = totalSaleAmount - totalInvest;

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Admin Home</title>
            </Helmet>
            <div className="w-full max-w-[275px] md:max-w-lg lg:max-w-5xl mx-auto">
                <div className="bg-blue-500 p-4 mb-2 text-center md:text-left md:flex justify-between items-center rounded-lg  mx-auto ">
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6  md:w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Income</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Subscription:{parseInt(totalSaleAmount)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 md:w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Product</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Line Item: {parseInt(allProducts.length)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 md:w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Sales</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Amount: ${parseFloat(totalProfit).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;