import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaBoxOpen, FaCalendarCheck, FaHome, FaList, FaListAlt, FaMailBulk, FaShoppingBag, FaShoppingCart, FaSignOutAlt, FaStarHalfAlt, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import AuthLoading from "../components/Loading/AuthLoading";
import logo from '../assets/Logo.png'
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Footer from "../pages/Shared/Footer/Footer";
import useRole from "../hooks/useRole";

const Dashboard = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    //TODO: get os Admin value from the DB
    const [role,isRoleLoading] = useRole();
    // console.log('from dashboard', role);
    if (isRoleLoading) {
        return <AuthLoading></AuthLoading>
    }

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            position: "top-start",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(
                        Swal.fire({
                            position: "top-start",
                            icon: "success",
                            title: "Done",
                            showConfirmButton: false,
                            timer: 1500
                        }),
                        navigate('/')
                    ).catch(error => console.log(error));

            }
        });
    }

    return (
        <div>
            <div className="flex ">
                <div className="w-[180px] md:w-[280px] min-h-screen bg-[#f4f4f4] ">
                    <div className=" md:flex items-center gap- px-4 py-2">
                        <img className="w-[35px] mx-auto" src={logo} alt="" />
                        <h2 className="text-2xl text-center font-bold uppercase">Inventify Hub</h2>
                    </div>
                    <ul className="menu p-4">

                        {role === "admin" && <>
                            <li>
                                <NavLink to='/dashboard/adminHome' className="uppercase text-xl"> <FaHome />
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addItems' className="uppercase text-xl"> <FaUtensils /> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageItems' className="uppercase text-xl"> <FaList /> Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageBooking' className="uppercase text-xl"> <FaBook />Manage Booking</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/users' className="uppercase text-xl"> <FaUsers />All users</NavLink>
                            </li>
                        </>}
                        {role === "storeManager" && <>
                            <li>
                                <NavLink to='/dashboard/managerHome' className="uppercase text-xl"> <FaHome />
                                    Manager Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/productManagement' className="uppercase font-semibold"> <FaBoxOpen /> Product Management</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/paymentHistory' className="uppercase text-xl"> <FaWallet /> Payment History</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/cart' className="uppercase text-xl"> <FaShoppingCart /> My cart</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myBooking' className="uppercase text-xl"> <FaStarHalfAlt />add review</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myBooking' className="uppercase text-xl"> <FaCalendarCheck />my booking</NavLink>
                            </li>
                        </>}
                        {
                            role === "employe" &&
                            <>
                                <li>
                                    <NavLink to='/dashboard' className="uppercase text-xl"> <FaHome />
                                        Employ Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard' className="uppercase text-xl"> <FaUtensils /> Employ Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard' className="uppercase text-xl"> <FaList /> Employ Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard' className="uppercase text-xl"> <FaBook /> Employ Manage Booking</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard' className="uppercase text-xl"> <FaUsers /> Employ All users</NavLink>
                                </li>
                            </>
                        }
                        <div className="divider divider-warning"></div>
                        <li>
                            <NavLink to='/' className="uppercase text-lg font-semibold"> <FaHome />Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu' className="uppercase text-lg font-semibold"> <FaListAlt />menu</NavLink>
                        </li>

                        <li>
                            <h3 onClick={handleLogOut} className="uppercase text-lg font-semibold">
                                <FaSignOutAlt /> Log Out
                            </h3>
                        </li>
                        <li>
                            <NavLink to='/order/salad' className="uppercase text-lg font-semibold"> <FaShoppingBag />Shop</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className="uppercase text-lg font-semibold"> <FaMailBulk />Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 p-1 md:p-4 lg:p-10">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;