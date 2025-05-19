import { FC, useState } from "react";
import ChevroUpIcon from "../assets/custom-icons/ChevroUpIcon";
import { useModeStore } from "../store/theme-mode/store";
import { Transition } from "@headlessui/react";

const Accordion: FC<{
  label: string;
  controls?: {
    open: boolean;
    setOpen: (value: boolean) => void;
    disableAnimation?: boolean;
  };
  children: any;
}> = ({ label, controls, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode } = useModeStore((state) => state);

  return (
    <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
          onClick={() => {
            if (!controls?.disableAnimation) {
              setIsOpen(!isOpen);
              if (!controls?.open) {
                controls?.setOpen(!isOpen);
              }
            }
          }}
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
            {label}
          </span>
          {!controls?.disableAnimation && (
            <span
              className={`!relative !w-[24px] !h-[24px] transform transition-transform ${
                isOpen ? "rotate-0" : "rotate-180"
              } ease-in-out duration-300`}
            >
              <ChevroUpIcon isDarkMode={isDarkMode} />
            </span>
          )}
        </button>
      </h2>
      <Transition
        show={controls?.disableAnimation || isOpen}
        // className="transition-all duration-500 ease-in-out overflow-hidden"
        enterFrom="transform max-h-0"
        enterTo="transform max-h-[9999px]"
        leaveFrom="transform max-h-[9999px]"
        leaveTo="transform max-h-0"
      >
        {children}
      </Transition>
    </div>
  );
};

export default Accordion;
