import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/suppliers", label: "Suppliers" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
  { to: "/employees", label: "Employees" },
  { to: "/customers", label: "Customers" },
  { to: "/search", label: "Search" },
  { to: "/analytics", label: "Analytics" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Northwind Traders</h2>
      <nav>
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className="sidebar__link">
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
