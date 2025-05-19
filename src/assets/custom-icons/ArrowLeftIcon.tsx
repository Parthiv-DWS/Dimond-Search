import { FC } from "react";

const ArrowLeftIcon: FC<{ isDisabled: boolean; isDarkMode: boolean }> = ({
  isDisabled,
  isDarkMode,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M15 19.0884L8 12.0884L15 5.08838"
        stroke={isDisabled ? "gray" : isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
