import { Link } from "react-router-dom";
import { Notification } from "@assets/icons/Notification";

type TopNavProps = {
  name: string;
  age: string;
  avatar: string;
};

export const TopNav = ({ name, age, avatar }: TopNavProps) => {
  return (
    <div className="w-full bg-purple-01 text-white px-5 py-5 flex items-center justify-between rounded-b-2xl shadow-md">
      <div className="flex items-center gap-3">
        <Link to="/profile" className="flex items-center gap-3">
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs">{age}</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
      <Notification strokeClassName="stroke-white-01" />
      </div>
    </div>
  );
};
