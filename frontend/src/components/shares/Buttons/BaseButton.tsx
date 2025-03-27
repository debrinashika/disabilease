type BaseButtonPropType = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const BaseButton = ({
  className,
  onClick,
  children
}: BaseButtonPropType) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
