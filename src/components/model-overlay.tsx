import { FC, useEffect, useRef } from "react";
import { FilterGlobalType } from "../types";

interface ModalOverlayProps {
  children: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  setSelectedDiamond?: React.Dispatch<React.SetStateAction<any>>;
  maxWidth?: string;
}

const ModalOverlay: FC<ModalOverlayProps> = ({
  children,
  open,
  setOpen,
  setSelectedDiamond,
  maxWidth,
}) => {
  const ref = useRef<any>(null);
  const handleClickOutside = (event: any): void => {
    if (ref.current && !ref.current.contains(event.srcElement as Node)) {
      setOpen(false);
      document.body.style.overflowY = "";
      if (setSelectedDiamond) {
      setSelectedDiamond({});
    }}
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
  }, [open]);

  return (
    <div className="fixed w-full h-screen top-0 right-0 left-0 bottom-0 z-[998] cursor-pointer bg-opacity-15 bg-model-overlay-color shadow-md">
      <div
        className={`h-screen float-right bg-white relative shadow-custom ${
          maxWidth ? `${maxWidth}` : "w-[90%] sm:w-3/4 md:w-1/2 lg:w-[768px]"
        }`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
