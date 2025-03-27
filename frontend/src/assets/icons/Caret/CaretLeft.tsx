type IconPropType = {
  strokeClassName: string;
};

export const CaretLeft = ({ strokeClassName }: IconPropType) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 22.5L11.6433 15.8839C11.1189 15.3957 11.1189 14.6043 11.6433 14.1161L18.75 7.5"
        className={strokeClassName}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
