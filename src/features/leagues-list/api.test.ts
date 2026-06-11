import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "../../lib/api";
import { fetchAllLeagues, fetchBadges } from "./api";

vi.mock("../../lib/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockGet = vi.mocked(api.get);

describe("leagues api", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it("fetches all leagues", async () => {
    const data = { leagues: [] };
    mockGet.mockResolvedValue({ data });

    await expect(fetchAllLeagues()).resolves.toEqual(data);

    expect(mockGet).toHaveBeenCalledWith("all_leagues.php");
  });

  it("fetches season badges for a league", async () => {
    const data = { seasons: [] };
    mockGet.mockResolvedValue({ data });

    await expect(fetchBadges("4328")).resolves.toEqual(data);

    expect(mockGet).toHaveBeenCalledWith(
      "search_all_seasons.php?badge=1&id=4328",
    );
  });
});
