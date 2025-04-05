import { useNavigate } from "react-router-dom";
import { Back } from "@assets/icons/Back";

const dummySubTopics = [
  {
    id: "1",
    title: "Persiapan Belajar",
    description: "Bekal awal implementasi modul ‘Autisme’ untuk Caregiver",
    points: 25,
    icon: "/images/topic.png"
  },
  {
    id: "2",
    title: "Stimulasi Sensorik dan Motorik",
    description: "Strategi membantu anak autisme mengelola emosi dan perilaku.",
    points: 25,
    icon: "/images/topic.png"
  },
  {
    id: "3",
    title: "Jenis dan Karakteristik Autisme",
    description: "Pelajari berbagai jenis autisme & bagaimana mengenalinya.",
    points: 25,
    icon: "/images/topic.png"
  }
];

export const SubTopikPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4FF]">
      {/* Header */}
      <div className="flex items-center px-5 py-4 bg-purple-01 text-white">
        <button onClick={() => window.history.back()} className="flex items-center gap-4">
          <Back strokeClassName="stroke-white-01 w-6 h-6" />
          <span className="text-lg font-semibold">Autisme</span>
        </button>
      </div>

      {/* Pencarian */}
      <div className="px-5 py-3 text-purple-01 text-sm">
        Hi! Temukan solusi bersama <b>DisaLearn..</b>
      </div>

      {/* Daftar Sub Topik */}
      <div className="px-5 py-2 space-y-4">
        {dummySubTopics.map((topic) => (
          <div
            key={topic.id}
            className="relative flex bg-white p-4 rounded-2xl shadow-md"
          >
            {/* XP Points di kanan atas */}
            <div className="absolute top-3 right-4 text-blue-500 text-sm font-semibold">
              {topic.points} 🔷
            </div>

            {/* Detail */}
            <div className="ml-4 flex-1">
                {/* Icon */}
                <div className="flex-shrink-0 mb-2">
                <img src={topic.icon} alt="Topic Icon" className="w-10 h-10" />
                </div>

                <h3 className="font-semibold text-base text-black">{topic.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{topic.description}</p>

                {/* Button */}
                <button
                    className="mt-3 px-6 py-2 text-sm text-blue-500 border border-blue-500 rounded-3xl"
                    onClick={() => navigate(`/module/${topic.id}`)}
                >
                    Belajar Sekarang
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
