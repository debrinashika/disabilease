import { Error } from "@assets/icons/Error";
import { ChangeEvent } from "react";

type PrimaryInputDropdownPropType = {
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Array<{ value: string | number; label: string }>;
  selectedValue: string | number;
  error?: string;
  setValue: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export const PrimaryInputDropdown = ({
  id,
  label = "",
  options,
  disabled = false,
  selectedValue,
  error = "",
  setValue,
  className,
}: PrimaryInputDropdownPropType) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium block w-fit text-neutral-800"
      >
        {label}
      </label>
      <div>
        <select
          id={id}
          value={selectedValue}
          onChange={setValue}
          disabled={disabled}
          className={`rounded-xl shadow-input outline-none w-full box-border px-3 py-3 transition-all ease-in-out bg-white-01 text-sm text-neutral-800 ${
            error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "hover:shadow-input-hover focus:shadow-input-focus"
          }
          
          ${disabled ? "bg-gray-500" : ""}
          ${className}`}
        >
        <option
          key=""
          className=""
          disabled
          value={typeof selectedValue === "string" ? "" : -1}
        >
          {`Select ${label}`}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
      </div>

      {error && (
        <div className="flex gap-2 items-center">
          <div className="w-3.5">
            <Error fillClassName="w-3.5 fill-danger mb-[1px]" />
          </div>
          <p className="text-xs font-normal text-danger">{error}</p>
        </div>
      )}
    </div>
  );
};
