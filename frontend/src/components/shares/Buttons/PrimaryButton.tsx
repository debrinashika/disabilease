type PrimaryButtonPropType = {
  text?: string
  type?: "default" | "text-only" | "icon-only" | "submit" | "topic" | "disabled"
  icon?: React.ReactNode
  className?: string
  color?: string
  disabled?: boolean
  onClick?: () => void
};

export const PrimaryButton = ({ 
  text,
  type = "default",
  icon,
  className,
  color,
  onClick,
  disabled
}: PrimaryButtonPropType) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      className={`${
        type === "default" ? "px-5 py-2 shadow rounded-full" :
        type === "icon-only" ? "p-2 w-fit flex items-center justify-center" :
        type === "submit" ? "px-5 py-2 shadow rounded-md" :
        type === "topic" ? `bg-${color}-01 hover:bg-${color}-03 text-white py-2 px-4 rounded-lg`:
        type === "disabled" ? "bg-neutral-300 text-neutral-500 py-2 px-4 border border-neutral-400 rounded-lg opacity-50 cursor-not-allowed":
        ""
      } ${className}`}
    >
      {["default", "submit", "text-only", "topic", "disabled"].includes(type) && <div>{text}</div>}

      {type == "icon-only" && icon}
    </button>
  );
}