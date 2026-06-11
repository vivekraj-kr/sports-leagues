import { useCallback, useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

export const useLeaguesSearch = (data) => {
  const [query, setQuery] = useState("");
  const { debouncedQuery } = useDebounce(query, 200);

  const onInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  const filteredData = useMemo(
    () =>
      data?.leagues?.filter((item) => {
        const lowerDebouncedQuery = debouncedQuery.toLowerCase();
        const lowerLeagueName = item.strLeague.toLowerCase();
        return lowerLeagueName.includes(lowerDebouncedQuery);
      }),
    [data?.leagues, debouncedQuery],
  );

  return { filteredData, onInputChange, query };
};
