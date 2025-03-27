import { Home } from "@assets/icons/Home";
import { Planner } from "@assets/icons/Planner";
import { Profile } from "@assets/icons/Profile";

import { Link } from "react-router-dom";

type BottomNavPropType = {
  screen: "home" | "planner"| "profile";
};

export const BottomNav = ({ screen }: BottomNavPropType) => {
  return (
    <div className="w-full absolute bottom-6 flex justify-center z-40">
      <div className="bg-purple-01 flex gap-6 px-6 py-3 rounded-full shadow-md items-center">
        <Link to={"/"} className="flex justify-center items-center">
          <Home
            fillClassName={screen === "home" ? "fill-purple-01" : "fill-white-01"}
            strokeClassName={screen === "home" ? "stroke-white-01" : "stroke-purple-02"}
          />
        </Link>
        <Link to={"/planner"} className="flex justify-center items-center">
          <Planner
            fillClassName={screen === "planner" ? "fill-purple-01" : "fill-white-01"}
            strokeClassName={screen === "planner" ? "stroke-white-01" : "stroke-purple-02"}
            dotClassName={screen === "planner" ? "stroke-white-01" : "stroke-purple-02"}
          />
        </Link>
        <Link to={"/profile"} className="flex justify-center items-center">
          <Profile
            fillClassName={screen === "profile" ? "fill-purple-01" : "fill-white-01"}
            strokeClassName={screen === "profile" ? "stroke-white-01" : "stroke-purple-02"}
          />
        </Link>
      </div>
    </div>
  );
};
