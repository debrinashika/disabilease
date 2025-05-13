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
    title: "Persiapan Belajar",
    description: "Melatih koordinasi motorik halus, fokus, dan kesiapan tubuh sebelum belajar.",
    video: "https://www.youtube.com/embed/i633CCR3bYU?si=PWSg4E2RZtLmp_to",
    content: `
Aktivitas "Bermain Magic Bubble sambil Duduk" adalah latihan awal untuk meningkatkan kesiapan belajar anak, khususnya dalam hal fokus, kontrol motorik, dan kesadaran ruang tubuh.

📘 Manfaat:
- Mengembangkan koordinasi tangan-mata.
- Melatih atensi visual dan fokus.
- Memberikan stimulasi sensorik ringan yang menenangkan.

👩‍🏫 Panduan untuk Caregiver:
1. Persiapan:
   - Siapkan alat pembuat gelembung (manual atau mesin).
   - Pilih ruangan yang tenang, pastikan anak duduk nyaman.
2. Langkah-langkah:
   - Tiuplah gelembung secara perlahan, arahkan agar anak dapat melihat dan mengejarnya.
   - Ajak anak menangkap gelembung menggunakan kedua tangan secara perlahan.
   - Latihan lanjut: minta anak meniup gelembung sendiri untuk melatih kontrol napas.

💡 Tips Tambahan:
- Gunakan musik lembut untuk menambah kenyamanan.
- Ulangi latihan 5–10 menit untuk membentuk rutinitas.
    `
  },
  "2": {
    title: "Stimulasi Sensorik dan Motorik",
    description: "Latihan membaca bersama dan mengenal huruf sebagai stimulasi bahasa dan motorik halus.",
    video: "https://www.youtube.com/embed/i633CCR3bYU?si=PWSg4E2RZtLmp_to",
    content: `
Latihan membaca bersama adalah cara yang efektif untuk menstimulasi bahasa, meningkatkan perhatian bersama (joint attention), dan mengasah motorik halus melalui interaksi dengan buku.

📘 Manfaat:
- Mengembangkan kosa kata dan pemahaman bahasa.
- Melatih kemampuan mendengarkan dan konsentrasi.
- Motorik halus melalui membalik halaman, menunjuk gambar, dan menulis huruf.

👩‍🏫 Panduan untuk Caregiver:
1. Pilih Buku:
   - Gunakan buku bergambar besar dan warna cerah.
   - Cari cerita dengan kalimat pendek dan tema keseharian anak.

2. Saat Membaca:
   - Bacakan dengan intonasi jelas dan perlahan.
   - Tunjukkan kata dan gambar sambil menyebutkannya.
   - Ajak anak menunjuk, menirukan kata, atau menjawab pertanyaan sederhana.

3. Latihan Tambaha:
   - Minta anak menyebutkan huruf pada halaman.
   - Dorong anak untuk menggambar atau menulis huruf-huruf yang dikenalnya.

🧠 Catatan:
Lakukan secara rutin 10–15 menit per hari untuk memperkuat asosiasi antara gambar, kata, dan suara.
    `
  },
  "3": {
    title: "Jenis dan Karakteristik Autisme",
    description: "Mengenali spektrum autisme dan perbedaan karakteristik perkembangan pada anak.",
    video: "https://www.youtube.com/embed/i633CCR3bYU?si=PWSg4E2RZtLmp_to",
    content: `
Pemahaman tentang jenis dan karakteristik autisme sangat penting bagi orang tua atau caregiver dalam mendukung perkembangan anak secara tepat dan penuh empati.

📘 Apa itu Autisme?
Autisme atau Autism Spectrum Disorder (ASD) adalah kondisi perkembangan neurologis yang memengaruhi interaksi sosial, komunikasi, minat, dan perilaku.

👶 Jenis Utama:
- Level 1 (butuh sedikit dukungan): Anak mampu berbicara dan mandiri tetapi mungkin sulit dalam interaksi sosial yang kompleks.
- Level 2 (butuh dukungan sedang): Kemampuan komunikasi terbatas dan membutuhkan bimbingan dalam kegiatan harian.
- Level 3 (butuh dukungan intensif): Keterbatasan signifikan dalam komunikasi dan adaptasi, memerlukan intervensi terus-menerus.

🔍 Karakteristik Umum:
- Sulit melakukan kontak mata atau menunjukkan ekspresi sosial.
- Minat sempit atau perilaku berulang (misalnya melambaikan tangan terus-menerus).
- Respons sensorik yang berbeda (sangat sensitif atau kurang sensitif terhadap suara, cahaya, sentuhan).

👩‍🏫 Peran Caregiver:
- Amati pola perilaku anak secara konsisten.
- Hindari membandingkan perkembangan anak dengan anak lain.
- Lakukan konsultasi dengan psikolog atau terapis jika ada tanda-tanda kekhawatiran.

🎯 Tujuan Modul:
Memberikan pemahaman dasar untuk membangun pendekatan yang tepat dan berempati terhadap anak dalam spektrum autisme.
    `
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
