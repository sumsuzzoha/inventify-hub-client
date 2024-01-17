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
        errorElement: <Error404></Error404>,
        children: [
            //genaral user routes
            {
                path: 'userHome',
            },
            {
                path: 'cart',
            },


        ]
    }
]);