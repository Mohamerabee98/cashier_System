import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

// Dashboard layout
import DashboardLayout from "./dashboard/layout/DashboardLayout";
import DashboardHome from "./dashboard/pages/Home";
import Products from "./dashboard/pages/Products";
import Categories from "./dashboard/pages/Categories";
import Invoices from "./dashboard/pages/Invoices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute role={"cashier"}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={"admin"}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;