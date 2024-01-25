import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaBoxOpen, FaCalendarCheck, FaDollarSign, FaHome, FaList, FaListAlt, FaMailBulk, FaShoppingBag, FaShoppingCart, FaSignOutAlt, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import logo from '../assets/Logo.png'
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Footer from "../pages/Shared/Footer/Footer";
import useRole from "../hooks/useRole";

const Dashboard = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const hideSection = location.pathname.includes('dashboard/addProduct');
    // const hideSection = location.pathname.includes('dashboard/addProduct') || location.pathname.includes('register');

    const [role = {},] = useRole();

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
                    ).catch();

            }
        });
    }

    return (
        <div>
            <div className="flex ">
                {<div className="w-[150px] md:w-[280px] min-h-screen bg-[#f4f4f4] ">
                    <div className=" md:flex items-center gap- px-4 py-2">
                        <img className="w-[35px] mx-auto" src={logo} alt="" />
                        <h2 className="text-2xl text-center font-bold uppercase">Inventify Hub</h2>
                    </div>
                    <ul className="menu md:p-2 text-sm md:text-base">

                        {role === "admin" && <>
                            <li>
                                <NavLink to='/dashboard/adminHome' className="uppercase font-semibold"> <FaHome className="hidden md:block" />
                                    Admin Home</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to='/dashboard/addItems' className="uppercase font-semibold"> <FaUtensils className="hidden md:block" /> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageItems' className="uppercase font-semibold"> <FaList className="hidden md:block" /> Manage Items</NavLink>
                            </li> */}
                            <li>
                                <NavLink to='/dashboard/shops' className="uppercase font-semibold"> <FaBook className="hidden md:block" />All Shops</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/users' className="uppercase font-semibold"> <FaUsers className="hidden md:block" />All users</NavLink>
                            </li>
                        </>}
                        {role === "storeManager" && <>
                            <li>
                                <NavLink to='/dashboard/shopHome' className="uppercase font-semibold"> <FaHome className="hidden md:block" />
                                    Shop Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/productManagement' className="uppercase font-semibold"> <FaBoxOpen className="hidden md:block" /> Product Management</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/sales' className="uppercase font-semibold"> <FaShoppingCart className="hidden md:block" /> Sales-Collection</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/invoicesColection' className="uppercase font-semibold"> <FaCalendarCheck className="hidden md:block" />Invoices</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/subscription' className="uppercase font-semibold"> <FaWallet className="hidden md:block" /> Subscription & Payment</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/salesSummary' className="uppercase font-semibold"> <FaDollarSign className="hidden md:block" />Sales Summary</NavLink>
                            </li>
                        </>}
                        {
                            role === "shopKeeper" &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/shopHome' className="uppercase font-semibold"> <FaHome className="hidden md:block" />
                                        Shop Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/Add' className="uppercase font-semibold"> <FaUtensils /> Employ Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/Add' className="uppercase font-semibold"> <FaList /> Employ Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/Add' className="uppercase font-semibold"> <FaBook /> Employ Manage Booking</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/Add' className="uppercase font-semibold"> <FaUsers /> Employ All users</NavLink>
                                </li>
                            </>
                        }
                        <div className="divider divider-warning"></div>
                        <li>
                            <NavLink to='/' className="uppercase font-semibold"> <FaHome />Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu' className="uppercase font-semibold"> <FaListAlt />menu</NavLink>
                        </li>

                        <li>
                            <h3 onClick={handleLogOut} className="uppercase font-semibold">
                                <FaSignOutAlt /> Log Out
                            </h3>
                        </li>
                        <li>
                            <NavLink to='/order/salad' className="uppercase font-semibold"> <FaShoppingBag />Shop</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className="uppercase font-semibold"> <FaMailBulk />Contact Us</NavLink>
                        </li>
                    </ul>
                </div>}
                <div className="flex-1 p-1 md:p-4 lg:p-10">
                    <Outlet></Outlet>
                </div>
            </div>
            {hideSection || <Footer></Footer>}
        </div>
    );
};

export default Dashboard;