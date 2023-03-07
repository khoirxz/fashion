import { BrowserRouter, Routes, Route } from "react-router-dom";

//! admin pages
import Dashboard from "./pages/admin/Dashboard";
import FormProduct from "./pages/admin/FormProduct";
import FormUser from "./pages/admin/FormUser";
import ListProduct from "./pages/admin/ListProduct";
import ListUser from "./pages/admin/ListUser";
import Login from "./pages/admin/Login";
import Categories from "./pages/admin/Categories";
import FormCategories from "./pages/admin/FormCategories";

//! public pages
import Home from "./pages/public/Home";
import ProductPage from "./pages/public/ProductPage";
import LoginPublic from "./pages/public/Login";
//! utils
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/admin" element={<Login />} />
          <Route path="/dashboard/products" element={<ListProduct />} />
          <Route path="/dashboard/product/edit/:id" element={<FormProduct />} />
          <Route path="/dashboard/product/add" element={<FormProduct />} />
          <Route path="/dashboard/categories" element={<Categories />} />

          <Route
            path="/dashboard/categories/add"
            element={<FormCategories />}
          />
          <Route
            path="/dashboard/categories/edit/:id"
            element={<FormCategories />}
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute>
                <ListUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user/add"
            element={
              <ProtectedRoute>
                <FormUser />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/user/edit/:id" element={<FormUser />} />
          {/* public */}
          <Route path="/login" element={<LoginPublic />} />
          <Route path="/signup" element={<LoginPublic />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
