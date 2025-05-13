import { TopNav } from "@components/shares/TopNav";
import { BottomNav } from "@components/shares/BottomNav";
import { useAuth } from "@contexts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Enhanced developmental milestones data
const developmentData = [
  { 
    age: '0-6m', 
    motor: 18, 
    language: 12, 
    cognitive: 15, 
    social: 10, 
    emotional: 8,
    adaptive: 9,
    sensory: 7
  },
  { 
    age: '6-12m', 
    motor: 35, 
    language: 28, 
    cognitive: 32, 
    social: 25, 
    emotional: 20,
    adaptive: 22,
    sensory: 18
  },
  { 
    age: '1-1.5y', 
    motor: 45, 
    language: 38, 
    cognitive: 42, 
    social: 35, 
    emotional: 30,
    adaptive: 32,
    sensory: 28
  },
  { 
    age: '1.5-2y', 
    motor: 55, 
    language: 48, 
    cognitive: 52, 
    social: 45, 
    emotional: 40,
    adaptive: 42,
    sensory: 38
  },
  { 
    age: '2-2.5y', 
    motor: 65, 
    language: 58, 
    cognitive: 62, 
    social: 55, 
    emotional: 50,
    adaptive: 52,
    sensory: 48
  },
  { 
    age: '2.5-3y', 
    motor: 75, 
    language: 68, 
    cognitive: 72, 
    social: 65, 
    emotional: 60,
    adaptive: 62,
    sensory: 58
  },
  { 
    age: '3-4y', 
    motor: 82, 
    language: 75, 
    cognitive: 78, 
    social: 72, 
    emotional: 68,
    adaptive: 70,
    sensory: 65
  },
  { 
    age: '4-5y', 
    motor: 90, 
    language: 83, 
    cognitive: 87, 
    social: 80, 
    emotional: 75,
    adaptive: 78,
    sensory: 72
  },
  { 
    age: '5-6y', 
    motor: 96, 
    language: 90, 
    cognitive: 93, 
    social: 88, 
    emotional: 82,
    adaptive: 85,
    sensory: 80
  }
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-bold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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
            Grafik Perkembangan
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
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Perkembangan Anak</h3>
            
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={developmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="age" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}  // Adjust font size here
                    label={{ 
                      value: 'Usia Anak', 
                      position: 'bottom', 
                      offset: 30,
                      fill: '#6b7280',
                      fontSize: 12  // Adjust font size here
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 12 }}  // Adjust font size here
                    label={{ 
                      value: 'Persentase Pencapaian', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: '#6b7280',
                      fontSize: 12,  
                      dy:50
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="top" 
                    align="center"
                    wrapperStyle={{ paddingLeft: 0, paddingBottom: 20 }}
                    iconSize={10}
                    formatter={(value) => (
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>
                        {value}
                      </span>
                    )}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="motor" 
                    name="Motorik Kasar & Halus" 
                    stroke="#4CAF50" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="language" 
                    name="Bahasa & Komunikasi" 
                    stroke="#2196F3" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cognitive" 
                    name="Kognitif" 
                    stroke="#9C27B0" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="social" 
                    name="Sosial" 
                    stroke="#FF9800" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emotional" 
                    name="Emosional" 
                    stroke="#F44336" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adaptive" 
                    name="Adaptif" 
                    stroke="#607D8B" 
                    strokeWidth={3} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-sm text-gray-600">
              <p className="font-medium">Keterangan:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Grafik menunjukkan pencapaian milestone perkembangan anak berdasarkan usia</li>
                <li>Setiap garis mewakili aspek perkembangan yang berbeda</li>
                <li>Nilai 100% menunjukkan pencapaian maksimal untuk kelompok usia tersebut</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav screen={"home"} />
    </div>
  );
};