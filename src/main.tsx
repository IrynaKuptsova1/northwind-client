import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Home from "./Home";
import Products from "./Products";
import ProductPageById from "./ProductPageById";
import SupplierPageById from "./SupplierPageById";
import Sidebar from "./Sidebar";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<h1>Suppliers</h1>} />
          <Route path="/product/:id" element={<ProductPageById />} />
          <Route path="/supplier/:id" element={<SupplierPageById />} />
          
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
);
