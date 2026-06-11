export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
};

export type AllLeaguesResponse = {
  leagues: League[];
};

export type SeasonBadge = {
  strSeason: string;
  strBadge: string | null;
};

export type BadgeResponse = {
  seasons: SeasonBadge[] | null;
};

export type DropdownOption = {
  id: number;
  label: string;
  value: string;
};
