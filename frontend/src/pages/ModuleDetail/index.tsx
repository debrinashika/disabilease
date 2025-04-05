import { useParams } from "react-router-dom";
import { useState } from "react";
import { Back } from "@assets/icons/Back";

const dummyContent: Record<string, {
    title: string;
    description: string;
    video: string;
    content: string;
  }> = {
    "1": {
      title: "Permainan Magic Bubble",
      description: "Latihan koordinasi tangan-mata, fokus, serta kesadaran tubuh.",
      video: "https://www.youtube.com/embed/hgUGe1cf3So?si=ZWPoPmEsMqqtxmH1",
      content: `
        Bermain Magic Bubble Sambil Duduk adalah aktivitas sederhana namun efektif yang dirancang untuk 
        melatih koordinasi tangan-mata, fokus, serta meningkatkan kesadaran tubuh bagi anak berkebutuhan khusus.

        📖 Panduan untuk Caregiver:
        1. Persiapan:  
           - Siapkan bubble wand atau bubble machine.  
           - Pastikan anak duduk dengan nyaman.  

        2. Cara Bermain:  
           - Versi 1: Tiup gelembung, ajak anak menangkapnya.  
           - Versi 2: Minta anak meniup gelembung sendiri.  
      `
    },
    "2": {
      title: "Bahasa & Komunikasi",
      description: "Stimulasi berbicara, membaca buku bersama, dan mengenal huruf.",
      video: "https://www.youtube.com/embed/ND4fd6yScBM",
      content: "Belajar mengenal huruf, membaca cerita bersama, dan berlatih percakapan sederhana."
    }
  };

export const ModulDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"content" | "discussion">("content");

  const data = dummyContent[id ?? ""];

  if (!data) return <p className="p-5">Modul tidak ditemukan.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F4FF]">
      {/* Header */}
      <div className="flex items-center px-5 py-4 bg-purple-01 text-white">
      <button onClick={() => window.history.back()} className="flex items-center gap-16">
          <Back strokeClassName="stroke-white-01 w-6 h-6" />
          <span className="text-lg font-semibold">{data.title}</span>
        </button>
      </div>

      {/* Video */}
      <div className="relative w-full aspect-video bg-gray-300">
        <iframe
          className="absolute w-full h-full"
          src={data.video}
          title={data.title}
          allowFullScreen
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300">
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "content" ? "border-b-2 border-pink-500 text-pink-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("content")}
        >
          Course Content
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "discussion" ? "border-b-2 border-pink-500 text-pink-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("discussion")}
        >
          Discussion
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-2 text-sm text-gray-700">
        {activeTab === "content" ? (
          <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, "<br>") }} />
        ) : (
          <p>💬 Fitur diskusi akan segera hadir!</p>
        )}
      </div>
    </div>
  );
};
