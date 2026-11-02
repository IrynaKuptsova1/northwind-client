import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Products } from "./types";

function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState(true);

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      setProducts([]);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/data/products?limit=${limit}&offset=${offset}`,
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: { result: (Products & { total: number })[] } = await res.json();
        setProducts(data.result);
        setTotal(data.result[0]?.total ?? 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [offset]);

  return (
    <div>
      <h1>Products</h1>
      {loading ? <p>Loading products...</p> : (
        <>
        <p>Total: {total}</p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qt per unit</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Orders</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <Link to={`/product/${product.productId}`}>
                    {product.productName ?? product.productId}
                  </Link>
                </td>

                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice === null ? "—" : `$${product.unitPrice}`}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitsOnOrder}</td>
                <td></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6}>No products found.</td></tr>
            )}
          </tbody>
        </table>

        {products.length > 0 && (
        <div className="pagination">
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={page === pageNumber}
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
      </>
      )}
    </div>
  );
}

export default ProductsPage;
