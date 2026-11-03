import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { EmployeeDetails } from "./types";

function EmployeePageById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [manager, setManager] = useState<EmployeeDetails | null>(null);
  const [managerError, setManagerError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getEmployee() {
      setLoading(true);
      setError("");
      setEmployee(null);
      try {
        if (!id) throw new Error("Missing employee ID");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/employee/${id}`,
        );
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Employee not found" : `Unable to load employee (HTTP ${res.status})`);
        }
        const data: EmployeeDetails = await res.json();
        setEmployee(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load employee");
      } finally {
        setLoading(false);
      }
    }

    getEmployee();
  }, [id]);

  const managerId = employee?.reportsTo;

  useEffect(() => {
    async function getManager() {
      setManager(null);
      setManagerError("");
      if (managerId == null) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/employee/${managerId}`,
        );
        if (!res.ok) throw new Error(`Unable to load manager (HTTP ${res.status})`);
        const data: EmployeeDetails = await res.json();
        setManager(data);
      } catch (error) {
        setManagerError(error instanceof Error ? error.message : "Unable to load manager");
      }
    }

    getManager();
  }, [managerId]);

  if (loading) return <p>Loading employee...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div>
      <h1>Employee information</h1>
      {(employee.firstName?.trim() || employee.lastName?.trim()) && (
        <p>Name: {[employee.firstName, employee.lastName].filter(Boolean).join(" ")}</p>
      )}
      {employee.title?.trim() && <p>Title: {employee.title}</p>}
      {employee.titleOfCourtesy?.trim() && <p>Title of courtesy: {employee.titleOfCourtesy}</p>}
      {employee.birthDate?.trim() && <p>Birth date: {employee.birthDate}</p>}
      {employee.hireDate?.trim() && <p>Hire date: {employee.hireDate}</p>}
      {employee.address?.trim() && <p>Address: {employee.address}</p>}
      {employee.city?.trim() && <p>City: {employee.city}</p>}
      {employee.region?.trim() && <p>Region: {employee.region}</p>}
      {employee.postalCode?.trim() && <p>Postal code: {employee.postalCode}</p>}
      {employee.country?.trim() && <p>Country: {employee.country}</p>}
      {employee.homePhone?.trim() && <p>Home phone: {employee.homePhone}</p>}
      {employee.extension?.trim() && <p>Extension: {employee.extension}</p>}
      {employee.notes?.trim() && <p>Notes: {employee.notes}</p>}
      {employee.reportsTo != null && (
        <p>
          Reports to: {manager?.employeeId === employee.reportsTo ? (
            <Link to={`/employee/${employee.reportsTo}`}>
              {[manager.firstName, manager.lastName].filter(Boolean).join(" ").trim() || "Name unavailable"}
            </Link>
          ) : managerError ? (
            <span role="alert">{managerError}</span>
          ) : (
            <span>Loading manager...</span>
          )}
        </p>
      )}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default EmployeePageById;
