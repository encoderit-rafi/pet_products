import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";

// layouts
import AppLayout from "./layouts/AppLayout";

// pages
// import Login from "./features/login";
import Connect from "./features/connect";
import Faqs from "./features/faqs";
import Hub from "./features/hub";
import Marketing, { CriteriaAndSegment, Task } from "./features/marketing";
import Products from "./features/products";
import Users from "./features/users";
import Shelves from "./features/shelves";
import Terms from "./features/terms";
import NotFound from "./features/not_found";
import Login from "./features/auth/login";
import MediaKit from "./features/media_kit";
import Brands from "./features/brands";
import Stores from "./features/stores";
import ProtectedRoute from "./components/ui/ProtectedRoute";
// import DefaultLayout from "./layouts/DefaultLayout";
// import Home from "./features/home";
// Router Configuration
const router = createBrowserRouter([
  // private routes📌
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { path: "/", element: <Home /> },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Hub />
          </ProtectedRoute>
        ),
      },
      { path: "connect", element: <Connect /> },
      { path: "faqs", element: <Faqs /> },
      { path: "marketing", element: <Marketing /> },
      { path: "marketing/task", element: <Task /> },
      {
        path: "marketing/criteria_and_segment",
        element: <CriteriaAndSegment />,
      },
      { path: "brands", element: <Brands /> },
      { path: "stores", element: <Stores /> },
      { path: "products", element: <Products /> },
      { path: "media-kit", element: <MediaKit /> },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      { path: "shelves", element: <Shelves /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  // public routes📌
  {
    path: "/login",
    element: <Login />,
    // children: [{ path: "/", element: <Login /> }],
  },
  { path: "*", element: <NotFound /> },
]);
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />;
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
