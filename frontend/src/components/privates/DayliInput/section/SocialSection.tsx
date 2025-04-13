"use client"

import { EmojiCard } from "../EmojiCard"
import { Positif } from "@assets/icons/Face/Positif"
import { Netral } from "@assets/icons/Face/Netral"
import { MenarikDiri } from "@assets/icons/Face/MenarikDiri"
import { Agresif } from "@assets/icons/Face/Agresif"

type SocialSectionProps = {
  selectedValue: string
  onChange: (value: string) => void
}

export const SocialSection = ({ selectedValue, onChange }: SocialSectionProps) => {
  const socialBehaviors = [
    { id: "positif", label: "Positif", icon: <Positif /> },
    { id: "netral", label: "Netral", icon: <Netral /> },
    { id: "menarik-diri", label: "Menarik diri", icon: <MenarikDiri /> },
    { id: "agresif", label: "Agresif", icon: <Agresif /> },
  ]

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-700">Sosial & Interaksi</h3>
      <div className="grid grid-cols-4 gap-2">
        {socialBehaviors.map((behavior) => (
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
