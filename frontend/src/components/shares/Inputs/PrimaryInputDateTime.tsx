import { Error } from "@assets/icons/Error";
// import { TimePicker } from "antd";
// import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent } from "react";

type PrimaryInputDateTimePropType = {
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "date" | "time" | "datetime-local";
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  minToday?: boolean;
};

export const PrimaryInputDateTime = ({
  id,
  label = "",
  placeholder = "",
  disabled = false,
  type = "date",
  value,
  error = "",
  setValue,
  className,
  minToday = false
}: PrimaryInputDateTimePropType) => {
  const setMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // const handleTimeChange = (time: Dayjs) => {
  //   // Adapt the time string to fit the expected format of setValue
  //   setValue({
  //     target: {
  //       value: time.toString(),
  //     },
  //   } as ChangeEvent<HTMLInputElement>);
  // };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium block w-fit text-neutral-800"
      >
        {label}
      </label>
      <div className="relative">
        {/* {type === "time" && (
          <TimePicker
            id={id}
            format={"HH:mm"}
            className={`rounded-xl shadow-input outline-none w-full box-border px-3 py-3 transition-all ease-in-out bg-white-01 text-sm text-neutral-800 ${
              error
                ? "shadow-input-error focus:shadow-input-focus-error"
                : "hover:shadow-input-hover focus:shadow-input-focus"
            }
            ${disabled ? "bg-gray-500" : ""}
            ${className}`}
            value={dayjs(value)}
            onChange={handleTimeChange}
          />
        )} */}

        {(
          <input
            id={id}
            type={type}
            min={minToday ? setMinDate() : undefined}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            disabled={disabled}
            className={`rounded-xl shadow-input outline-none w-full box-border px-3 py-3 transition-all ease-in-out bg-white-01 text-sm text-neutral-800 ${
              error
                ? "shadow-input-error focus:shadow-input-focus-error"
                : "hover:shadow-input-hover focus:shadow-input-focus"
            }
            ${disabled ? "bg-gray-500" : ""}
            ${className}`}
          />
        )}
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
