import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { CustomerDetails } from "./types";

function CustomerPageById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCustomer() {
      setLoading(true);
      setError("");
      setCustomer(null);
      try {
        if (!id) throw new Error("Missing customer ID");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/customer/${id}`,
        );
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Customer not found" : `Unable to load customer (HTTP ${res.status})`);
        }
        const data: CustomerDetails = await res.json();
        setCustomer(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load customer");
      } finally {
        setLoading(false);
      }
    }

    getCustomer();
  }, [id]);

  if (loading) return <p>Loading customer...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!customer) return <p>Customer not found</p>;

  return (
    <div>
      <h1>{customer.companyName?.trim() || customer.customerId}</h1>
      <p>Customer ID: {customer.customerId}</p>
      {customer.companyName?.trim() && <p>Company name: {customer.companyName}</p>}
      {customer.contactName?.trim() && <p>Contact name: {customer.contactName}</p>}
      {customer.contactTitle?.trim() && <p>Contact title: {customer.contactTitle}</p>}
      {customer.address?.trim() && <p>Address: {customer.address}</p>}
      {customer.city?.trim() && <p>City: {customer.city}</p>}
      {customer.region?.trim() && <p>Region: {customer.region}</p>}
      {customer.postalCode?.trim() && <p>Postal code: {customer.postalCode}</p>}
      {customer.country?.trim() && <p>Country: {customer.country}</p>}
      {customer.phone?.trim() && <p>Phone: {customer.phone}</p>}
      {customer.fax?.trim() && <p>Fax: {customer.fax}</p>}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default CustomerPageById;
