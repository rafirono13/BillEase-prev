import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import NotFound from "../Components/Error/NotFound";
import HomePage from "../Pages/Home/HomePage";
import DashBoard from "./../Pages/Dashboard/DashBoard";
import BillBoard from "./../Pages/BillBoard/BillBoard";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import BillPaymentPage from "../Pages/Bill/BillPaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
      },
      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            <BillBoard></BillBoard>
          </PrivateRoute>
        ),
      },
      {
        path: "bills/pay/:billId",
        element: (
          <PrivateRoute>
            <BillPaymentPage></BillPaymentPage>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
