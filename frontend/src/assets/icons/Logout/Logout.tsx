type IconPropType = {
  strokeClassName: string
};

export const Logout = ({
  strokeClassName,
}: IconPropType) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4999 10.501H9.18738M15.7499 13.126L18.3749 10.501L15.7499 7.87598M11.3749 6.12598V5.25098C11.3749 4.78685 11.1905 4.34173 10.8623 4.01354C10.5341 3.68535 10.089 3.50098 9.62488 3.50098H5.24988C4.78575 3.50098 4.34063 3.68535 4.01244 4.01354C3.68425 4.34173 3.49988 4.78685 3.49988 5.25098V15.751C3.49988 16.2151 3.68425 16.6602 4.01244 16.9884C4.34063 17.3166 4.78575 17.501 5.24988 17.501H9.62488C10.089 17.501 10.5341 17.3166 10.8623 16.9884C11.1905 16.6602 11.3749 16.2151 11.3749 15.751V14.876"
        className={strokeClassName}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
