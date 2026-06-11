import { useCallback, useMemo, useState } from "react";

const TYPE_OPTIONS = [
  {
    id: 1,
    label: "Soccer",
    value: "soccer",
  },
  {
    id: 2,
    label: "Basketball",
    value: "basketball",
  },
  {
    id: 3,
    label: "Motorsport",
    value: "motorsport",
  },
];

export const useFilterByType = (data) => {
  const [type, setType] = useState("");

  const onDropdownChange = useCallback((e) => {
    const val = e.target.value;
    setType(val);
  }, []);

  const filteredByTypeData = useMemo(
    () =>
      type
        ? data?.filter((item) => {
            return item.strSport.toLowerCase() === type.toLowerCase();
          })
        : data,
    [data, type],
  );

  return { TYPE_OPTIONS, filteredByTypeData, onDropdownChange, type };
};
