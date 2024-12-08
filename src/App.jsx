import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Home from "./features/home/Home";
import About from "./features/about/About";
import Users from "./features/users/Users";
import Login from "./features/login/Login";
import DefaultLayout from './layouts/DefaultLayout';
import AppLayout from './layouts/AppLayout';
// Router Configuration
const router = createBrowserRouter([
 {
  path: '/',
  element: <AppLayout />,
  children: [
   { path: '/', element: <Home /> },
   { path: 'about', element: <About /> },
   { path: 'users', element: <Users /> },
  ],
 },
 {
  path: '/',
  element: <DefaultLayout />,
  children: [
   { path: '/login', element: <Login /> },

  ],
 },
]);
export default function App() {
 return <RouterProvider router={router} />
}