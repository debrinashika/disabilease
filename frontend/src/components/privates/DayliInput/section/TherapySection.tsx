"use client"

import { EmojiCard } from "../EmojiCard"
import { Fisioterapi } from "@assets/icons/Face/Fisioterapi"
import { TerapiSosial } from "@assets/icons/Face/TerapiSosial"
import { TerapiWicara } from "@assets/icons/Face/TerapiWicara"
import { TerapiOkupasi } from "@assets/icons/Face/Okupasi"

type TherapySectionProps = {
  selectedValues: string[]
  onChange: (values: string[]) => void
}

export const TherapySection = ({ selectedValues, onChange }: TherapySectionProps) => {
  const therapyTypes = [
    { id: "fisioterapi", label: "Fisioterapi", icon: <Fisioterapi /> },
    { id: "terapi-sosial", label: "Terapi Sosial", icon: <TerapiSosial /> },
    { id: "terapi-wicara", label: "Terapi Wicara", icon: <TerapiWicara /> },
    { id: "terapi-okupasi", label: "Terapi Okupasi", icon: <TerapiOkupasi /> },
  ]

  const handleToggleTherapy = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter((item) => item !== id))
    } else {
      onChange([...selectedValues, id])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-700">Terapi</h3>
      <div className="grid grid-cols-4 gap-2">
        {therapyTypes.map((therapy) => (
          <EmojiCard
            key={therapy.id}
            id={therapy.id}
            label={therapy.label}
            icon={therapy.icon}
            isSelected={selectedValues.includes(therapy.id)}
            onClick={() => handleToggleTherapy(therapy.id)}
            multiSelect
          />
        ))}
      </div>
    </div>
  )
}
