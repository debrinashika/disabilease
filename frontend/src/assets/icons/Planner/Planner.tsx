type IconPropType = {
  fillClassName: string
  strokeClassName: string
  dotClassName: string
};

export const Planner = ({ fillClassName, strokeClassName, dotClassName }: IconPropType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={fillClassName}
    >
      <path
        d="M21 7.64865V5.35135C21 4.60502 20.395 4 19.6486 4H16H8H4.35135C3.60502 4 3 4.60502 3 5.35135V7.64865V9H8H16H21V7.64865Z"
        className={`${strokeClassName} fill-white-01`}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 18.4865V12.5135V9H16H8H3V12.5135V18.4865V20C3 21.1046 3.89543 22 5 22H8H16H19C20.1046 22 21 21.1046 21 20V18.4865Z"
        className={strokeClassName}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V5"
        className={strokeClassName}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        className={strokeClassName}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 13.7002H15.7037"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 16.7002H15.7037"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 13.7002H12.0045"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 16.7002H12.0045"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 13.7002H8.30329"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 16.7002H8.30329"
        className={dotClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
