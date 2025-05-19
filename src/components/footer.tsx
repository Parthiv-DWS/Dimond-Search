import { FC, Fragment } from "react";
import { SocialList, TopFooters } from "../utility/utils";
import { CONTACT_US } from "../constants";
import LogoImage from "../assets/Logo.svg";
import TopRightCornerIcon from "../assets/custom-icons/TopRightCornerIcon";
import { useModeStore } from "../store/theme-mode/store";

const Footer: FC = () => {
  const { isDarkMode } = useModeStore((state) => state);
  const topFooterData = TopFooters();
  const socialListData = SocialList();

  return (
    <>
      <div className="bg-[var(--funnel-theme-color)]">
        <div className="container mx-auto inset-x-0 bottom-0 [font-family:var(--paregraph-p1-medium-font-family)] text-[var(--theme-alter-color)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
          <div className="px-3 py-6 md:py-12 flex gap-x-44 flex-wrap gap-y-12 justify-start">
            <div className="flex gap-y-4 flex-col">
              <img src={LogoImage} alt="logo" width={130} height={100} />
              <div>
                <p className="font-[number:var(--paregraph-p3-medium-font-weight)] text-[length:var(--paregraph-p3-medium-font-size)]">
                  Sign up for our Emails
                </p>
                <div className="flex pt-2">
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="rounded-l-lg py-4 pl-4 pr-2 bg-[var(--dark-theme-color)] focus:outline-none font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-grayscale-900 text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]"
                  />
                  <button
                    className="p-4 rounded-r-lg bg-[var(--footer-theme-color)]"
                    aria-label="top-right-corner-icon"
                  >
                    <TopRightCornerIcon isDarkMode={isDarkMode} />
                  </button>
                </div>
              </div>
              <div className="flex gap-x-6">
                {socialListData?.map((item: any, i: number) => (
                  <a href={item?.url} key={i}>
                    <img
                      src={item?.iconUrl}
                      alt={item?.label}
                      width="100%"
                      height="100%"
                    />
                  </a>
                ))}
              </div>
            </div>
            {topFooterData?.map((item: any, i: number) => (
              <div className="flex flex-col justify-start gap-y-4" key={i}>
                <p className="text-2xl font-paregraph-p1-semibold font-[number:var(--paregraph-p1-semibold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p1-semibold-font-size)] tracking-[var(--paregraph-p1-semibold-letter-spacing)] leading-[var(--paregraph-p1-semibold-line-height)] [font-style:var(--paregraph-p1-semibold-font-style)]">
                  {item?.label}
                </p>
                <ul>
                  {item?.list?.map((listItem: any, i: number) => (
                    <Fragment key={i}>
                      {item?.label === CONTACT_US ? (
                        <li className="flex gap-x-2 pb-2 items-start">
                          <img
                            src={listItem?.imgUrl}
                            alt={listItem?.label}
                            width="100%"
                            height="100%"
                          />
                          <p className="w-64 shrink-0">
                            {listItem?.description}
                          </p>
                        </li>
                      ) : (
                        <li className="pb-2">
                          <a href="#">{listItem?.title}</a>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-start relative bg-[var(--footer-theme-color)]">
        <div className="container mx-auto flex flex-col items-start px-3 flex-[0_0_auto]">
          <div className="flex w-full items-center justify-center gap-[10px] px-0 py-[16px] relative flex-[0_0_auto]">
            <p className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[10px] md:text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              Copyright © 2023 DOLPHIN WEB SOLUTION. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
