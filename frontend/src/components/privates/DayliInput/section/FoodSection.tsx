"use client"

import { EmojiCard } from "../EmojiCard"
import { Cukup } from "@assets/icons/Face/Cukup"
import { Sedikit } from "@assets/icons/Face/Sedikit"
import { Tidak } from "@assets/icons/Face/Tidak"

type FoodSectionProps = {
  selectedValue: string
  onChange: (value: string) => void
}

export const FoodSection = ({ selectedValue, onChange }: FoodSectionProps) => {
  const foodIntakes = [
    { id: "cukup", label: "Cukup", icon: <Cukup /> },
    { id: "sedikit", label: "Sedikit", icon: <Sedikit /> },
    { id: "tidak", label: "Tidak", icon: <Tidak /> },
  ]

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-700">Kecukupan Asupan Makanan</h3>
      <div className="grid grid-cols-3 gap-2">
        {foodIntakes.map((intake) => (
          <EmojiCard
            key={intake.id}
            id={intake.id}
            label={intake.label}
            icon={intake.icon}
            isSelected={selectedValue === intake.id}
            onClick={() => onChange(intake.id)}
          />
        ))}
      </div>
    </div>
  )
}
