import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import LeaguesList from "./LeaguesList";
import { useFetchAllLeagues, useFetchBadges } from "./hooks/api-hooks";
import type { AllLeaguesResponse, BadgeResponse } from "./types";

vi.mock("./hooks/api-hooks", () => ({
  useFetchAllLeagues: vi.fn(),
  useFetchBadges: vi.fn(),
}));

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

const badgeResponse: BadgeResponse = {
  seasons: [
    {
      strSeason: "2012-2013",
      strBadge: null,
    },
    {
      strSeason: "2013-2014",
      strBadge: "https://example.com/badge.png",
    },
  ],
};

const mockUseFetchAllLeagues = vi.mocked(useFetchAllLeagues);
const mockUseFetchBadges = vi.mocked(useFetchBadges);

describe("LeaguesList", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders fetched leagues", () => {
    mockUseFetchAllLeagues.mockReturnValue({ data: leagues } as ReturnType<
      typeof useFetchAllLeagues
    >);
    mockUseFetchBadges.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as ReturnType<typeof useFetchBadges>);

    render(<LeaguesList />);

    expect(screen.getByText("English Premier League")).toBeInTheDocument();
    expect(screen.getByText("NBA")).toBeInTheDocument();
  });

  it("shows an empty state when search has no matches", () => {
    vi.useFakeTimers();
    mockUseFetchAllLeagues.mockReturnValue({ data: leagues } as ReturnType<
      typeof useFetchAllLeagues
    >);
    mockUseFetchBadges.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as ReturnType<typeof useFetchBadges>);

    render(<LeaguesList />);

    fireEvent.change(screen.getByPlaceholderText("Search leagues..."), {
      target: { value: "cricket" },
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByText("No leagues found")).toBeInTheDocument();
  });

  it("opens a modal with the first available badge image", async () => {
    const user = userEvent.setup();
    mockUseFetchAllLeagues.mockReturnValue({ data: leagues } as ReturnType<
      typeof useFetchAllLeagues
    >);
    mockUseFetchBadges.mockImplementation(
      (leagueId?: string) =>
        ({
          data: leagueId ? badgeResponse : undefined,
          isLoading: false,
        }) as ReturnType<typeof useFetchBadges>,
    );

    render(<LeaguesList />);

    await user.click(
      screen.getByRole("button", { name: /english premier leaguesoccer/i }),
    );

    expect(
      screen.getByRole("heading", { name: "English Premier League" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "English Premier League badge" }))
      .toHaveAttribute("src", "https://example.com/badge.png");

    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(
      screen.queryByRole("heading", { name: "English Premier League" }),
    ).not.toBeInTheDocument();
  });
});
