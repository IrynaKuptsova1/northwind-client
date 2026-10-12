import { useEffect, useState } from "react";
import type { Product } from "./types";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
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

    const jsonRes: { result: (Product & { total: number })[] } =
      await res.json();

    setProducts(jsonRes.result.map(({ total: _total, ...product }) => product));
    setTotal(jsonRes.result[0].total);
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
                <a href={`/data/product/${product.productId}`}>
                  {product.productName}
                </a>
              </td>

              <td>{product.quantityPerUnit}</td>

              <td>${Number(product.unitPrice).toFixed(0)}</td>

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

export default Home;
