import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";

import Navbar2 from "./features/navigation/components/Navbar2";
import { Footer } from "./features/footer/Footer";
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  ProductDetails2,
  SignupPage,
  Sweets,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
} from "./pages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import Homepage2 from "./pages/Homepage2";
import "./index.css";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Branches from "./pages/Branches";
import AccountPage from "./pages/Account";
import ModalProvider from "./providers/ModalProvider.jsx";
// Protected Route Wrapper
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

// Layout Component
function Layout({ children }) {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-primary">
        <Navbar2 />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  if (!isAuthChecked) return null; // Wait for auth check to complete

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage2 />} />
          <Route path="/sweets" element={<Sweets />} />
          <Route path="/sweets/:id" element={<ProductDetails2 />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="/verify-otp" element={<OtpVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:userId/:passwordResetToken"
            element={<ResetPasswordPage />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Admin Routes */}
          {loggedInUser?.isAdmin && (
            <>
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/product-update/:id"
                element={
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <ProductUpdatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-product"
                element={
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <AddProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute isAuthenticated={!!loggedInUser}>
                    <AdminOrdersPage />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {/* User Routes */}

          <>
            <Route
              path="/home"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order-success/:id"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <UserOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute isAuthenticated={!!loggedInUser}>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
          </>

          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
