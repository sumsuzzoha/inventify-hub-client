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
import UpdateProductForm from "../components/UpdateProductForm/UpdateProductForm";
import SalesCollection from "../pages/Dashboard/SalesCollection/SalesCollection";
import CheckOut from "../pages/Dashboard/CheckOut/CheckOut";
import SaleInvoice from "../components/SaleInvoice/SaleInvoice";
import InvoicesColection from "../pages/Dashboard/InvoicesColection/InvoicesColection";
import Subscription from "../pages/Dashboard/Subscription/Subscription";
import Payment from "../pages/Dashboard/Payment/Payment";

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
            {
                path: 'productManagement/updateProduct/:id',
                element: <ManagerRoute>
                    <UpdateProductForm></UpdateProductForm>
                </ManagerRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)

            },
            {
                path: 'sales',
                element: <PrivateRoute>
                    <SalesCollection></SalesCollection>
                </PrivateRoute>,

            },
            {
                path: 'checkOut',
                element: <PrivateRoute>
                    <CheckOut></CheckOut>
                </PrivateRoute>,

            },
            {
                path: 'invoice/:id',
                element: <PrivateRoute>
                    <SaleInvoice></SaleInvoice>
                </PrivateRoute>,

            },
            {
                path: 'invoicesColection',
                element: <PrivateRoute>
                    <InvoicesColection></InvoicesColection>
                </PrivateRoute>,

            },
            {
                path: 'subscription',
                element: <PrivateRoute>
                    <Subscription></Subscription>
                </PrivateRoute>,

            },
            {
                path: 'payment/:amount',
                element: <PrivateRoute>
                    <Payment></Payment>
                </PrivateRoute>
            },


        ]
    }
]);