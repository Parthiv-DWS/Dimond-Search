import LogoImage from "../assets/Logo.svg";
import SearchIcon from "../assets/custom-icons/SearchIcon";
import { FC, useEffect, useRef, useState } from "react";
import ShoppingCartIcon from "../assets/custom-icons/ShoppingCartIcon";
import UserIcon from "../assets/custom-icons/UserIcon";
import Hamburger from "../assets/custom-icons/Hamburger";
import { useModeStore } from "../store/theme-mode/store";
import { Transition } from "@headlessui/react";
import CloseIcon from "../assets/custom-icons/CloseIcon";
import { NavbarHeaderList } from "../utility/utils";
import { Link } from "react-router-dom";

const LinkComponenet: FC<{ setOpen: (value: boolean) => void }> = ({
  setOpen,
}) => {
  const navbarHeaderList = NavbarHeaderList();
  return (
    <>
      {navbarHeaderList?.map((item: { [key: string]: string }) => (
        <li key={item?.id} className="text-center">
          <Link
            to={item?.url}
            onClick={() => setOpen(false)}
            className="fixed pb-1 whitespace-nowrap after:absolute after:w-0 after:bottom-0 after:bg-gray-600 after:h-[2px] after:left-1/2 after:transition-all after:duration-200 after:ease-linear"
          >
            <span>{item?.label}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

const Navbar: FC = () => {
  const { isDarkMode } = useModeStore((state) => state);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<any>(null);
  const handleClickOutside = (event: any): void => {
    if (navRef.current && !navRef.current.contains(event.srcElement as Node)) {
      setOpen(false);
      document.body.style.overflowY = "";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 75 && event.ctrlKey) {
        event.preventDefault();
        setIsSearchClicked(true);
      }
      if (event.keyCode === 27) {
        setIsSearchClicked(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header>
        <nav className="w-full z-20 top-0 left-0 dark:border-gray-600 py-4 px-3 [font-family:var(--paregraph-p3-semibold-font-family)] font-[number:var(--paregraph-p3-semibold-font-weight)] text-grayscale-700 text-[length:var(--paregraph-p3-semibold-font-size)] tracking-[var(--paregraph-p3-semibold-letter-spacing)] leading-[var(--paregraph-p3-semibold-line-height)] [font-style:var(--paregraph-p3-semibold-font-style)]">
          <div className="flex flex-wrap justify-between items-center relative">
            <Link className="logo" to="/">
              <img
                src={LogoImage}
                alt="logo"
                width={130}
                height={100}
                rel="preload"
              />
            </Link>
            <ul className="menu hidden w-[60%] xl:pl-44 justify-center gap-x-6 lg:flex [&>li>a]:text-grayscale-700 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:text-lg">
              <LinkComponenet setOpen={setOpen} />
            </ul>
            <div className="flex flex-row gap-x-6 w-1/5 sm:w-[60%] lg:w-[20%]">
              <div className="relative w-full xl:w-full">
                <button
                  onClick={() => setIsSearchClicked(!isSearchClicked)}
                  className="absolute inset-y-0 outline-none right-0 pr-0 sm:pr-1 flex items-center cursor-pointer"
                  aria-label="search button"
                >
                  <SearchIcon isDarkMode={isDarkMode} />
                </button>
                <input
                  type="text"
                  className={`${
                    isSearchClicked ? "visible" : "invisible"
                  } h-full pr-8 border hidden sm:block text-[var(--theme-alter-color)] border-[var(--theme-alter-color)] pl-4 py-[5px] w-full xl:w-full bg-[var(--theme-color)] rounded-lg focus:outline-none font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]`}
                  placeholder="Search Diamonds"
                />
              </div>
              <button
                aria-label="shopping cart button"
                className="sm:block hidden"
              >
                <ShoppingCartIcon isDarkMode={isDarkMode} />
              </button>
              <button aria-label="user button" className="sm:block hidden">
                <UserIcon isDarkMode={isDarkMode} />
              </button>
              <button
                aria-label="hamburger button"
                onClick={() => setOpen(true)}
                className="block lg:hidden"
              >
                <Hamburger isDarkMode={isDarkMode} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <Transition
        show={isSearchClicked}
        // className="transition-all duration-500 ease-in-out overflow-hidden"
        enterFrom="transform max-h-0"
        enterTo="transform max-h-[89px]"
        leaveFrom="transform max-h-[89px]"
        leaveTo="transform max-h-0"
      >
        <div className="block container p-3 sm:hidden">
          <input
            type="text"
            className="h-full px-4 border text-[var(--theme-alter-color)] border-[var(--theme-alter-color)] py-3 w-full xl:w-full bg-[var(--theme-color)] rounded-lg focus:outline-none font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]"
            placeholder="Search Diamonds"
          />
        </div>
      </Transition>
      <div
        className={`fixed ${
          open ? "w-full lg:w-0" : "w-0"
        } h-full top-0 lg:w-0 overflow-hidden backdrop-filter backdrop-blur-[1px] transition-width duration-500 ease-in-out float-right right-0 bottom-0 z-[998] cursor-pointer bg-opacity-15`}
      >
        <div
          className={`h-screen overflow-hidden float-right transition-width duration-500 ease-in-out bg-[var(--theme-color)] relative shadow-custom ${
            !open ? "w-0" : "w-[90%] sm:w-3/4 md:w-1/2 lg:w-[768px]"
          }`}
          ref={navRef}
        >
          <div className={`w-full flex justify-end p-5 bg-[var(--theme-color)]`}>
            <button onClick={() => setOpen(false)} aria-label="close button">
              <CloseIcon isDarkMode={isDarkMode} />
            </button>
          </div>
          <div className="h-full flex items-center justify-center bg-[var(--theme-color)] [font-family:var(--paregraph-p3-semibold-font-family)] font-[number:var(--paregraph-p3-semibold-font-weight)] text-grayscale-700 text-[length:var(--paregraph-p3-semibold-font-size)] tracking-[var(--paregraph-p3-semibold-letter-spacing)] leading-[var(--paregraph-p3-semibold-line-height)] [font-style:var(--paregraph-p3-semibold-font-style)]">
            <ul className="gap-y-6 flex flex-col [&>li>a]:text-grayscale-700 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:text-lg">
              <LinkComponenet setOpen={setOpen} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
