import { useEffect, useState } from "react";
import { Link } from "react-router";

import getAvatar from "./Avatar";
import type { Customers } from "./types";

function CustomersPage() {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    async function getCustomers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/customers?limit=${limit}&offset=${offset}`,
        );
        if (!res.ok) throw new Error(`Unable to load customers (HTTP ${res.status})`);

        const data: { result: (Customers & { total: number })[] } = await res.json();
        // Empty pages contain no total; return to the first page if data shrank.
        if (data.result.length === 0 && page > 1) {
          setPage(1);
          return;
        }
        setCustomers(data.result);
        setTotal(data.result[0]?.total ?? 0);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load customers");
      } finally {
        setLoading(false);
      }
    }

    getCustomers();
  }, [offset, page]);

  return (
    <div>
      <h1>Customers</h1>
      {loading ? <p>Loading customers...</p> : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <p>Total: {total}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th scope="col" aria-label="Avatar" />
                <th>Company name</th>
                <th>Contact name</th>
                <th>Contact title</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td style={{ width: "34px", padding: "4px 12px 4px 0", verticalAlign: "middle" }}>
                    {getAvatar(customer.contactName)}
                  </td>
                  <td>
                    <Link to={`/customer/${encodeURIComponent(customer.customerId)}`}>
                      {customer.companyName ?? customer.customerId}
                    </Link>
                  </td>
                  <td>{customer.contactName ?? "—"}</td>
                  <td>{customer.contactTitle ?? "—"}</td>
                  <td>{customer.city ?? "—"}</td>
                  <td>{customer.country ?? "—"}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={7}>No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {!loading && !error && customers.length > 0 && (
        <div className="pagination">
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button key={pageNumber} onClick={() => setPage(pageNumber)} disabled={loading || page === pageNumber}>
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <span>Page {page} of {totalPages}</span>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
