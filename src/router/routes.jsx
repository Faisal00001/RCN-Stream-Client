import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/home";
import MovieDetails from "../pages/movieDetails/movieDetails";
import Login from "../pages/login/login";
import Regsiter from "../pages/resgister/regsiter";
import PrivateRoute from "./privateRoute";
import Dashboard from "../layout/Dashboard";
import AddMovies from "../pages/Dashboard/AdminDashboard/addMovies";
import MyList from "../pages/myList/myList";
import AdminRoute from "./adminRoute";
import AddCategory from "../pages/Dashboard/AdminDashboard/addCategory";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Regsiter></Regsiter>
            },
            {
                path: '/movieDetails/:id',
                element: <MovieDetails></MovieDetails>
            },
            {
                path: '/myList',
                element: <PrivateRoute><MyList></MyList></PrivateRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        children: [
            {
                path: 'addMovies',
                element: <AdminRoute><AddMovies></AddMovies></AdminRoute>
            },
            {
                path: 'addCategory',
                element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
            }
        ]
    }
]);

export default router