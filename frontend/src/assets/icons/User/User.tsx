type IconPropType = {
  fillClassName: string;
  strokeClassName: string;
};

export const User = ({ fillClassName, strokeClassName }: IconPropType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5004 14.4541C9.25086 14.4541 6.09179 15.7757 6 17.1299C6 18.7598 8.97523 19.1814 12.5004 19.1814C16.0066 19.1814 19 18.7737 19 17.1445C18.5362 15.5825 15.75 14.4541 12.5004 14.4541Z"
        className={fillClassName + " " + strokeClassName}
        strokeWidth="1.30489"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7367 12.0909C14.6948 12.0909 16.2818 10.5032 16.2818 8.54509C16.2818 6.58702 14.6948 5 12.7367 5C10.7787 5 9.19094 6.58702 9.19094 8.54509C9.18433 10.4965 10.7611 12.0843 12.7118 12.0909H12.7367Z"
        className={fillClassName + " " + strokeClassName}
        strokeWidth="1.24275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
