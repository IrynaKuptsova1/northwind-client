import { useEffect, useState } from "react";
import { Link } from "react-router";
import getAvatar from "./Avatar";

import type { Employee } from "./types";

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    async function getEmployees() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/employees?limit=${limit}&offset=${offset}`,
        );
        if (!res.ok)
          throw new Error(`Unable to load employees (HTTP ${res.status})`);

        const data: { result: (Employee & { total: number })[] } =
          await res.json();
        if (data.result.length === 0 && page > 1) {
          setPage(1);
          return;
        }
        setEmployees(data.result);
        setTotal(data.result[0]?.total ?? 0);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load employees",
        );
      } finally {
        setLoading(false);
      }
    }

    getEmployees();
  }, [offset, page]);

  return (
    <div>
      <h1>Employees</h1>
      {loading ? (
        <p>Loading employees...</p>
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
                <th>Name</th>
                <th>Title</th>
                <th>City</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.employeeId}</td>
                  <td
                    style={{
                      width: "34px",
                      padding: "4px 12px 4px 0",
                      verticalAlign: "middle",
                    }}
                  >
                    {getAvatar(employee.name)}
                  </td>
                  <td>
                    <Link to={`/employee/${employee.employeeId}`}>
                      {employee.name ?? employee.employeeId}
                    </Link>
                  </td>
                  <td>{employee.title ?? "—"}</td>
                  <td>{employee.city ?? "—"}</td>
                  <td>{employee.phone ?? "—"}</td>
                  <td>{employee.country ?? "—"}</td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <span>
            Page {page} of {totalPages}
          </span>
        </>
      )}
      {!loading && !error && totalPages > 1 && (

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
          
        </div>
        
      )}
    </div>
  );
}

export default EmployeesPage;
