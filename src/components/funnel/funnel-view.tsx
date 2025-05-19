import { FC, useState } from "react";
import { FunnelDataList } from "../../utility/utils";

const FunnelView: FC = () => {
  const funnelDataList = FunnelDataList();
  const [selectedItem, setSelectedItem] = useState<number>(1);

  const handleClicked = ({ id }: { id: number }): void => {
    setSelectedItem(id);
  };

  return (
    <>
      <div className="inline-flex flex-col items-start gap-2 w-full py-0 relative">
        <div className="inline-flex flex-col items-start gap-2 px-3 w-full py-6 xl:py-8 relative flex-[0_0_auto]">
          <div className="inline-flex items-end gap-x-6 gap-y-6 w-full justify-between relative flex-[0_0_auto]">
            {funnelDataList?.map((item: any) => (
              <button
                onClick={() => handleClicked(item)}
                key={item?.id}
                className={`flex w-[232px] xl:w-[456px] items-center justify-center hover:bg-[var(--funnel-theme-color)] gap-[8px] md:gap-6 px-0 py-4 relative rounded-2xl ${
                  selectedItem === item?.id
                    ? "bg-[var(--funnel-theme-color)]"
                    : "border border-solid border-[var(--theme-alter-color)]"
                }`}
              >
                <div
                  className={`relative w-8 md:w-16 h-8 md:h-16 flex items-center justify-center rounded-full ${
                    selectedItem !== item?.id && "bg-[var(--bg-blank)]"
                  }`}
                >
                  <div className="flex items-center h-full absolute top-px font-heading-p1-bold md:[font-family: var(--heading-h2-bold-font-family)] font-[number:var(--heading-p1-bold-font-weight)] md:font-[number:var(--heading-h2-bold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--heading-p1-bold-font-size)] md:text-[length:var(--heading-h2-bold-font-size)] tracking-[var(--heading-p1-bold-letter-spacing)] md:tracking-[var(--heading-h2-bold-letter-spacing)] leading-[var(--heading-p1-bold-line-height)] md:leading-[var(--heading-h2-bold-line-height)] [font-style:var(--heading-p1-bold-font-style)] md:[font-style:var(--heading-h2-bold-font-style)]">
                    {item?.id}
                  </div>
                </div>
                <div className="relative hidden xl:block w-fit font-paregraph-p1-medium font-[number:var(--paregraph-p1-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p1-medium-font-size)] tracking-[var(--paregraph-p1-medium-letter-spacing)] leading-[var(--paregraph-p1-medium-line-height)] [font-style:var(--paregraph-p1-medium-font-style)] [font-family:var(--paregraph-p1-medium-font-family)]">
                  {item?.label}
                </div>
                <img
                  className="relative w-8 md:w-[64px] h-8 md:h-[64px]"
                  src={item?.image}
                  alt={item?.imageLabel}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FunnelView;
