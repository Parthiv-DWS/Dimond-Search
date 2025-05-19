import { FC } from "react";

const HeartIcon: FC<{ isDarkMode: boolean; isLiked: boolean }> = ({
  isDarkMode,
  isLiked,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill={isLiked ? "black" : "white"}
    >
      <path
        d="M12 20.0884C12 20.0884 3 15.0758 3 9.06072C3 3.0456 10 2.54435 12 7.25059C14 2.54435 21 3.0456 21 9.06072C21 15.0758 12 20.0884 12 20.0884Z"
        stroke={!isDarkMode ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon;
