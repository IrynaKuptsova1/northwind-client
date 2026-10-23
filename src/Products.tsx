import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Products } from "./types";

function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const limit = 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  const getProducts = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/data/products?limit=${limit}&offset=${offset}`,
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const jsonRes: {
      result: (Products & { total: number })[];
    } = await res.json();

    setProducts(
      jsonRes.result.map(({ total: _total, ...product }) => product),
    );

    if (jsonRes.result.length > 0) {
      setTotal(jsonRes.result[0].total);
    }
  };

  useEffect(() => {
    getProducts().catch(console.error);
  }, [page]);

  return (
    <div>
      <h1>Products</h1>
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
                  {product.productName}
                </Link>
              </td>

              <td>{product.quantityPerUnit}</td>
              <td>${Number(product.unitPrice)}</td>
              <td>{product.unitsInStock}</td>
              <td>{product.unitsOnOrder}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
}

export default ProductsPage;
