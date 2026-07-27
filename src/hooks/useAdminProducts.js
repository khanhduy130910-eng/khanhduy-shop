import { useEffect, useState } from "react";
import { getProducts } from "../services/adminQueryService";

export default function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    refresh: loadProducts,
  };
}