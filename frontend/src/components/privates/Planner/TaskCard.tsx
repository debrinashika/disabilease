import { Checkbox } from "@assets/icons/Checkbox";
import { Clock } from "@assets/icons/Clock";
import { DotsHorizontal } from "@assets/icons/Dots";
import { PrimaryButton } from "@components/shares/Buttons";
import { useState } from "react";

type TaskCardPropType = {
  is_recommendation: boolean;
  name: string;
  duration: string;
  deadline?: string;
  status?: number;
  category?: string;
  onClick?: () => void;
  onEdit?: () => void;
};

export const TaskCard = ({ 
  is_recommendation,
  name,
  duration,
  deadline,
  status,
  category,
  onClick,
  onEdit
}: TaskCardPropType) => {
  const [statusLocal, setStatusLocal] = useState(status); // Initialize statusLocal with status or default to 0

  const onClickLocal = () => {
    const newStatus = statusLocal === 0 ? 1 : 0; // Toggle status
    setStatusLocal(newStatus);
    onClick?.(); // Call onClick function if provided
  };

  return (
    <>
      {is_recommendation && (
        <div className="w-full flex flex-row rounded-2xl border gap-3 py-2.5 px-4 border-orange-02 bg-yellow-02 bg-opacity-40">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-semibold text-orange-01">{name}</p>
            <div className="flex flex-col gap-1 text-xs text-neutral-500">
              <div className="flex flex-row gap-2 items-center">
                <Clock strokeClassName="stroke-neutral-500" />
                <p>{duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!is_recommendation && (
        <div
          className={`w-full flex flex-row gap-2.5 rounded-2xl border py-2.5 pr-4 pl-2 border-neutral-400 ${
            statusLocal != 0 ? "bg-neutral-100" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            <PrimaryButton
              type="icon-only"
              icon={<Checkbox active={statusLocal == 1} />}
              onClick={onClickLocal}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex flex-row justify-between items-center">
              <p
                className={`text-sm font-semibold ${
                  statusLocal == 0 ? "text-green-01" : "text-neutral-600"
                }`}
              >
                {name}
              </p>
              {statusLocal == 0 && (
                <PrimaryButton
                  type="icon-only"
                  className="p-0"
                  icon={<DotsHorizontal fillClassName="fill-neutral-500" />}
                  onClick={onEdit}
                />
              )}
            </div>

            <div className="flex flex-col gap-0.5 text-xs text-neutral-500">
              <p>Until {deadline}</p>
              <div className="flex flex-row gap-2 items-center">
                <Clock strokeClassName="stroke-neutral-500" />
                <p>{duration}</p>
              </div>
            </div>

            <div
              className={`w-fit px-2 py-0.5 rounded-full ${
                statusLocal == 0 ? "bg-yellow-04" : "bg-neutral-200"
              }`}
            >
              <p
                className={`text-[10px] font-medium ${
                  statusLocal == 0 ? "text-orange-01" : "text-neutral-500"
                }`}
              >
                {category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
