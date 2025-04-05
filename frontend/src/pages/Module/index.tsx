import { TopNav } from "@components/shares/TopNav";
import { BottomNav } from "@components/shares/BottomNav";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";

const moduleList = [
  { id: 1, title: "Motorik Kasar", image: "/images/tumbuh_kembang.png" },
  { id: 2, title: "Bahasa & Komunikasi", image: "/images/tanya_dokter.png" },
  { id: 3, title: "Kemandirian", image: "/images/tanya_dokter.png" },
  { id: 4, title: "Sosial Emosional", image: "/images/tumbuh_kembang.png" },
  { id: 5, title: "Kemandirian", image: "/images/tumbuh_kembang.png" },
  { id: 6, title: "Sosial Emosional", image: "/images/tumbuh_kembang.png" },
];

export const Module = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#F8F4FF]">
      <TopNav
        name={user?.username ?? "None"}
        age="5 Tahun 7 Bulan"
        avatar="/images/avatar-default.svg"
      />

      <div className="flex justify-between items-center px-5 mt-4 mb-2">
        <h3 className="text-lg font-semibold text-purple-01">Modul Pembelajaran</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 overflow-y-auto pb-24">
        {moduleList.map((modul) => (
          <div
            key={modul.id}
            className="my-2 flex flex-col items-center hover:scale-[1.02] transition cursor-pointer"
            onClick={() => navigate(`/topic/${modul.id}`)}
          >
            <img
              src={modul.image}
              alt={modul.title}
              className="w-full  object-cover rounded-xl mb-2"
            />
            <h4 className="text-sm font-semibold text-center text-purple-01">
              {modul.title}
            </h4>
          </div>
        ))}
      </div>

      <BottomNav screen="home" />
    </div>
  );
};
