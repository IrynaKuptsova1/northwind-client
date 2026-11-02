import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { SupplierDetails } from "./types";

function SupplierPageById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSupplier() {
      try {
        setLoading(true);
        setError("");
        setSupplier(null);

        if (!id) throw new Error("Missing supplier ID");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/supplier/${encodeURIComponent(id ?? "")}`,
        );

        if (!res.ok) {
          throw new Error(res.status === 404 ? "Supplier not found" : `Unable to load supplier (HTTP ${res.status})`);
        }

        const data: SupplierDetails = await res.json();
        setSupplier(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load supplier");
      } finally {
        setLoading(false);
      }
    }

    getSupplier();
  }, [id]);

  if (loading) {
    return <p>Loading supplier...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!supplier) {
    return <p>Supplier not found</p>;
  }

  return (
    <div>
      <h1>Supplier information</h1>
      <p>Supplier ID: {supplier.supplierId}</p>
      {supplier.companyName?.trim() && <p>Company name: {supplier.companyName}</p>}
      {supplier.contactName?.trim() && <p>Contact name: {supplier.contactName}</p>}
      {supplier.contactTitle?.trim() && <p>Contact title: {supplier.contactTitle}</p>}
      {supplier.address?.trim() && <p>Address: {supplier.address}</p>}
      {supplier.city?.trim() && <p>City: {supplier.city}</p>}
      {supplier.region?.trim() && <p>Region: {supplier.region}</p>}
      {supplier.postalCode?.trim() && <p>Postal code: {supplier.postalCode}</p>}
      {supplier.country?.trim() && <p>Country: {supplier.country}</p>}
      {supplier.phone?.trim() && <p>Phone: {supplier.phone}</p>}
      {supplier.fax?.trim() && <p>Fax: {supplier.fax}</p>}
      {supplier.homePage?.trim() && <p>Home page: {supplier.homePage}</p>}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default SupplierPageById;
