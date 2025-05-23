import { FC, useState } from "react";
import { SHAPE_TITLE } from "../../constants";
import { useModeStore } from "../../store/theme-mode/store";
import ChevroUpIcon from "../../assets/custom-icons/ChevroUpIcon";
import { Tooltip } from "../Tooltip";

const Shape: FC<{
  newFilteredValue: any;
  setNewFilteredValue: React.Dispatch<React.SetStateAction<any>>;
  item?: any;
}> = ({ newFilteredValue, setNewFilteredValue, item }) => {
  const { isDarkMode } = useModeStore((state) => state);
  const [openShape, setOpenShape] = useState<boolean>(true);

  const handleClickedShape = (value: string) => {
    if (newFilteredValue?.shape?.some((item) => item === value)) {
      setNewFilteredValue((fd) => ({
        ...fd,
        shape: fd?.shape?.filter((item) => item !== value),
      }));
    } else {
      setNewFilteredValue((fd) => ({
        ...fd,
        shape: [...(fd?.shape || []), value],
      }));
    }
  };
  return (
    <div className="bg-[var(--theme-filter-color)] rounded-lg w-full">
      <div className="flex flex-col w-full items-start gap-2 pt-4 pb-1 px-4 relative">
        <div className="inline-flex items-center justify-center gap-2 px-0 py-2  flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
          <span className="flex">{SHAPE_TITLE} {" "}
            {item.tooltip && <Tooltip content={item.tooltip} placement="right">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1.5 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </Tooltip>}
          </span>
            
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="transition-all duration-500 flex flex-wrap items-start justify-center gap-y-4 gap-x-6 pb-10 relative flex-[0_0_auto] "
            style={{
              maxHeight: openShape ? "14rem" : "2000px",
            }}
          >
            {item.options?.map(
              (item: { label: string; value: string; image: string }) => (
                <button
                  key={item?.value}
                  onClick={() => handleClickedShape(item?.value)}
                  className={`relative flex hover:bg-[var(--dark-theme-color)] flex-col justify-center items-center w-[113.6px] h-[75px] rounded-lg overflow-hidden ${
                    newFilteredValue?.shape?.some((shape) => shape === item?.value)
                      ? "bg-[var(--dark-theme-color)]"
                      : "border border-solid border-[var(--filter-border-color)]"
                  }`}
                >
                  <img src={item?.image} alt="shape image" />
                  <div className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {item?.label}
                  </div>
                </button>
              )
            )}
          </div>
          <div
            className={`transition-all duration-800  relative bg-[var(--theme-filter-color)] ${
              openShape
                ? !isDarkMode
                  ? "shadow-[0_0_30px_rgba(0,0,0,0.53)]"
                  : "shadow-[0_0_30px_rgba(255,255,255,0.53)]"
                : ""
            }`}
            style={{
              width: "100%",
              position: "absolute",
              bottom: "0px",
              left: "0",
            }}
          >
            <button
              type="button"
              className="w-full mt-1 rounded hover:bg-gray-300"
              onClick={() => setOpenShape(!openShape)}
            >
              <span
                className={`flex justify-center transform transition-transform ${
                  openShape ? "rotate-180" : "rotate-0"
                } ease-in-out duration-300`}
              >
                <ChevroUpIcon isDarkMode={isDarkMode} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shape;
