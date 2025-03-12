import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";

// layouts
import AppLayout from "./layouts/AppLayout";

// pages
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
          // <ProtectedRoute>
          <Hub />
          // </ProtectedRoute>
        ),
      },
      { path: "connect", element: <Connect /> },
      {
        path: "faqs",
        element: (
          <ProtectedRoute permissions={["read_faq"]}>
            <Faqs />
          </ProtectedRoute>
        ),
      },
      {
        path: "marketing",
        element: (
          <ProtectedRoute permissions={["read_marketing"]}>
            <Marketing />
          </ProtectedRoute>
        ),
      },
      // { path: "marketing/task", element: <Task /> },
      // {
      //   path: "marketing/criteria_and_segment",
      //   element: <CriteriaAndSegment />,
      // },
      {
        path: "brands",
        element: (
          <ProtectedRoute permissions={["read_brand"]}>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "stores",
        element: (
          <ProtectedRoute permissions={["read_client"]}>
            <Stores />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute permissions={["read_product"]}>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "media-kit",
        element: (
          <ProtectedRoute permissions={["read_media_kit"]}>
            <MediaKit />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute permissions={["read_user"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "shelves",
        element: (
          <ProtectedRoute permissions={["read_shelf"]}>
            <Shelves />
          </ProtectedRoute>
        ),
      },
      {
        path: "terms",
        element: (
          <ProtectedRoute permissions={["read_privacy_term"]}>
            <Terms />
          </ProtectedRoute>
        ),
      },
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
