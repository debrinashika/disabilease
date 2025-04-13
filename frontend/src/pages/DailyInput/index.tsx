import { DailyInput } from "@components/privates/DayliInput/DailyInput";
import { BottomNav } from "@components/shares/BottomNav";

export default function DailyInputPage() {
  return (
      <div className="flex flex-col h-screen relative items-stretch">
        <div className="relative h-screen overflow-y-auto overscroll-contain items-stretch bg-purple-01 ">
          <DailyInput />
        </div>
        <BottomNav screen={"planner"} />
      </div>
    );
}
