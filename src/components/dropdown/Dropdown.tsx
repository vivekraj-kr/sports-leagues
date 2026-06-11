import { memo } from "react";

type DropdownOption = {
  id: number;
  label: string;
  value: string;
};

type DropdownConfig = {
  options: DropdownOption[];
  value: string;
  onDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type DropdownProps = {
  config: DropdownConfig;
};

const Dropdown = memo(({ config }: DropdownProps) => {
  return (
    <select
      onChange={config.onDropdownChange}
      value={config.value}
      className="w-full px-3 py-2 bg-white rounded border border-gray-200"
    >
      <option value="">Select sport type </option>
      {config.options?.map((option) => {
        return (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
});

export default Dropdown;
