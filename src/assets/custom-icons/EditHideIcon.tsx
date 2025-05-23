import { FC } from "react";

const EditHideIcon: FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 4L20 20"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 16.756C15.1474 17.4846 13.6186 18 12 18C6.47715 18 2 12 2 12C2 12 4.08842 9.20123 7.17205 7.4267M19.5 14.6337C21.0559 13.2652 22 12 22 12C22 12 17.5228 6 12 6C11.6625 6 11.3289 6.02241 11 6.06448"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3229 13.4999C12.9703 13.8111 12.5072 13.9999 12 13.9999C10.8954 13.9999 10 13.1045 10 11.9999C10 11.4604 10.2136 10.9708 10.5609 10.6111"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditHideIcon;
