import { TopNav } from "@components/shares/TopNav";
import { BottomNav } from "@components/shares/BottomNav";
import { useAuth } from "@contexts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const data = [
  { name: 'Sen', normal: 50, current: 30 },
  { name: 'Sel', normal: 52, current: 50 },
  { name: 'Rab', normal: 54, current: 40 },
  { name: 'Kam', normal: 55, current: 70 },
  { name: 'Jum', normal: 53, current: 60 },
  { name: 'Sab', normal: 56, current: 80 },
  { name: 'Min', normal: 65, current: 65 },
];


export const Home = () => {
  const { user } = useAuth();
  const router = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'progress' | 'chart'>('progress');

  return (
    <div className="flex flex-col h-screen relative items-stretch bg-[#F8F4FF]">
      {/* Top Navigation */}
      <TopNav name={user?.username ?? "None"} age="5 Tahun 7 Bulan" avatar="/images/avatar-default.svg" />

      <div className="flex flex-col gap-5 overflow-y-auto px-5 pt-4 pb-[80px] h-[calc(100vh)]">

        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedTab === 'progress' ? 'bg-purple-01 text-white' : 'bg-white text-purple-01 border border-purple-01'}`}
            onClick={() => setSelectedTab('progress')}
          >
            Progress
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedTab === 'chart' ? 'bg-purple-01 text-white' : 'bg-white text-purple-01 border border-purple-01'}`}
            onClick={() => setSelectedTab('chart')}
          >
            Grafik
          </button>
        </div>

        {selectedTab === 'progress' && (
          <>
           {/* Progress Section */}
            <div className="flex flex-col items-center text-center mt-[-20px] relative">
              <div className="relative w-80 z-0">
                <img src="/images/star-progress.png" alt="Progress" className="w-full h-full object-contain scale-110" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    className="text-gray-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="35"
                    cx="45"
                    cy="55"
                  />
                  {/* Progress circle */}
                  <circle
                    className="text-purple-01"
                    strokeWidth="5"
                    strokeDasharray="219.91"
                    strokeDashoffset={219.91 - (219.91 * 75) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="35"
                    cx="45"
                    cy="45"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              {/* Persentase pindah ke bawah */}
              <p className="text-lg font-semibold mt-1">Progress Anda 75%</p>
            </div>

            {/* AI Detection Card */}
            <div className="bg-[#FFEFE1] p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm">Deteksi dini disabilitas mental anak dengan AI</p>
                <h2 className="text-lg font-semibold">DiSMART</h2>
              </div>
              <button onClick={() => router("/assessment")} className="bg-orange-400 text-white px-4 py-2 rounded-3xl">Deteksi</button>
            </div>

            {/* Daily Inputs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-purple-01">Daily Inputs</h3>
                <a href="#" className="text-sm text-blue-500">View All</a>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                <div className="min-w-[5rem] h-20 bg-purple-500 rounded-lg flex items-center justify-center p-4">
                  <span className="text-white text-xl">+</span>
                </div>
                <div className="min-w-[5rem] h-20 bg-orange-200 rounded-lg flex items-center justify-center text-xs p-4 text-center">
                  <span className="leading-tight">Pemantauan Perilaku</span>
                </div>
                <div className="min-w-[5rem] h-20 bg-pink-200 rounded-lg flex items-center justify-center text-xs p-4 text-center">
                  <span className="leading-tight">Sosial & Interaksi</span>
                </div>
                <div className="min-w-[5rem] h-20 bg-green-200 rounded-lg flex items-center justify-center text-xs p-4 text-center">
                  <span className="leading-tight">Kualitas Tidur</span>
                </div>
              </div>
            </div>

            {/* Modul */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-purple-01">Modul Pembelajaran</h3>
                <button
                  onClick={() => router("/module")}
                  className="text-sm text-blue-500"
                >
                  View All
                </button>
               </div>
              <div className="mb-4">
              <div className="flex gap-4 overflow-x-auto">
                {["Tumbuh Kembang", "Tanya Dokter", "Produk Rekomendasi"].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center min-w-[130px] h-32 cursor-pointer"
                    onClick={() => router(`/topic/${index}`)} 
                  >
                    <div className="w-full flex items-center justify-center h-full">
                      <img
                        src={`/icons/${item.toLowerCase().replace(/ /g, "_")}.png`}
                        alt={item}
                        className="w-80 object-contain"
                      />
                    </div>
                    <span className="text-xs text-gray-800 mt-2 text-center whitespace-nowrap">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </>
        )}

        {selectedTab === 'chart' && (
          <div>
            <h3 className="text-lg font-semibold text-black-01 mb-2 mt-5">Grafik Indeks Massa Tubuh</h3>
            <div className="rounded-lg shadow-sm w-full h-44 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="normal" stroke="#4CAF50" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="current" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
        
            <h3 className="text-lg font-semibold text-black-01 mb-2 mt-10">Grafik Tumbuh Kembang</h3>
            <div className="rounded-lg shadow-sm w-full h-44 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="normal" stroke="#4CAF50" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="current" stroke="#ED6E74" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav screen={"home"} />
    </div>
  );
};
