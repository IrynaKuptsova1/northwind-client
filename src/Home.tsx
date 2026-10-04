import { useEffect, useState } from "react";
import type { Product } from "./types";
function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const getProduts = async () => {
    const res = await fetch("http://localhost:8787/products");

    const jsonRes = await res.json();
    setProducts(jsonRes.data);
  };
  useEffect(() => {
    getProduts();
  }, []);

  return (
    <table>
  <tbody>
    {products.map((product) => {
      return (
        <tr key={product.productId}>
          <td>{product.productName}</td>
          <td>{product.unitPrice}</td>
          <td>{product.unitsInStock}</td>
        </tr>
      );
    })}
  </tbody>
</table>
  );
}

export default Home;
