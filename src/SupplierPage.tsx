import { useEffect, useState } from "react";
import { Link } from "react-router";
import getAvatar from "./Avatar";

import type { Suppliers } from "./types";

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    async function getSuppliers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/suppliers?limit=${limit}&offset=${offset}`,
        );
        if (!res.ok)
          throw new Error(`Unable to load suppliers (HTTP ${res.status})`);

        const data: { result: (Suppliers & { total: number })[] } =
          await res.json();
        if (data.result.length === 0 && page > 1) {
          setPage(1);
          return;
        }
        setSuppliers(data.result);
        setTotal(data.result[0]?.total ?? 0);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load suppliers",
        );
      } finally {
        setLoading(false);
      }
    }

    getSuppliers();
  }, [offset, page]);

  return (
    <div>
      <h1>Suppliers</h1>
      {loading ? (
        <p>Loading suppliers...</p>
      ) : error ? (
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
              {suppliers.map((supplier) => (
                <tr key={supplier.supplierId}>
                  <td>{supplier.supplierId}</td>
                  <td style={{ width: "34px", padding: "4px 12px 4px 0", verticalAlign: "middle" }}>
                    {getAvatar(supplier.contactName)}
                  </td>
                  <td>
                    <Link to={`/supplier/${supplier.supplierId}`}>
                      {supplier.companyName ?? supplier.supplierId}
                    </Link>
                  </td>
                  <td>{supplier.contactName ?? "—"}</td>
                  <td>{supplier.contactTitle ?? "—"}</td>
                  <td>{supplier.city ?? "—"}</td>
                  <td>{supplier.country ?? "—"}</td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={7}>No suppliers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {!loading && !error && suppliers.length > 0 && (
        <div className="pagination">
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={loading || page === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <span>
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

export default SuppliersPage;
