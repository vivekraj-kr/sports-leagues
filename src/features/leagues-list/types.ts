export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
};

export type AllLeaguesResponse = {
  leagues: League[];
};

export type DropdownOption = {
  id: number;
  label: string;
  value: string;
};
