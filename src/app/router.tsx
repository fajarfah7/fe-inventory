import { RackList } from "@/features/rack/pages/RackList";
import { WarehouseList } from "@/features/warehouse/pages/WarehouseList";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorNotFound } from "@/pages/error/NotFound";
import { Dashboard } from "@/pages/Dashboard";
import { ItemList } from "@/features/item/pages/ProductList";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteProtector } from "./route-protector";
import LoginPage from "@/pages/LoginPage";
import { CustomerList } from "@/features/customer/pages/CustomerList";
import { CustomerCreate } from "@/features/customer/pages/CustomerCreate";
import { CustomerEdt } from "@/features/customer/pages/CustomerEdit";
import { PurchaseOrderCreate } from "@/features/purchase_order/pages/PurchaseOrderCreate";
import { SalesOrderList } from "@/features/sales_order/pages/SalesOrderList";
import { DeliveryOrderIndex } from "@/features/delivery_order/pages/DeliveryOrderIndex";
import { DeliveryOrderCreate } from "@/features/delivery_order/pages/DeliveryOrderCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorNotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />
      },
      {
        path: "/dashboard",
        element:
          <RouteProtector>
            <Dashboard />
          </RouteProtector>
      },
      {
        path: "/warehouse",
        element:
          <RouteProtector>
            <WarehouseList />
          </RouteProtector>
      },
      {
        path: "/rack",
        element:
          <RouteProtector>
            <RackList />
          </RouteProtector>
      },
      {
        path: "/item",
        element:
          <RouteProtector>
            <ItemList />
          </RouteProtector>
      },
      {
        path: "/customer",
        element:
          <RouteProtector>
            <CustomerList />
          </RouteProtector>
      },
      {
        path: "/customer/create",
        element:
          <RouteProtector>
            <CustomerCreate />
          </RouteProtector>
      },
      {
        path: "/customer/edit/:id",
        element:
          <RouteProtector>
            <CustomerEdt />
          </RouteProtector>
      },
      {
        path: "/purchase-order/create",
        element:
          <RouteProtector>
            <PurchaseOrderCreate />
          </RouteProtector>
      },
      {
        path: "/sales-order",
        element:
          <RouteProtector>
            <SalesOrderList />
          </RouteProtector>
      },
      {
        path: "/delivery-order",
        element:
          <RouteProtector>
            <DeliveryOrderIndex />
          </RouteProtector>
      },
      {
        path: "/delivery-order/create",
        element:
          <RouteProtector>
            <DeliveryOrderCreate />
          </RouteProtector>
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />
  },
]);