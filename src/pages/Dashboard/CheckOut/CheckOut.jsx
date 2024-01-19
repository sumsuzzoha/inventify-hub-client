import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const CheckOut = () => {
    const [cartItems = []] = useCart();

    const totalSellingPrice = cartItems.reduce((total, item) => {
        if (typeof item.sellingPrice !== 'number') {
            return total + parseFloat(item.sellingPrice);
        }
        return total + item.sellingPrice;
    }, 0);
    // const totalDiscPer = cartItems.reduce((total, item) => {
    //     if (typeof item.discount !== 'number') {
    //         return total + parseFloat(item.discount);
    //     }
    //     return total + item.discount;
    // }, 0);
    // const totalDiscAmount = (totalSellingPrice * totalDiscPer) / 100;

    const subTotalPriceWhDisc = cartItems.reduce((total, item) => {
        if (typeof item.totalPriceWhDisc !== 'number') {
            return total + parseFloat(item.totalPriceWhDisc);
        }
        return total + item.totalPriceWhDisc;
    }, 0);


    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Check-Out Collection</title>
            </Helmet>
            <div>
                <div className="bg-blue-500 p-4 mb-2 text-white text-center md:text-left md:flex justify-between items-center rounded-lg ">
                    <div className="mb-3 md:mb-0">
                        <h1 className="text-2xl font-semibold">Sales Management</h1>
                        <p className="text-sm mt-1">Sale your products efficiently</p>
                        <p className="text-m mt-1">Total {cartItems.length} Product in Check-Out</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-8">
                        <div className="indicator text-3xl">
                            {/* <FaShoppingCart /> */}
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                        <div>
                            <Link to='/dashboard/invoice'><button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 focus:outline-none">
                                Generate Invoice
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Product Id</th>
                                    <th>Selling Price</th>
                                    <th>Discount %</th>
                                    <th>Total Price <br /> {'(After Discount)'}</th>

                                    {/* TODO: implement the Action btn future
                                    <th>Action</th> 
                                    */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item, idx) => <tr key={item._id} className="hover">
                                        <th>{idx + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.productId}</td>
                                        <td>{item.sellingPrice}</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.totalPriceWhDisc}</td>
                                        {/* TODO: implement the Action btn future
                                    <td>Delete</td>
                                    */}

                                    </tr>)
                                }
                            </tbody>
                            <tfoot>
                                <tr className="border-t-4">
                                    <th></th>
                                    <th>SubTotal</th>
                                    <th></th>
                                    <th>${totalSellingPrice}</th>
                                    <th></th>
                                    <th>${subTotalPriceWhDisc}</th>
                                    {/* <th></th> */}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckOut;