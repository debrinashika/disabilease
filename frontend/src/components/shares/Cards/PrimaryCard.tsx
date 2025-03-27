type PrimaryCardPropType = {
  className?: string
  children: React.ReactNode
};

export const PrimaryCard = ({
  className,
  children
}: PrimaryCardPropType) => {
  return (
    <div className={`p-4 shadow-md ${className}`}>{children}</div>
  );
};