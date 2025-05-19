import { FC } from "react";

const GridIcon: FC<{ fill: string }> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
    >
      <path
        d="M34 33.755L16 33.755L16 27.0884L34 27.0884L34 33.755ZM12.6667 33.755L6 33.755L6 27.0884L12.6667 27.0884L12.6667 33.755ZM34 23.755L16 23.755L16 17.0884L34 17.0884L34 23.755ZM12.6667 23.755L6 23.755L6 17.0884L12.6667 17.0884L12.6667 23.755ZM34 13.755L16 13.755L16 7.08838L34 7.08838L34 13.755ZM12.6667 13.755L6 13.755L6 7.08838L12.6667 7.08838L12.6667 13.755Z"
        fill={fill}
      />
    </svg>
  );
};

export default GridIcon;
