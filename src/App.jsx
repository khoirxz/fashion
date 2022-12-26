import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import FormProduct from "./pages/admin/FormProduct";
import ListProduct from "./pages/admin/ListProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ListProduct />} />
          <Route path="/product/edit/:id" element={<FormProduct />} />
          <Route path="/product/add" element={<FormProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
