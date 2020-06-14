import { useState } from "react";

export default function useApi(apiBase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);

  // Request init is the same as the one for
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  return {
    loading,
    error,
    fetch: async (apiRoute, requestInit) => {
      setLoading(true);

      const result = await fetch(`${apiBase}/${apiRoute}`, requestInit).catch(
        ex => {
          setLoading(false);
          setError(ex);
        }
      );

      setLoading(false);

      const fetchData = await result.json();
      setData(fetchData);
      return data;
    },
    data
  };
}
