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
        setProduct(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/product/${id}`,
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: ProductDetails = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unable to load product");
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
    return <p role="alert">{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.productName?.trim() || `Product ${product.productId}`}</h1>

      <p>Product ID: {product.productId}</p>
      {product.supplierId != null && (
        <p>
          Supplier: <Link to={`/supplier/${product.supplierId}`}>
            {product.supplierName?.trim() || product.supplierId}
          </Link>
        </p>
      )}
      {product.quantityPerUnit?.trim() && <p>Quantity per unit: {product.quantityPerUnit}</p>}
      {product.unitPrice != null && <p>Price: {product.unitPrice}</p>}
      {product.unitsInStock != null && <p>Units in stock: {product.unitsInStock}</p>}
      {product.unitsOnOrder != null && <p>Units on order: {product.unitsOnOrder}</p>}
      {product.reorderLevel != null && <p>Reorder level: {product.reorderLevel}</p>}
      {product.discontinued != null && <p>Discontinued: {product.discontinued}</p>}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default ProductPageById;
