import { useState, useEffect, useRef } from "react";

const useDebounce = (query: string, limit = 500) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, limit);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, limit]);

  return { debouncedQuery };
};

export default useDebounce;
