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
import ShopHome from "../pages/Dashboard/ManagerPanel/ShopHome/ShopHome";
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
import SalesSummary from "../pages/Dashboard/SalesSummary/SalesSummary";
import StoreAuthorizeRoute from "./StoreAuthorizeRoute";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/AdminPanel/AdminHome/AdminHome";
import Users from "../pages/Dashboard/AdminPanel/Users/Users";
import Shops from "../pages/Dashboard/AdminPanel/Shops/Shops";

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
            // Manager routes
            {
                path: 'shopHome',
                element: <StoreAuthorizeRoute>
                    <ShopHome></ShopHome>
                </StoreAuthorizeRoute>
            },
            {
                path: 'productManagement',
                element: <ManagerRoute>
                    <ProductManagement></ProductManagement>
                </ManagerRoute>,
            },
            {
                path: 'addProduct',
                element: <ManagerRoute>
                    <AddProductForm></AddProductForm>
                </ManagerRoute>,

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
                element: <StoreAuthorizeRoute>
                    <SalesCollection></SalesCollection>
                </StoreAuthorizeRoute>

            },
            {
                path: 'checkOut',
                element: <StoreAuthorizeRoute>
                    <CheckOut></CheckOut>
                </StoreAuthorizeRoute>

            },
            {
                path: 'invoice/:id',
                element: <PrivateRoute>
                    <SaleInvoice></SaleInvoice>
                </PrivateRoute>,

            },
            {
                path: 'invoicesColection',
                element: <StoreAuthorizeRoute>
                    <InvoicesColection></InvoicesColection>
                </StoreAuthorizeRoute>

            },
            {
                path: 'subscription',
                element: <ManagerRoute>
                    <Subscription></Subscription>
                </ManagerRoute>,

            },
            {
                path: 'payment/:amount',
                element: <ManagerRoute>
                    <Payment></Payment>
                </ManagerRoute>
            },
            {
                path: 'salesSummary',
                element: <PrivateRoute>
                    <SalesSummary></SalesSummary>
                </PrivateRoute>
            },

            // AdminRoutes
            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome></AdminHome>
                </AdminRoute>
            },
            {
                path: 'shops',
                element: <AdminRoute>
                    <Shops></Shops>
                </AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute>
                    <Users></Users>
                </AdminRoute>
            }



        ]
    }
]);