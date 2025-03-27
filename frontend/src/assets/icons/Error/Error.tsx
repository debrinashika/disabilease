type IconPropType = {
  fillClassName: string;
};

export const Error = ({ fillClassName }: IconPropType) => {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fillClassName}
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
    </svg>
  );
};
