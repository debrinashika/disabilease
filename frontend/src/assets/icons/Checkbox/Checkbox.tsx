type IconPropType = {
  active: boolean
};

export const Checkbox = ({
  active
}: IconPropType) => {
  return (
    <>
      {active && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="17"
            height="17"
            rx="8.5"
            fill="#F6E6B6"
          />
          <rect
            x="0.5"
            y="0.5"
            width="17"
            height="17"
            rx="8.5"
            stroke="#F3DC98"
          />
          <path
            d="M12.75 6.1875L7.59375 11.3438L5.25 9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {!active && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="17"
            height="17"
            rx="8.5"
            stroke="#CDCFD0"
          />
        </svg>
      )}
    </>
  );
}
