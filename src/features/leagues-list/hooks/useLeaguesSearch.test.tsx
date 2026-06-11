import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLeaguesSearch } from "./useLeaguesSearch";
import type { AllLeaguesResponse } from "../types";

const leagues: AllLeaguesResponse = {
  leagues: [
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
  ],
};

describe("useLeaguesSearch", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns all leagues before a search query is entered", () => {
    const { result } = renderHook(() => useLeaguesSearch(leagues));

    expect(result.current.filteredData).toEqual(leagues.leagues);
  });

  it("filters leagues by debounced search query", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useLeaguesSearch(leagues));

    act(() => {
      result.current.onInputChange({
        target: { value: "nba" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.query).toBe("nba");
    expect(result.current.filteredData).toEqual([leagues.leagues[1]]);
  });
});
