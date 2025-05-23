import { FC } from "react";

const ShoppingCartIcon: FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20Z"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20Z"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3H3.76772C4.24998 3 4.66354 3.3442 4.7511 3.81845L7 16"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 6H19.7429C20.386 6 20.8619 6.59824 20.7173 7.22486L18.8712 15.2249C18.7665 15.6786 18.3625 16 17.8968 16H7"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShoppingCartIcon;
