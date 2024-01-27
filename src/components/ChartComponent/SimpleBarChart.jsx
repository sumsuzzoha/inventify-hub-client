import PropTypes from 'prop-types';
import { BarChart, Bar,  YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SimpleBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                width="90%"
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {/* {window.innerWidth > 600 && (
                <XAxis dataKey="invoiceNumber" />
                )} */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalBuyingPriceWhVat" fill="#8884d8" name="Total Buying Price" />
                <Bar dataKey="totalDiscount" fill="#82ca9d" name="Total Discount" />
                <Bar dataKey="totalTotalPriceWhDisc" fill="purple" name="Total Sale Price with Discount" />
                <Bar dataKey="totalProfit" fill="pink" name="Total Profit" />
                {/* <Bar dataKey="totalSaleQuantity" fill="gold" name="Total Sale Quantity" /> */}
            </BarChart>
        </ResponsiveContainer>
    );
};

SimpleBarChart.propTypes = {
    data: PropTypes.array
};
export default SimpleBarChart;
