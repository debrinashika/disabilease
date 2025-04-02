import { useNavigate } from "react-router-dom";

export const AssessmentResult = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-slate-50 overflow-hidden flex flex-col justify-center items-center">
   
    <div className="absolute inset-0 bottom-[-100px] left-0 w-full bg-landing-2 bg-cover bg-center scale-125"></div>
    <div className="absolute bottom-[-250px] left-0 w-full h-[75%] bg-landing-1 bg-cover bg-center scale-100"></div>
      <div className="p-6 w-full max-w-md text-center z-10">
        <h1 className="font-bold text-purple-01 text-5xl">Result!!</h1>
        <img src="/images/result.svg" alt="Star Character" className="mx-auto mt-[-50px]" />
      <div className="relative bg-white p-8 mx-8 rounded-md shadow-[2.94px_2.94px_7.35px_0px_rgba(56,64,83,0.50)] text-left mt-[-20px]">
        <h2 className="text-lg font-semibold text-indigo-900">Spektrum Autism</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Kami melihat beberapa tanda perkembangan yang mungkin berkaitan dengan spektrum autisme. Sebaiknya konsultasikan dengan dokter untuk memastikan tumbuh kembang yang optimal.
        </p>
        <img 
          src="/images/kerang.svg" 
          alt="shell" 
          className="absolute right-[-25px]" 
        />
      </div>

        <button
          onClick={() => navigate("/recommendations")}
          className="mt-28 bg-purple-01 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full"
        >
          Lihat Rekomendasi DiSMART
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-2 border border-purple-01 text-purple-01 font-semibold py-2 px-4 rounded-lg shadow-md w-full"
        >
          Back To Homepage
        </button>
      </div>
    </div>
  );
};

export default AssessmentResult;