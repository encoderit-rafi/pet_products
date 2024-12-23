import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AppLayout from "./layouts/AppLayout";
import Home from "./features/home";
import Login from "./features/login";
import Connect from "./features/connect";
import Faqs from "./features/faqs";
import Hub from "./features/hub";
import Marketing, { CriteriaAndSegment, Task } from "./features/marketing";
import Products from "./features/products";
import Roles from "./features/roles";
import Shelves from "./features/shelves";
import Terms from "./features/terms";
// Router Configuration
const router = createBrowserRouter([
  // private routes📌
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { path: "/", element: <Home /> },
      { path: "/", element: <Hub /> },
      { path: "connect", element: <Connect /> },
      { path: "faqs", element: <Faqs /> },
      { path: "marketing", element: <Marketing /> },
      { path: "marketing/task", element: <Task /> },
      { path: "marketing/criteria_and_segment", element: <CriteriaAndSegment /> },
      { path: "products", element: <Products /> },
      { path: "roles", element: <Roles /> },
      { path: "shelves", element: <Shelves /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  // public routes📌
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
