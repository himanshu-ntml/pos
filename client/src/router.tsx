import { Outlet, createBrowserRouter } from "react-router-dom";
import Orders from "@/components/pages/orders/Orders";
import Tables from "@/components/pages/Tables";
import Menu from "@/components/pages/menu/Menu";
import Reports from "@/components/pages/Reports";
import Search from "@/components/pages/Search";
import Waiter from "@/components/pages/waiter/Waiter";
import Authentication from "@/components/pages/Authentication";
import NotFoundPage from "./components/pages/NotFound";
import Items from "./components/pages/admin/item/Items";
import EditItem from "./components/pages/admin/item/form/EditItem";
import Order from "./components/pages/orders/Order";
import Reservations from "./components/reservations/reservationTable/Reservations";
import KitchenPage from "./components/pages/kitchen/Kitchen";
import SideBar from "./components/layout/navigation/SideBar";
import Dashboard from "./components/pages/admin/dashboard/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import SettingsPage from "./components/pages/admin/settings/SettingsPage";

const Layout = () => {
  return (
    <>
      <SideBar />
      <div className="sm:px-20">
        <Outlet />
      </div>
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/login",
        element: <Authentication />,
      },
      {
        element: <AuthOutlet fallbackPath="/login" />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
          {
            path: "/order",
            element: <Order />,
          },
          {
            path: "/tables",
            element: <Tables />,
          },
          {
            path: "/menu",
            element: <Menu />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
          {
            path: "/reservations",
            element: <Reservations />,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/waiter",
            element: <Waiter />,
          },
          {
            path: "/kitchen",
            element: <KitchenPage />,
          },
          {
            path: "/login",
            element: <Authentication />,
          },
          {
            path: "/admin",
            children: [
              {
                path: "tables",
                element: <Tables />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "items",
                element: <Items />,
              },
              {
                path: "items/edit",
                element: <EditItem />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
