import { FaBars } from "react-icons/fa";
import logo from '../../../assets/Logo.png'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
    const { user = {}, logOut } = useAuth();
    const navigate = useNavigate();
    const [role,] = useRole();

    let roleName = '';
    if (role === 'storeManager') {
        roleName = 'Manger';
    } else if (role === 'admin') {
        roleName = 'Admin';
    } else if (role === 'shopKepper') {
        roleName = 'Shop Keeper';
    }else{
        roleName = '';
    }

    const dashboardAuthorized = role === 'storeManager' || role === 'admin' || role === 'shopKepper';


    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            position: "top-end",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(
                        Swal.fire({
                            position: "top-end",
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
    const openDemoVideo = () => {

        const youtubeVideoId = 'YOUTUBE_VIDEO_ID'; // Replace 'YOUTUBE_VIDEO_ID' with the actual YouTube video ID
        const youtubeVideoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

        window.open(youtubeVideoUrl, '_blank');
    };


    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        {user ?
            <>
                {dashboardAuthorized ?
                    <>
                        <li><Link to={role === 'admin' ? "/dashboard/adminHome" : '/dashboard/shopHome'}>Dashboard</Link></li>
                    </>
                    :
                    <>
                        <li><Link to='/createShop'>Create-Store</Link></li>
                    </>
                }

            </>
            :
            <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/createShop'>Create-Store</Link></li>
            </>
        }



    </>


    return (
        <div className="navbar bg-blue-100  w-full lg:max-w-full mx-auto shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                        <li> <button onClick={openDemoVideo}>Watch Demo</button></li>
                    </ul>
                </div>
                <div className=" flex items-center gap-4">
                    <img className="w-[50px]" src={logo} alt="" />
                    <h2 className="text-4xl font-bold uppercase">Inventify Hub</h2>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                        <li> <button onClick={openDemoVideo}>Watch Demo</button></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User Image" src={user?.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {user ? <>
                            <div className="p-4">
                                <h3 className="text-lg">{user?.displayName}
                                    <span className="badge text-sm">{roleName}</span></h3>
                            </div>
                            <li><button
                                onClick={handleLogOut}
                                className="btn btn-sm btn-active btn-ghost ">Log Out</button></li>
                        </> : <>
                            <Link to='/login' className="btn btn-sm btn-active btn-ghost ">Login</Link>
                        </>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;