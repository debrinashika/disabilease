import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBase } from "@apis";
import { CaretLeft } from "@assets/icons/Caret";
import toast from "react-hot-toast";
import { IApiBaseError } from "@interfaces/api";

export const Recommendations = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [recommendationText, setRecommendationText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const apiBaseError = apiBase().error<IApiBaseError>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskApi = apiBase().task();
        const categoryRes = await taskApi.getUserCategory();
        const categoryName = categoryRes.data.category_name;
        setCategory(categoryName);

        const recRes = await taskApi.getAIRecommendation();
        setRecommendationText(recRes.data ?? "");
      } catch (err) {
        apiBaseError.set(err);
        toast.error(apiBaseError.getMessage() ?? "Gagal memuat rekomendasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-screen bg-slate-50 overflow-hidden flex flex-col justify-start items-center">
      <div className="absolute inset-0 bottom-[-100px] left-0 w-full bg-landing-2 bg-cover bg-center scale-125"></div>
      <div className="absolute bottom-[-250px] left-0 w-full h-[75%] bg-landing-1 bg-cover bg-center scale-100"></div>

      <div className="w-full max-w-md z-10">
        <div className="w-full bg-purple-01 text-white px-5 py-4 flex items-center rounded-b-2xl shadow-md">
          <button onClick={() => navigate('/result')} className="text-white text-lg">
            <CaretLeft strokeClassName="stroke-white" />
          </button>
          <h1 className="flex-grow text-center text-lg font-semibold">
            Rekomendasi DiSMART
          </h1>
        </div>

        <div className="relative bg-violet-50 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-indigo-200 shadow-lg p-6 mt-16 mx-4">
          {loading ? (
            <p className="text-xs text-gray-500">Memuat rekomendasi...</p>
          ) : (
            <>
              <h2 className="text-xs font-semibold text-indigo-900">🧠 {category}</h2>
              <p className="text-gray-600 mt-2 text-xs whitespace-pre-line">
                {recommendationText}
              </p>

              <p className="text-gray-500 text-xs mt-4">
                Ini hanya rekomendasi. Silakan konsultasikan dengan dokter untuk lebih lanjut. 😊
              </p>
            </>
          )}

          <img 
            src="/images/recom.svg" 
            alt="recommendation illustration" 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-130px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
