import { useEffect, useState } from "react";
import { getProductById } from "../services/productDetailService";

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      load();
    }
  }, [id]);

  return {
    product,
    loading,
  };
}
