import { BrowserRouter, Routes, Route } from "react-router-dom";

//! admin pages
import Dashboard from "./pages/admin/Dashboard";
import FormProduct from "./pages/admin/FormProduct";
import FormUser from "./pages/admin/FormUser";
import ListProduct from "./pages/admin/ListProduct";
import ListUser from "./pages/admin/ListUser";
import Login from "./pages/admin/Login";
//! public pages
import Home from "./pages/public/Home";
//! utils
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/products" element={<ListProduct />} />
          <Route path="/dashboard/product/edit/:id" element={<FormProduct />} />
          <Route path="/dashboard/product/add" element={<FormProduct />} />
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
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
