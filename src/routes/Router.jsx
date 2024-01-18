import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Home/Login/Login";
import Registration from "../pages/Home/Registration/Registration";
import Error404 from "../othersPages/Error404/Error404";
import CreateShop from "../pages/Home/CreateShop/CreateShop";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import ManagerHome from "../pages/Dashboard/ManagerPanel/ManagerHome/ManagerHome";
import ProductManagement from "../pages/Dashboard/ManagerPanel/ProductManagement/ProductManagement";
import ManagerRoute from "./ManagerRoute";
import AddProductForm from "../components/AddProductForm/AddProductForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error404></Error404>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/createShop',
                element: <PrivateRoute>
                    <CreateShop></CreateShop>
                </PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Registration></Registration>,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        errorElement: <Error404></Error404>,
        children: [
            //genaral Manager routes
            {
                path: 'managerHome',
                element: <ManagerHome></ManagerHome>
            },
            {
                path: 'productManagement',
                element: <ManagerRoute>
                    <ProductManagement></ProductManagement>
                </ManagerRoute>,
            },
            {
                path: 'addProduct',
                element: <AddProductForm></AddProductForm>,

            },


        ]
    }
]);