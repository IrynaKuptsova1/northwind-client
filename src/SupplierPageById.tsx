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

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/supplier/${id}`,
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: SupplierDetails = await res.json();
        setSupplier(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getSupplier();
    }
  }, [id]);

  if (loading) {
    return <p>Loading supplier...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!supplier) {
    return <p>Supplier not found</p>;
  }

  return (
    <div>
      <h1>Supplier information</h1>
      <p>Company name: {supplier.companyName}</p>
      <p>Contact name: {supplier.contactName}</p>
      <p>Contact title: {supplier.contactTitle}</p>
      <p>Address: {supplier.address}</p>
      <p>City: {supplier.city}</p>
      <p>Region: {supplier.region}</p>
      <p>Postal code: {supplier.postalCode}</p>
      <p>Country: {supplier.country}</p>
      <p>Phone: {supplier.phone}</p>
      {supplier.fax ? <p>Fax: {supplier.fax}</p> : null}
      {supplier.homePage ? <p>Home page: {supplier.homePage}</p> : null}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default SupplierPageById;
