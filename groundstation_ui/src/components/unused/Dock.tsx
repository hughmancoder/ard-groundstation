import React from "react";
import overview from "../icons/overview.svg";
import life from "../icons/life.svg";
import comms from "../icons/comms.svg";
import prop from "../icons/prop.svg";
import mech from "../icons/mech.svg";
import power from "../icons/power.svg";
import avionics from "../icons/avionics.svg";

const bars = [
  { title: "Overview", icon: overview },
  { title: "Life", icon: life },
  { title: "Comms", icon: comms },
  { title: "Prop", icon: prop },
  { title: "Mech", icon: mech },
  { title: "Power", icon: power },
  { title: "Avionics", icon: avionics },
];

const Dock: React.FC = () => {
  return (
    <div className="flex items-center justify-center pt-10 space-x-8">
      <div className="relative flex px-2 pt-5 pb-4 bg-blue-900 rounded-t-3xl">
        {/* Left Decorative SVG */}
        <svg
          className="fill-current text-blue-900 absolute top-0 bottom-0 left-0 -translate-x-3/4"
          width="83"
          height="86"
          viewBox="0 0 83 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M64.3029 8.65669C68.8626 3.17225 75.6254 0 82.7578 0H83V86H0L64.3029 8.65669Z" />
        </svg>

        {/* Navigation Items */}
        {bars.map((bar, index) => (
          <a
            href="#"
            key={index}
            className="flex flex-col items-center px-4 group"
          >
            <img
              src={bar.icon}
              alt={`${bar.title} Icon`}
              className="h-7 w-7 text-white fill-current group-hover:text-red"
            />
            <span className="text-gray-600 text-xxxs mt-1.5 group-hover:text-red">
              {bar.title}
            </span>
          </a>
        ))}

        {/* Right Decorative SVG */}
        <svg
          className="fill-current text-blue-900 absolute top-0 bottom-0 right-0 translate-x-3/4"
          width="83"
          height="86"
          viewBox="0 0 83 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.6971 8.65669C14.1374 3.17225 7.37457 0 0.242245 0H0V86H83L18.6971 8.65669Z" />
        </svg>
      </div>
    </div>
  );
};

export default Dock;
