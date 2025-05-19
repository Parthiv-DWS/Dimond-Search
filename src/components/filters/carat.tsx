import Slider from "rc-slider";
import { FC } from "react";
import { CARAT_TITLE } from "../../constants";
import { FilterGlobalType, FilteredValueType } from "../../types";
import { useModeStore } from "../../store/theme-mode/store";

const Carat: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  carat: FilterGlobalType["carat"];
  sliderCaratValue: number[];
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
}> = ({
  filteredData,
  setFilteredData,
  carat,
  sliderCaratValue,
  setFilteredValue,
}) => {
  const { diamondFilterData } = useModeStore((state) => state);

  const handleSliderChangeCarat = (newValue: number | number[]): void => {
    if (Array.isArray(newValue)) {
      let [newMin, newMax] = newValue;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];
      setFilteredValue((prev) => ({
        ...prev,
        carat: {
          minCarat: newMin,
          maxCarat: newMax,
        },
        sliderCaratValue: [newMin, newMax],
      }));
    }
  };

  const handleAfterCaratChange = (e: any) => {
    if (
      e[0] !== filteredData.carat?.minCarat ||
      e[1] !== filteredData.carat?.maxCarat
    )
      setFilteredData({
        ...filteredData,
        carat: {
          minCarat: e[0],
          maxCarat: e[1],
        },
      });
  };
  return (
    <div className="inline-flex flex-col items-start gap-4 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg w-full">
      <div className="w-full flex items-center justify-between relative flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
            {CARAT_TITLE}
          </div>
        </div>
        <div className="inline-flex items-start gap-[24px] relative flex-[0_0_auto]">
          <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              <input
                className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                type="tel"
                aria-label="min-carat"
                value={carat?.minCarat}
                onChange={(e) => {
                  const inputText = e.target.value;
                  const minValue = Number(inputText.replace(/[^0-9]./g, ""));

                  setFilteredValue((prev) => ({
                    ...prev,
                    carat: {
                      minCarat: minValue,
                      maxCarat: prev?.carat?.maxCarat,
                    },
                    sliderCaratValue: [
                      minValue,
                      Number(prev?.sliderCaratValue?.[1]),
                    ],
                  }));
                }}
                onBlur={(e) => {
                  const inputText = e.target.value;
                  const minValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  if (minValue !== filteredData?.carat?.minCarat) {
                    if (minValue >= Number(carat?.maxCarat)) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        carat: {
                          minCarat: Number(diamondFilterData?.size?.min),
                          maxCarat: prev?.carat?.maxCarat,
                        },
                        sliderCaratValue: [
                          Number(diamondFilterData?.size?.min),
                          Number(prev?.sliderCaratValue?.[1]),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          minCarat: Number(diamondFilterData?.size?.min),
                        },
                      });
                    } else if (
                      minValue <= Number(diamondFilterData?.size?.min)
                    ) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        carat: {
                          minCarat: Number(diamondFilterData?.size?.min),
                          maxCarat: prev?.carat?.maxCarat,
                        },
                        sliderCaratValue: [
                          Number(diamondFilterData?.size?.min),
                          Number(prev?.sliderCaratValue?.[1]),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          minCarat: Number(diamondFilterData?.size?.min),
                        },
                      });
                    } else {
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          minCarat: minValue,
                        },
                      });
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] leading-[var(--paregraph-p3-medium-line-height)] tracking-[var(--paregraph-p3-medium-letter-spacing)] [font-style:var(--paregraph-p3-medium-font-style)]">
              <input
                className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                type="tel"
                aria-label="max-carat"
                value={carat?.maxCarat}
                onChange={(e) => {
                  const inputText = e.target.value;
                  const maxValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  setFilteredValue((prev) => ({
                    ...prev,
                    carat: {
                      minCarat: prev?.carat?.minCarat,
                      maxCarat: maxValue,
                    },
                    sliderCaratValue: [
                      Number(prev?.sliderCaratValue?.[0]),
                      maxValue,
                    ],
                  }));
                }}
                onBlur={(e) => {
                  const inputText = e.target.value;
                  const maxValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  if (maxValue !== filteredData?.carat?.maxCarat) {
                    if (maxValue <= Number(carat?.minCarat)) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        carat: {
                          minCarat: prev?.carat?.minCarat,
                          maxCarat: Number(diamondFilterData?.size?.max),
                        },
                        sliderCaratValue: [
                          Number(prev?.sliderCaratValue?.[0]),
                          Number(diamondFilterData?.size?.max),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          maxCarat: Number(diamondFilterData?.size?.max),
                        },
                      });
                    } else if (
                      maxValue >= Number(diamondFilterData?.size?.max)
                    ) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        carat: {
                          minCarat: prev?.carat?.minCarat,
                          maxCarat: Number(diamondFilterData?.size?.max),
                        },
                        sliderCaratValue: [
                          Number(prev?.sliderCaratValue?.[0]),
                          Number(diamondFilterData?.size?.max),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          maxCarat: Number(diamondFilterData?.size?.max),
                        },
                      });
                    } else {
                      setFilteredData({
                        ...filteredData,
                        carat: {
                          ...filteredData?.carat,
                          maxCarat: maxValue,
                        },
                      });
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[24px]">
        <div className="relative h-[24px]">
          <Slider
            range
            min={Number(diamondFilterData?.size?.min)}
            max={Number(diamondFilterData?.size?.max)}
            value={sliderCaratValue}
            onChange={handleSliderChangeCarat}
            onChangeComplete={handleAfterCaratChange}
            ariaLabelForHandle="carat"
          />
        </div>
      </div>
    </div>
  );
};

export default Carat;
