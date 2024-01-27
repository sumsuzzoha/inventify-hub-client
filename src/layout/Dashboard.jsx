import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBook, FaBoxOpen, FaCalendarCheck, FaDollarSign, FaHome, FaHourglassHalf, FaMailBulk, FaShoppingCart, FaSignOutAlt, FaTools, FaUsers, FaWallet } from "react-icons/fa";
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

    const usersNavOptions = <>
        {role === "admin" && <>
            <li>
                <NavLink to='/dashboard/adminHome' className="uppercase font-semibold"> <FaHome className="hidden md:block" />
                    Admin Home</NavLink>
            </li>
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
                <NavLink to='/dashboard/salesSummary' className="uppercase font-semibold"> <FaDollarSign className="hidden md:block" />Sales Summary</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/subscription' className="uppercase font-semibold"> <FaWallet className="hidden md:block" /> Subscription & Payment</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/manageShop' className="uppercase font-semibold"> <FaTools className="hidden md:block" /> Manage Shop</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/joinReq' className="uppercase font-semibold"> <FaHourglassHalf className="hidden md:block" /> Join Request</NavLink>
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
                    <NavLink to='/dashboard/sales' className="uppercase font-semibold"> <FaShoppingCart className="hidden md:block" /> Sales-Collection</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/invoicesColection' className="uppercase font-semibold"> <FaCalendarCheck className="hidden md:block" />Invoices</NavLink>
                </li>

            </>
        }
        <div className="divider divider-warning "></div>
        <li>
            <NavLink to='/' className="uppercase font-semibold"> <FaHome className="hidden lg:block" />Home</NavLink>
        </li>
        <li>
            <NavLink to='/contact' className="uppercase font-semibold"> <FaMailBulk className="hidden lg:block" />Contact Us</NavLink>
        </li>
        <li>
            <h3 onClick={handleLogOut} className="uppercase font-semibold">
                <FaSignOutAlt className="hidden lg:block" /> Log Out
            </h3>
        </li>

    </>

    return (
        <div>
            <div className="lg:flex ">
                <div className=" lg:w-[280px] lg:min-h-screen bg-[#f4f4f4] flex justify-between lg:justify-start lg:flex-col ">
                    <div className=" flex items-center justify-between md:justify-center lg:gap-4 px-4 py-2">
                        <img className="w-[35px]" src={logo} alt="" />
                        <h2 className="text-2xl text-center font-bold uppercase">Inventify Hub</h2>
                    </div>
                    <div className="lg:w-[280px] md:ms-4">
                        <div className="hidden lg:flex">
                            <ul className="menu  px-1">
                                {usersNavOptions}
                            </ul>
                        </div>
                        <div className="dropdown dropdown-end lg:hidden pe-4 mx-auto">
                            <div tabIndex={0} role="button" className="btn btn-ghost flex  justify-center text-xl ">
                                <FaBars />
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60">
                                {usersNavOptions}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-1 md:p-4 lg:p-10">
                    <Outlet></Outlet>
                </div>
            </div>
            {hideSection || <Footer></Footer>}
        </div>
    );
};

export default Dashboard;