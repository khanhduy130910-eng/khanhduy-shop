import { useEffect, useState } from "react";
import { getKeyStatistics } from "../services/keyService";

export default function useKeyStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      const data = await getKeyStatistics();
      setStatistics(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    statistics,
    loading,
    refresh: load,
  };
}