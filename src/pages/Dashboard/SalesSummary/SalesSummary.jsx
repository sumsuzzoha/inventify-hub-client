
import SaleTable from "./SaleTable";
import { Helmet } from "react-helmet-async";
import useSaleItemShopWise from "../../../hooks/useSaleItemShopWise";

const SalesSummary = () => {
    const [saleItems = []] = useSaleItemShopWise();
 
    const parseCustomDate = (dateString) => {
        const [datePart, timePart] = dateString?.split(', ') ?? [];

        const [day, month, year] = datePart?.split('/').map(Number) ?? [];

        const [time, period] = (timePart || '').split(' ');

        const [hours, minutes] = time.split(':').map(Number);

        const adjustedHours = period === 'pm' ? hours + 12 : hours;

        return day && month && year
            ? new Date(year, month - 1, day, adjustedHours, minutes)
            : null;
    };


    const sortedSaleItems = saleItems.sort((a, b) => {
        const parsedDateA = parseCustomDate(a.invoiceDate)
        const parsedDateB = parseCustomDate(b.invoiceDate)
        return parsedDateB - parsedDateA;
    });

    const totalSaleAmount = saleItems.reduce((total, item) => total + item.totalPriceWhDisc, 0);
    const totalInvest = saleItems.reduce((total, item) => total + item.buyingPriceWhVat, 0);
    const totalProfit = totalSaleAmount - totalInvest;

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Sales Summary</title>
            </Helmet>
            <div className="overflow-x-auto">
                <div className="bg-blue-500 p-4 mb-2 text-center md:text-left md:flex justify-between items-center rounded-lg  mx-auto ">
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Sale</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Amount: ${parseFloat(totalSaleAmount).toFixed(2)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Invest</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Amount: ${parseFloat(totalInvest).toFixed(2)}</p>
                    </div>
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md m-4 p-6 w-64">
                        <h3 className="text-xl font-semibold mb-4">Total Profit</h3>
                        <p className="text-gray-600 mb-4"></p>
                        <p className="mt-4 font-bold">Amount: ${parseFloat(totalProfit).toFixed(2)}</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Product Name</th>
                                <th>Product Id</th>
                                <th>Selling date</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 2 */}
                            {
                                sortedSaleItems.map((item, idx) => <SaleTable key={idx} item={item} idx={idx}></SaleTable>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesSummary;