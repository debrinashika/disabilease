type DateCardPropType = {
  date: Date;
  selectedDate: Date;
};

export const DateCard = ({ date, selectedDate }: DateCardPropType) => {
  return (
    <div
      className={`flex flex-col justify-center items-center rounded-md py-2
        ${
          selectedDate.getDate() == date.getDate()
            ? "bg-white-01"
            : "bg-brown-04"
        }`}
    >
      <p
        className={`font-semibold text-base ${
          selectedDate.getDate() == date.getDate()
            ? "text-orange-01"
            : "text-white-01"
        }`}
      >
        {date.getDate()}
      </p>
      <p className="text-xs text-brown-01">
        {date.toLocaleString("en-US", { weekday: "short" })}
      </p>
    </div>
  );
};
