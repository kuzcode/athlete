import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataFunc = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }, [fn]);  // fn - это зависимость, поэтому мы добавляем её сюда

  useEffect(() => {
    fetchDataFunc();
  }, [fetchDataFunc]);

  const refetch = () => fetchDataFunc();

  return { data, loading, refetch };
};

export default useAppwrite;
