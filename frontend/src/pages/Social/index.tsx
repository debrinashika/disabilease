import { BottomNav } from "@components/shares/BottomNav";
import { SocialCom } from "@components/privates/Social/SocialCom";
import { TopicButtonList } from "@components/privates/Social/TopicList";
import { TopNav } from "@components/shares/TopNav"
import { useAuth } from "@contexts";

export const Social = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen relative items-stretch">
      <TopNav name={user?.username ?? "None"} age="5 Tahun 7 Bulan" avatar="/images/avatar-default.svg" />
      <div className="flex flex-col gap-5 overflow-y-auto overscroll-contain pb-[68px]">
        <div className="flex justify-between px-5 pt-4">
          <SocialCom /> 
        </div>
      </div>
      <BottomNav screen={"social"} />
    </div>
    
  );
};
