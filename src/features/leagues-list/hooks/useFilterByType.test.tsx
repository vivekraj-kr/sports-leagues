import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFilterByType } from "./useFilterByType";
import type { League } from "../types";

const leagues: League[] = [
  {
    idLeague: "4328",
    strLeague: "English Premier League",
    strSport: "Soccer",
  },
  {
    idLeague: "4387",
    strLeague: "NBA",
    strSport: "Basketball",
  },
];

describe("useFilterByType", () => {
  it("returns all leagues when no sport type is selected", () => {
    const { result } = renderHook(() => useFilterByType(leagues));

    expect(result.current.filteredByTypeData).toEqual(leagues);
  });

  it("filters leagues by selected sport type", () => {
    const { result } = renderHook(() => useFilterByType(leagues));

    act(() => {
      result.current.onDropdownChange({
        target: { value: "basketball" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.type).toBe("basketball");
    expect(result.current.filteredByTypeData).toEqual([leagues[1]]);
  });
});
