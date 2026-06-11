import { expect, test } from "@playwright/test";

const leaguesResponse = {
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
    {
      idLeague: "4400",
      strLeague: "Formula 1",
      strSport: "Motorsport",
    },
  ],
};

const badgesResponse = {
  seasons: [
    {
      strSeason: "2012-2013",
      strBadge: null,
    },
    {
      strSeason: "2013-2014",
      strBadge: "https://example.com/premier-league-badge.png",
    },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.route("**/all_leagues.php", async (route) => {
    await route.fulfill({ json: leaguesResponse });
  });

  await page.route("**/search_all_seasons.php?badge=1&id=**", async (route) => {
    const url = new URL(route.request().url());
    const response = url.searchParams.get("id") === "4328"
      ? badgesResponse
      : { seasons: [] };

    await route.fulfill({ json: response });
  });
});

test("filters leagues by search and sport type", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("English Premier League")).toBeVisible();
  await expect(page.getByText("NBA")).toBeVisible();
  await expect(page.getByText("Formula 1")).toBeVisible();

  await page.getByPlaceholder("Search leagues...").fill("nba");

  await expect(page.getByText("NBA")).toBeVisible();
  await expect(page.getByText("English Premier League")).not.toBeVisible();

  await page.getByPlaceholder("Search leagues...").fill("");
  await page.getByRole("combobox").selectOption("motorsport");

  await expect(page.getByText("Formula 1")).toBeVisible();
  await expect(page.getByText("NBA")).not.toBeVisible();
});

test("shows empty state when filters have no matches", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search leagues...").fill("cricket");

  await expect(page.getByText("No leagues found")).toBeVisible();
  await expect(
    page.getByText("Try changing the search term or sport type."),
  ).toBeVisible();
});

test("opens and closes a badge modal from a league card", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /english premier league soccer/i }).click();

  await expect(
    page.getByRole("heading", { name: "English Premier League" }),
  ).toBeVisible();
  await expect(page.getByAltText("English Premier League badge")).toHaveAttribute(
    "src",
    "https://example.com/premier-league-badge.png",
  );

  await page.getByRole("button", { name: "Close modal" }).click();

  await expect(
    page.getByRole("heading", { name: "English Premier League" }),
  ).not.toBeVisible();
});
