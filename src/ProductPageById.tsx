import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { ProductDetails } from "./types";

function ProductPageById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/product/${id}`,
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: ProductDetails = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>

      <p>Product ID: {product.productId}</p>
      <p>
        Supplier:
        {product.supplierId !== null ? (
          <Link to={`/supplier/${product.supplierId}`}>
            {product.supplierName ?? `Supplier ${product.supplierId}`}
          </Link>
        ) : (
          <p>No supplier</p>
        )}{" "}
      </p>
      <p>Quantity per unit: {product.quantityPerUnit}</p>
      <p>Price: {product.unitPrice}</p>
      <p>Units in stock: {product.unitsInStock}</p>
      <p>Units on order: {product.unitsOnOrder}</p>
      <p>Reorder level: {product.reorderLevel}</p>
      <p>Discontinued: {product.discontinued ? product.discontinued : "0"}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default ProductPageById;
