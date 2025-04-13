"use client"

import type { ReactNode } from "react"

type EmojiCardProps = {
  id: string
  label: string
  icon: ReactNode
  isSelected: boolean
  onClick: () => void
  multiSelect?: boolean
}

export const EmojiCard = ({ id, label, icon, isSelected, onClick, multiSelect = false }: EmojiCardProps) => {
  return (
    <button
      className={`flex flex-col items-center p-2 rounded-lg ${
        isSelected ? "bg-purple-100 border-2 border-purple-01" : "bg-white border border-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs text-center">{label}</span>
    </button>
  )
}
