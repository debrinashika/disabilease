type IconPropType = {
  fillClassName: string;
  strokeClassName: string;
};

export const History = ({ fillClassName, strokeClassName }: IconPropType) => {
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
        d="M1.29289 10.2929C1.68342 9.90237 2.31658 9.90237 2.70711 10.2929L4.00896 11.5947C4.22089 6.81226 8.16524 3 13 3C17.9706 3 22 7.02944 22 12C22 16.9706 17.9706 21 13 21C12.4477 21 12 20.5523 12 20C12 19.4477 12.4477 19 13 19C16.866 19 20 15.866 20 12C20 8.13401 16.866 5 13 5C9.2774 5 6.23349 7.90584 6.01281 11.573L7.29289 10.2929C7.68342 9.90237 8.31658 9.90237 8.70711 10.2929C9.09763 10.6834 9.09763 11.3166 8.70711 11.7071L5.70711 14.7071C5.51957 14.8946 5.26522 15 5 15C4.73478 15 4.48043 14.8946 4.29289 14.7071L1.29289 11.7071C0.902369 11.3166 0.902369 10.6834 1.29289 10.2929Z"
        className={fillClassName}
      />
      <line
        x1="18"
        y1="12.75"
        x2="12"
        y2="12.75"
        className={strokeClassName}
        strokeWidth="1.5"
      />
      <line
        x1="12.75"
        y1="7"
        x2="12.75"
        y2="13"
        className={strokeClassName}
        strokeWidth="1.5"
      />
    </svg>
  );
}
