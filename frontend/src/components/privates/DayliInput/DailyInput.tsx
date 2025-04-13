import { List } from "./List"
import { BottomNav } from "@components/shares/BottomNav"

export const DailyInput = () => {
  return (
    <div className="flex flex-col h-screen relative items-stretch">
      <div className="relative h-screen overflow-y-auto overscroll-contain items-stretch bg-purple-01 ">
        <List />
      </div>
      <BottomNav screen={"planner"} />
    </div>
  )
}
