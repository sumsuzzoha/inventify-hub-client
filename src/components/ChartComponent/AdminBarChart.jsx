import PropTypes from 'prop-types';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Legend, Tooltip,  ResponsiveContainer } from 'recharts';

const AdminBarChart = ({ data }) => {

    return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={500}
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
                    <XAxis dataKey="shopName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalPurchaseAmt" fill="#8884d8" />
                    <Bar dataKey="totalLimit" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
      
    );
};
AdminBarChart.propTypes = {
    data: PropTypes.array
};
export default AdminBarChart;
