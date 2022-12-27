import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import FormProduct from "./pages/admin/FormProduct";
import FormUser from "./pages/admin/FormUser";
import ListProduct from "./pages/admin/ListProduct";
import ListUser from "./pages/admin/ListUser";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ListProduct />} />
          <Route path="/product/edit/:id" element={<FormProduct />} />
          <Route path="/product/add" element={<FormProduct />} />
          <Route path="/users" element={<ListUser />} />
          <Route path="/user/add" element={<FormUser />} />
          <Route path="/user/edit/:id" element={<FormUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
