import { FC } from "react";

const ArrowDownUp: FC<{ isUp: boolean; isDarkMode: boolean }> = ({
  isUp,
  isDarkMode,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11 16L8 19L5 16"
        stroke={isUp ? "#828387" : !isDarkMode ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8L16 5L19 8"
        stroke={!isUp ? "#828387" : !isDarkMode ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19L16 5"
        stroke={!isUp ? "#828387" : !isDarkMode ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5V19"
        stroke={isUp ? "#828387" : !isDarkMode ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownUp;
