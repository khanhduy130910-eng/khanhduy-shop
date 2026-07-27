import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import ShopPage from "../pages/Shop/ShopPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import WalletPage from "../pages/Wallet/WalletPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProductPage from "../pages/Product/ProductPage";
import OrderDetailPage from "../pages/Order/OrderDetailPage";
import TestUploadPage from "../pages/Test/TestUploadPage";
import AdminPage from "../pages/Admin/AdminPage";

import AdminRoute from "../components/routes/AdminRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="shop"
          element={<ShopPage />}
        />

        <Route
          path="cart"
          element={<CartPage />}
        />

        <Route
          path="checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="order/:id"
          element={<OrderDetailPage />}
        />

        <Route
          path="wallet"
          element={<WalletPage />}
        />

        <Route
          path="profile"
          element={<ProfilePage />}
        />

        <Route
          path="product/:id"
          element={<ProductPage />}
        />

        <Route
          path="test-upload"
          element={<TestUploadPage />}
        />

        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

      </Route>
    </Routes>
  );
}