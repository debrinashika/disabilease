"use client"

import { apiBase } from "@apis"
import { BaseButton, PrimaryButton } from "@components/shares/Buttons"
import type { IApiBaseError } from "@interfaces/api"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { DateCard } from "../Planner/DateCard"
import { BehaviorSection } from "./section/BehaviourSection"
import { SocialSection } from "./section/SocialSection"
import { SleepSection } from "./section/SleepSection"
import { FoodSection } from "./section/FoodSection"
import { TherapySection } from "./section/TherapySection"
import { ViewToggle } from "./ViewToggle"

export const List = () => {
  const apiBaseError = apiBase().error<IApiBaseError>()

  const [formData, setFormData] = useState({
    behavior: "",
    social: "",
    sleep: "",
    food: "",
    therapy: [] as string[],
  })
  const handleInputChange = (category: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleSaveLogs = async () => {
    try {
      toast.success("Daily logs saved successfully!")
    } catch (error) {
      apiBaseError.set(error)
      toast.error(apiBaseError.getMessage() ?? "Failed to save logs")
    }
  }
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    return date
  })

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 10)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <div
        className={`absolute left-0 w-full h-screen z-10 transition-all ease-in-out duration-500 pb-[68px]
        ${loading ? "-bottom-full" : "bottom-0"}
        `}
      >
        <div className="fixed top-0 w-full max-w-[430px] h-[20vh] flex flex-col text-neutral-700 p-5">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-semibold text-center text-white w-full">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="flex-grow grid grid-cols-7 gap-3 items-center justify-center">
            {dates.map((date, index) => (
              <BaseButton key={index} onClick={() => handleDateChange(date)}>
                <DateCard date={date} selectedDate={selectedDate} />
              </BaseButton>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-[82vh] z-10 bg-purple-03 rounded-t-2xl px-7 py-5 overflow-y-auto">
          <ViewToggle />

          <div className="flex flex-col gap-6 pb-16 mt-4">
            <BehaviorSection
              selectedValue={formData.behavior}
              onChange={(value) => handleInputChange("behavior", value)}
            />

            <SocialSection selectedValue={formData.social} onChange={(value) => handleInputChange("social", value)} />

            <SleepSection selectedValue={formData.sleep} onChange={(value) => handleInputChange("sleep", value)} />

            <FoodSection selectedValue={formData.food} onChange={(value) => handleInputChange("food", value)} />

            <TherapySection
              selectedValues={formData.therapy}
              onChange={(value) => handleInputChange("therapy", value as string[])}
            />

            <PrimaryButton text="Save Logs" className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full" onClick={handleSaveLogs} />
          </div>
        </div>
      </div>
    </>
  )
}
