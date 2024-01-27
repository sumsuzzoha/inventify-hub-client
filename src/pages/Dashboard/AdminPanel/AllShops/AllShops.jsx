import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ShopDetailsMod from "./ShopDetailsMod";
import DashPageHeader from "../../../../components/DashPageHeader/DashPageHeader";
import Swal from "sweetalert2";

const AllShops = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [modalIsOpen, setModalIsOpen] = useState({});

    const { data: allShops = [], refetch } = useQuery({
        queryKey: [user?.email, 'allShops'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allShops`);
            return res.data;
        }
    });

    const handleDetails = (shopId) => {
        setModalIsOpen({ ...modalIsOpen, [shopId]: true });
    }

    const handleDelete = async (shopId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteShop/${shopId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Shop Management</title>
            </Helmet>
            <div>
                <DashPageHeader
                    title={"Shops Management"}
                    subTitle={"Shop in this Hub"}
                    description={'See all shops details.'}
                    data={allShops}
                // dynamicLink={'/dashboard/checkOut'}
                // link_Btn_Title={'Generate Invoice'}
                // icon={<FaShoppingCart />}
                // items={cartItems}
                // func={handleGenarateInvoice}
                ></DashPageHeader>

                <div className="overflow-x-auto w-full max-w-[275px] md:max-w-xl lg:max-w-4xl mx-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Shop Name</th>
                                <th>Shop Id</th>
                                <th>Shop Owner</th>
                                <th className="text-center">Product Limit</th>
                                <th className="text-center">Action</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allShops.map((shop, idx) => (
                                <tr key={idx} className="hover">
                                    <th>{idx + 1}</th>
                                    <td>{shop?.shopName}</td>
                                    <td>{shop?.shopId}</td>
                                    <td>{shop?.shopOwnerName}</td>
                                    <td className="text-center">{shop?.productLimit}</td>
                                    <td className="text-center">
                                        <button onClick={() => handleDetails(shop.shopId)} className="btn btn-sm btn-info w-24">
                                            Details
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => handleDelete(shop.shopId)} className="btn btn-sm btn-warning w-24">
                                            Delete
                                        </button>
                                    </td>
                                    <ShopDetailsMod
                                        key={shop.shopId}
                                        modalIsOpen={modalIsOpen[shop.shopId] || false}
                                        setIsOpen={(value) => setModalIsOpen({ ...modalIsOpen, [shop.shopId]: value })}
                                        shop={shop}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllShops;
