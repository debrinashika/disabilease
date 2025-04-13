"use client"

import { EmojiCard } from "../EmojiCard"
import { Nyenyak } from "@assets/icons/Face/Nyenyak"
import { SeringTerbangun } from "@assets/icons/Face/SeringTerbangun"
import { MimpiBuruk } from "@assets/icons/Face/MimpiBuruk"
import { SulitTidur } from "@assets/icons/Face/SulitTidur"

type SleepSectionProps = {
  selectedValue: string
  onChange: (value: string) => void
}

export const SleepSection = ({ selectedValue, onChange }: SleepSectionProps) => {
  const sleepQualities = [
    { id: "nyenyak", label: "Nyenyak", icon: <Nyenyak /> },
    { id: "sering-terbangun", label: "Sering Terbangun", icon: <SeringTerbangun /> },
    { id: "mimpi-buruk", label: "Mimpi Buruk", icon: <MimpiBuruk /> },
    { id: "sulit-tidur", label: "Sulit Tidur", icon: <SulitTidur /> },
  ]

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-700">Kualitas Tidur</h3>
      <div className="grid grid-cols-4 gap-2">
        {sleepQualities.map((quality) => (
          <EmojiCard
            key={quality.id}
            id={quality.id}
            label={quality.label}
            icon={quality.icon}
            isSelected={selectedValue === quality.id}
            onClick={() => onChange(quality.id)}
          />
        ))}
      </div>
    </div>
  )
}
