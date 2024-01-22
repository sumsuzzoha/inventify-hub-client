import { Helmet } from "react-helmet-async";
import useCartShopWise from "../../../hooks/useCartShopWise";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDateTime from "../../../hooks/useDateTime";
import { useNavigate } from "react-router-dom";
import DashPageHeader from "../../../components/DashPageHeader/DashPageHeader";

const CheckOut = () => {
    const [cartItems = [], , refetchCart] = useCartShopWise();
    const axiosSecure = useAxiosSecure();
    const [formattedDateTime] = useDateTime();
    const navigate = useNavigate()


    const totalSellingPrice = cartItems.reduce((total, item) => {
        if (typeof item.sellingPrice !== 'number') {
            return total + parseFloat(item.sellingPrice);
        }
        return total + item.sellingPrice;
    }, 0);

    const subTotalPriceWhDisc = cartItems.reduce((total, item) => {
        if (typeof item.totalPriceWhDisc !== 'number') {
            return total + parseFloat(item.totalPriceWhDisc);
        }
        return total + item.totalPriceWhDisc;
    }, 0);

    const handleGenarateInvoice = () => {
        if (cartItems?.length > 0) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
            const formattedTime = currentDate.toISOString().split('T')[1].split('.')[0].replace(/:/g, '');
            const randomPart = Math.random().toString(36).substring(2, 6);
            const invoiceNumber = `INV_${formattedDate}_${formattedTime}_${randomPart}`;

            let shopId = "";
            const foundShopItem = cartItems.find(item => item.shopId);
            if (foundShopItem) {
                shopId = foundShopItem.shopId;
            }


            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Genarate"
            }).then((result) => {
                if (result.isConfirmed) {
                    const invoiceInfo = {
                        shopId: shopId,
                        invoiceNumber: invoiceNumber,
                        invoiceDate: formattedDateTime,
                    }
                    axiosSecure.post('/saleInvoice', invoiceInfo)
                        .then(() => {
                            // console.log(res.data)
                            refetchCart();
                            Swal.fire({
                                text: "Invoice Generated",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "See the Invoice"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate(`/dashboard/invoice/${invoiceNumber}`)
                                    //   Swal.fire({
                                    //     title: "Deleted!",
                                    //     text: "Your file has been deleted.",
                                    //     icon: "success"
                                    //   });
                                }
                            });
                        }).catch((res) => {
                            Swal.fire({
                                title: "Failed",
                                text: `${res?.response.data.error}`,
                                icon: "error"
                            });
                        });


                }
            });
        } else {
            Swal.fire({
                // title: "Failed",
                text: `Cart items not found`,
                icon: "error"
            });
        }




    }



    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Check-Out Collection</title>
            </Helmet>
            <div>
                <DashPageHeader
                    title={"Sales Management"}
                    subTitle={"Product in cart to sell"}
                    description={'Sale your products efficiently'}
                    data={cartItems}
                    // dynamicLink={''}
                    link_Btn_Title={'Generate Invoice'}
                    // icon={<FaShoppingCart />}
                    // items={cartItems}
                    func={handleGenarateInvoice}
                ></DashPageHeader>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Product Id</th>
                                    <th>Issue Date</th>
                                    <th>Bin Location</th>
                                    <th>Sell Quantity</th>
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
                                        <td>{item?.name}</td>
                                        <td>{item?.productId}</td>
                                        <td>{item?.issueDate}</td>
                                        <td>{item?.productLocation}</td>
                                        <td>{item?.saleQuantity}</td>
                                        <td>{item?.sellingPrice}</td>
                                        <td>{item?.discount}%</td>
                                        <td>{parseFloat(item?.totalPriceWhDisc).toFixed(2)}</td>
                                        {/* TODO: implement the Action btn future
                                    <td>Delete</td>
                                    */}

                                    </tr>)
                                }
                            </tbody>
                            <tfoot>
                                <tr className="border-t-4 text-black">
                                    <th></th>
                                    <th>SubTotal</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>${totalSellingPrice}</th>
                                    <th></th>
                                    <th>${parseFloat(subTotalPriceWhDisc).toFixed(2)}</th>
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