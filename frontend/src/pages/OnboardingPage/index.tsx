import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingData } from "../../assets/data/onboardingData";

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white relative px-6">

      <button onClick={handleSkip} className="absolute top-6 right-6 text-violet-900 font-semibold">
        Skip
      </button>

      <div className="flex flex-col items-center text-center max-w-xs">
        <img src={onboardingData[currentStep].image} alt="Onboarding" className="w-64 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800">{onboardingData[currentStep].title}</h2>
        <p className="text-gray-400 mt-3">{onboardingData[currentStep].description}</p>
      </div>

      <div className="flex space-x-2 mt-6">
        {onboardingData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-4 rounded-full ${index === currentStep ? "bg-purple-01 w-6" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>

      <div className="mt-6 flex space-x-4">
        {currentStep === onboardingData.length - 1 ? (
          <>
            <button onClick={() => navigate("/register")} className="bg-purple-01 text-white py-2 px-8 rounded-lg">
              Sign up
            </button>
            <button onClick={() => navigate("/login")} className="border border-violet-900 text-violet-900 py-2 px-8 rounded-lg">
              Log in
            </button>
          </>
        ) : (
          <button onClick={handleNext} className="bg-purple-01 text-white py-2 px-6 rounded-lg">
            Next
          </button>
        )}
      </div>
    </div>
  );
};
