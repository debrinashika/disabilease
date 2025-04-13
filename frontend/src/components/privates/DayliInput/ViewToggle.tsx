"use client"

import { Link, useLocation } from "react-router-dom"

export const ViewToggle = () => {
  const location = useLocation()
  const isPlanner = location.pathname === "/planner"

  return (
    <div className="flex w-full border-b border-orange-300">
      <Link
        to="/dailyinput"
        className={`flex-1 py-2 text-center ${
          !isPlanner ? "text-orange-500 border-b-2 border-orange-500 font-medium" : "text-gray-600"
        }`}
      >
        Daily Input
      </Link>
      <Link
        to="/planner"
        className={`flex-1 py-2 text-center ${
          isPlanner ? "text-orange-500 border-b-2 border-orange-500 font-medium" : "text-gray-600"
        }`}
      >
        Planner
      </Link>
    </div>
  )
}
