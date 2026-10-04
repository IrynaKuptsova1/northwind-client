import { useEffect, useState } from "react";
import type { Product } from "./types";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const urlToServer = import.meta.env.VITE_API_URL;
    
    const res = await fetch(`${urlToServer}/data/products`);
    const jsonRes = await res.json();
    setProducts(jsonRes.data);
  };

  useEffect(() => {
    getProducts();
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