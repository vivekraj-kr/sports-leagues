import { memo } from "react";

type SearchBarConfig = {
  placeholder: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type SearchBarProps = {
  config: SearchBarConfig;
};

const SearchBar = memo(({ config }: SearchBarProps) => {
  return (
    <div className="w-full bg-white rounded border border-gray-200">
      <input
        className="w-full px-3 py-2"
        type="text"
        onChange={config.onInputChange}
        value={config.value}
        placeholder={config.placeholder}
      />
    </div>
  );
});

export default SearchBar;
