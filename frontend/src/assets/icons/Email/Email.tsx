type IconPropType = {
  fillClassName: string
  strokeClassName: string
};

export const Email = ({
  fillClassName,
  strokeClassName
}: IconPropType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="5" width="18" height="14" rx="3.46668" className={fillClassName} />
      <path
        d="M6 10L11.5193 13.6795C11.8104 13.8736 12.1896 13.8736 12.4807 13.6795L18 10"
        className={strokeClassName}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
