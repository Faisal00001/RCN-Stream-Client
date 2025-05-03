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

import Movies from "../pages/movies/movies";
import TvShows from "../pages/tvShows/tvShows";
import SeriesDetails from "../pages/seriesDetails/seriesDetails";
import AddTvShows from "../pages/Dashboard/AdminDashboard/addTvShows";


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
            },
            {
                path: '/movies',
                element: <Movies></Movies>
            },
            {
                path: '/tvShows',
                element: <TvShows></TvShows>
            },
            {
                path: '/tvseriesDetails/:id',
                element: <SeriesDetails></SeriesDetails>
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
                path: 'addTvShows',
                element: <AddTvShows></AddTvShows>
            }
        ]
    }
]);

export default router