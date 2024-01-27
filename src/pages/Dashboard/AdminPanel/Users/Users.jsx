import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import EmailModal from "./EmailModal";
import DashPageHeader from "../../../../components/DashPageHeader/DashPageHeader";


const Users = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [itemOffset, setItemOffset] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState({});


    const { data: allUsers = [], } = useQuery({
        queryKey: [user?.email, 'users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;

        }
    });

    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = allUsers.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allUsers.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allUsers.length;
        setItemOffset(newOffset);
    };

    const handlePromotion = (id) => {
        setModalIsOpen({ ...modalIsOpen, [id]: true });
    }

    return (
        <div>
            <Helmet>
                <title>Inventify Hub | Users Management</title>
            </Helmet>
            <div>
                <DashPageHeader
                    title={"Users Management"}
                    subTitle={"User in this Hub"}
                    description={'See all users details.'}
                    data={allUsers}
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Shop Name</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {currentItems.map((user, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user.shopName ? user?.shopName : "Dosn't have a Shop"}</td>
                                <td>{user?.role}</td>
                                <td>{user.role === 'user' ? <button onClick={() => handlePromotion(user._id)} className="btn btn-sm btn-info w-28">Promotional</button> : <button disabled className="btn btn-sm btn-warning w-28 ">No Need</button>}</td>
                                <EmailModal
                                    key={user._id}
                                    modalIsOpen={modalIsOpen[user._id] || false}
                                    setIsOpen={(value) => setModalIsOpen({ ...modalIsOpen, [user._id]: value })}
                                    user={user}
                                />
                            </tr>)}


                        </tbody>
                    </table>
                </div>
                <div className="py-6 w-1/2 flex justify-center mx-auto">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< prev"
                        renderOnZeroPageCount={null}
                        className="flex gap-6 font-lg"
                    />
                </div>
                <div>


                </div>
            </div>
        </div>
    );
};

export default Users;