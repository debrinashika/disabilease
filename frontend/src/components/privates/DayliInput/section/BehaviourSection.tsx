"use client"

import { EmojiCard } from "../EmojiCard"
import { Sad } from "@assets/icons/Face/Sad"
import { Angry } from "@assets/icons/Face/Angry"
import { VeryGood } from "@assets/icons/Face/VerryGood"
import { Ok } from "@assets/icons/Face/Ok"
import { Happy } from "@assets/icons/Face/Happy"

type BehaviorSectionProps = {
  selectedValue: string
  onChange: (value: string) => void
}

export const BehaviorSection = ({ selectedValue, onChange }: BehaviorSectionProps) => {
  const behaviors = [
    { id: "very-good", label: "Very Good", icon: <VeryGood /> },
    { id: "good", label: "Good", icon: <Happy /> },
    { id: "ok", label: "Ok", icon: <Ok /> },
    { id: "bad", label: "Bad", icon: <Angry /> },
    { id: "depressed", label: "Depressed", icon: <Sad /> },
  ]

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-700">Pemantauan Perilaku</h3>
      <div className="grid grid-cols-5 gap-2">
        {behaviors.map((behavior) => (
          <EmojiCard
            key={behavior.id}
            id={behavior.id}
            label={behavior.label}
            icon={behavior.icon}
            isSelected={selectedValue === behavior.id}
            onClick={() => onChange(behavior.id)}
          />
        ))}
      </div>
    </div>
  )
}
