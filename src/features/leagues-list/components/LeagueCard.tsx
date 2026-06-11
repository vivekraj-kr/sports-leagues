import { memo } from "react";

type LeagueCardProps = {
  league: {
    idLeague: string;
    strLeague: string;
    strSport: string;
  };
  onCardClick: (league) => void;
};

const LeagueCard = memo(({ league, onCardClick }: LeagueCardProps) => {
  return (
    <button
      onClick={() => onCardClick(league)}
      className="cursor-pointer bg-white p-5 rounded border border-gray-200"
    >
      <span className="block">{league.strLeague}</span>
      <span className="block">{league.strSport}</span>
    </button>
  );
});

export default LeagueCard;
