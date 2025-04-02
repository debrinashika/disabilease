import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@assets/icons/Caret";

export const Recommendations = () => {
  const navigate = useNavigate();

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
          <h2 className="text-xs font-semibold text-indigo-900">🧠 Spektrum Autism</h2>
          <p className="text-gray-600 mt-2 text-xs">
            Kami mendeteksi beberapa tanda yang mungkin berkaitan dengan spektrum autisme. 
            Tetap tenang ya! 💙 Sebaiknya konsultasikan dengan dokter atau terapis untuk memastikan 
            tumbuh kembang yang optimal.
          </p>

          <div className="mt-4 space-y-3 text-xs">
            <p>✨ <b>Rekomendasi untuk Anda:</b></p>

            <div className="flex items-start gap-2">
              ✅ <p><b>Jadwal Rutin & Visual Schedule 🗓️</b> <br />
              Anak dengan spektrum autisme lebih nyaman dengan rutinitas. Coba buat jadwal harian 
              dengan gambar atau warna untuk membantunya merasa lebih terstruktur.</p>
            </div>

            <div className="flex items-start gap-2">
              🎧 <p><b>Lingkungan Nyaman & Sensorik</b> <br />
              Beberapa anak lebih sensitif terhadap suara, cahaya, atau tekstur. Gunakan noise-canceling 
              headphones 🎧 atau mainan sensorik 🪀 untuk membantu mereka merasa lebih aman.</p>
            </div>

            <div className="flex items-start gap-2">
              🗣️ <p><b>Metode Komunikasi Alternatif</b> <br />
              Jika anak kesulitan berbicara, coba gunakan kartu gambar (PECS), aplikasi komunikasi, 
              atau bahasa isyarat sederhana 🤟 untuk mempermudah interaksi.</p>
            </div>

            <div className="flex items-start gap-2">
              🤝 <p><b>Cari Dukungan & Edukasi</b> <br />
              Bergabunglah dengan komunitas parenting atau caregiver untuk berbagi pengalaman dan 
              mendapatkan dukungan. Ingat, Anda tidak sendiri! 💖💞</p>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-4">
            Ini hanya rekomendasi. Silakan tanyakan ke dokter untuk lebih lanjut. 😊
          </p>

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
