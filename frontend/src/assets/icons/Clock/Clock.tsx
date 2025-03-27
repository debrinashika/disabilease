type IconPropType = {
  strokeClassName: string
};

export const Clock = ({
  strokeClassName,
}: IconPropType) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-[1px]"
    >
      <path
        d="M5.5 3.5V5.5L7 7M10 5.5C10 6.09095 9.8836 6.67611 9.65746 7.22208C9.43131 7.76804 9.09984 8.26412 8.68198 8.68198C8.26412 9.09984 7.76804 9.43131 7.22208 9.65746C6.67611 9.8836 6.09095 10 5.5 10C4.90905 10 4.32389 9.8836 3.77792 9.65746C3.23196 9.43131 2.73588 9.09984 2.31802 8.68198C1.90016 8.26412 1.56869 7.76804 1.34254 7.22208C1.1164 6.67611 1 6.09095 1 5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1C6.69347 1 7.83807 1.47411 8.68198 2.31802C9.52589 3.16193 10 4.30653 10 5.5Z"
        className={strokeClassName}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
