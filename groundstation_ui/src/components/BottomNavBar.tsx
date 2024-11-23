import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRocket, FaCog } from "react-icons/fa";

const BottomNavbar: React.FC = () => {
  const location = useLocation(); // Get current path
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setActivePath(path);
  };

  return (
    <div
      className="z-30 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-primaryPurple bg-gradient-to-t from-darkGradientEnd to-darkGradientStart shadow-lg"
      style={{
        clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex justify-around items-center py-4">
        <Link
          to="/overview"
          onClick={() => handleNavigation("/overview")}
          className="flex flex-col items-center text-white"
        >
          <FaRocket
            className={`text-2xl ${
              activePath === "/overview" ? "text-red-500" : "text-white"
            }`}
          />
          <p
            className={`text-sm mt-1 ${
              activePath === "/overview"
                ? "text-red-500"
                : "text-secondaryPurple"
            }`}
          >
            Overview
          </p>
        </Link>

        <Link
          to="/settings"
          onClick={() => handleNavigation("/settings")}
          className="flex flex-col items-center text-white"
        >
          <FaCog
            className={`text-2xl ${
              activePath === "/settings" ? "text-red-500" : "text-white"
            }`}
          />
          <p
            className={`text-sm mt-1 ${
              activePath === "/settings"
                ? "text-red-500"
                : "text-secondaryPurple"
            }`}
          >
            Settings
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
