import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as leaguesApi from "../api";
import { useFetchAllLeagues, useFetchBadges } from "./api-hooks";

vi.mock("../api", () => ({
  fetchAllLeagues: vi.fn(),
  fetchBadges: vi.fn(),
}));

const mockFetchAllLeagues = vi.mocked(leaguesApi.fetchAllLeagues);
const mockFetchBadges = vi.mocked(leaguesApi.fetchBadges);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("api hooks", () => {
  beforeEach(() => {
    mockFetchAllLeagues.mockReset();
    mockFetchBadges.mockReset();
  });

  it("fetches all leagues", async () => {
    const data = { leagues: [] };
    mockFetchAllLeagues.mockResolvedValue(data);

    const { result } = renderHook(() => useFetchAllLeagues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(data);
    expect(mockFetchAllLeagues).toHaveBeenCalledTimes(1);
  });

  it("does not fetch badges until a league id is available", () => {
    renderHook(() => useFetchBadges(undefined), {
      wrapper: createWrapper(),
    });

    expect(mockFetchBadges).not.toHaveBeenCalled();
  });

  it("fetches badges for a league id", async () => {
    const data = { seasons: [] };
    mockFetchBadges.mockResolvedValue(data);

    const { result } = renderHook(() => useFetchBadges("4328"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(data);
    expect(mockFetchBadges).toHaveBeenCalledWith("4328");
  });
});
