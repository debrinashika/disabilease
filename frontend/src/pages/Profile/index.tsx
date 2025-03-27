import { Bio } from "@components/privates/Profile/Bio";

export const Profile = () => {
  return (
    <div className="flex flex-col h-screen relative items-stretch">
      <div className="relative h-screen overflow-y-auto overscroll-contain items-stretch bg-purple-01 ">
        <Bio />
      </div>
     
    </div>
  );
};
