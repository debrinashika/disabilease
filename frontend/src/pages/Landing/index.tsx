import { useNavigate } from 'react-router-dom';
import { Logo } from "@assets/icons/Logo";
import { PrimaryButton } from "@components/shares/Buttons";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding'); // Navigasi ke halaman pertama fitur
  };

  return (
    <div className="relative h-screen bg-slate-50 overflow-hidden flex flex-col justify-center items-center">
      {/* Background Layers */}
      <div className="absolute inset-0 bottom-[-100px] left-0 w-full bg-landing-2 bg-cover bg-center scale-125"></div>
      <div className="absolute bottom-[-250px] left-0 w-full h-[75%] bg-landing-1 bg-cover bg-center scale-100"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg px-6 gap-20">
        <Logo />

        <div className="w-full mt-96 flex flex-col gap-2">
          <PrimaryButton
            text="Get Started"
            type="submit"
            className="bg-purple-01 text-neutral-0 py-3 px-8 text-lg font-semibold w-full"
            onClick={handleGetStarted} // Menangani klik Get Started
          />
          <button
            onClick={() => navigate('/login')}
            className="text-purple-01 font-semibold text-lg mt-2"
          >
            Skip Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};
