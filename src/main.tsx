import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Home from "./Home";
import Products from "./Products";
import ProductPageById from "./ProductPageById";
import SupplierPageById from "./SupplierPageById";
import Sidebar from "./Sidebar";
import Customers from "./Costomers";
import CustomerPageById from "./CustomerPageById";
import Suppliers from "./SupplierPage";
import Employees from "./Employees";
import EmployeePageById from "./EmployeePageById";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/product/:id" element={<ProductPageById />} />
          <Route path="/supplier/:id" element={<SupplierPageById />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/:id" element={<EmployeePageById />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:id" element={<CustomerPageById />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
);
