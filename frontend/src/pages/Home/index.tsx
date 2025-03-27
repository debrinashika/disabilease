import { Notification } from "@assets/icons/Notification";
import { Module } from "@components/privates/Home/Module"
import { BottomNav } from "@components/shares/BottomNav"
import { useAuth } from "@contexts";
import { TopNav } from "@components/shares/TopNav"

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen relative items-stretch">
      <TopNav name={user?.username ?? "None"} age="5 Tahun 7 Bulan" avatar="/images/avatar-default.svg" />
      <div className="flex flex-col gap-5 overflow-y-auto overscroll-contain pb-[68px]">
        <div className="flex justify-between px-5 pt-4">
          <h1 className="text-[26px]">
            Good Morning, <span className="block font-semibold">{user?.username}</span>
          </h1>
        
        </div>

      </div>
      <BottomNav screen={"home"} />
    </div>
  );
}