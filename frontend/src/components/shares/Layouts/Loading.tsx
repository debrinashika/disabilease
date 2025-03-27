import { Logo } from "@assets/icons/Logo";

type LoadingPropType = {
  isLoading: boolean
};

export const Loading = ({
  isLoading
}: LoadingPropType) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full h-full bg-white z-50 rounded-b-2xl flex items-center justify-center transition-all ease-in-out duration-500 ${
        isLoading ? "top-0" : "-top-full"
      }`}
    >
      <div className="w-fit animate-popUp">
        <Logo />
      </div>
    </div>
  );
};
