import { FC } from "react";

const EditUndoIcon: FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 8H5V3"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.29053 16.3571C6.22236 17.792 7.58966 18.8904 9.19169 19.4909C10.7937 20.0915 12.5461 20.1627 14.1916 19.6939C15.837 19.2252 17.2889 18.2413 18.3339 16.8867C19.379 15.5321 19.9623 13.8781 19.9981 12.1675C20.034 10.457 19.5205 8.78004 18.533 7.38284C17.5456 5.98564 16.1362 4.94181 14.5118 4.4046C12.8874 3.86738 11.1336 3.86509 9.50784 4.39805C7.88206 4.93101 6.46997 5.97114 5.47887 7.36575"
        stroke={isDarkMode ? "white" : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditUndoIcon;
