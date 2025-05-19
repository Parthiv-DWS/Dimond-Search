import { FC } from "react";
import { DEPTH_TITLE } from "../../../constants";
import { FilterGlobalType, FilteredValueType } from "../../../types";
import { GetFormatedAdvancedValue } from "../../../utility/utils";
import Slider from "rc-slider";
import { useModeStore } from "../../../store/theme-mode/store";

const Depth: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  depth: FilterGlobalType["depth_percentage"];
  sliderDepthValue: number[];
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
}> = ({
  filteredData,
  setFilteredData,
  depth,
  sliderDepthValue,
  setFilteredValue,
}) => {
  const { diamondFilterData } = useModeStore((state) => state);

  const handleSliderChangeDepth = (newValue: number | number[]): void => {
    if (Array.isArray(newValue)) {
      let [newMin, newMax] = newValue;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];
      setFilteredValue((prev) => ({
        ...prev,
        depth_percentage: {
          minDepth: newMin,
          maxDepth: newMax,
        },
        sliderDepthValue: [newMin, newMax],
      }));
    }
  };

  const handleAfterDepthChange = (e: number | number[]) => {
    if (
      e?.[0] !== filteredData?.depth_percentage?.minDepth ||
      e?.[1] !== filteredData?.depth_percentage?.maxDepth
    )
      setFilteredData({
        ...filteredData,
        depth_percentage: {
          minDepth: e?.[0],
          maxDepth: e?.[1],
        },
      });
  };

  return (
    <>
      <div className="inline-flex flex-col items-start gap-4 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg w-full">
        <div className="w-full flex items-center justify-between relative flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              {DEPTH_TITLE}
            </div>
          </div>
          <div className="inline-flex items-start gap-[24px] relative flex-[0_0_auto]">
            <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                <input
                  className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                  type="tel"
                  aria-label="min-depth"
                  value={GetFormatedAdvancedValue(`${depth?.minDepth}`)}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const minValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );
                    setFilteredValue((prev) => ({
                      ...prev,
                      depth_percentage: {
                        minDepth: minValue,
                        maxDepth: Number(prev?.depth_percentage?.maxDepth),
                      },
                      sliderDepthValue: [
                        minValue,
                        Number(prev?.sliderDepthValue?.[1]),
                      ],
                    }));
                  }}
                  onBlur={(e) => {
                    const inputText = e.target.value;
                    const minValue = Number(inputText.replace(/[^0-9.]/g, ""));

                    if (minValue !== filteredData?.depth_percentage?.minDepth) {
                      if (minValue >= Number(depth?.maxDepth)) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          depth_percentage: {
                            minDepth: Number(
                              diamondFilterData?.depth_percentage?.min
                            ),
                            maxDepth: Number(prev?.depth_percentage?.maxDepth),
                          },
                          sliderDepthValue: [
                            Number(diamondFilterData?.depth_percentage?.min),
                            Number(prev.sliderDepthValue?.[1]),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            minDepth: Number(
                              diamondFilterData?.depth_percentage?.min
                            ),
                          },
                        });
                      } else if (
                        minValue <=
                        Number(diamondFilterData?.depth_percentage?.min)
                      ) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          depth_percentage: {
                            minDepth: Number(
                              diamondFilterData?.depth_percentage?.min
                            ),
                            maxDepth: Number(prev?.depth_percentage?.maxDepth),
                          },
                          sliderDepthValue: [
                            Number(diamondFilterData?.depth_percentage?.min),
                            Number(prev.sliderDepthValue?.[1]),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            minDepth: Number(
                              diamondFilterData?.depth_percentage?.min
                            ),
                          },
                        });
                      } else
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            minDepth: minValue,
                          },
                        });
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
                  aria-label="max-depth"
                  value={GetFormatedAdvancedValue(`${depth?.maxDepth}`)}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const maxValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );

                    setFilteredValue((prev) => ({
                      ...prev,
                      depth_percentage: {
                        minDepth: Number(prev?.depth_percentage?.minDepth),
                        maxDepth: maxValue,
                      },
                      sliderDepthValue: [
                        Number(prev.sliderDepthValue?.[0]),
                        maxValue,
                      ],
                    }));
                  }}
                  onBlur={(e) => {
                    const inputText = e.target.value;
                    const maxValue = Number(inputText.replace(/[^0-9.]/g, ""));

                    if (
                      maxValue !==
                      Number(filteredData?.depth_percentage?.maxDepth)
                    ) {
                      if (maxValue <= Number(depth?.minDepth)) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          depth_percentage: {
                            minDepth: Number(prev?.depth_percentage?.minDepth),
                            maxDepth: Number(
                              diamondFilterData?.depth_percentage?.max
                            ),
                          },
                          sliderDepthValue: [
                            Number(prev?.sliderDepthValue?.[0]),
                            Number(diamondFilterData?.depth_percentage?.max),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            maxDepth: Number(
                              diamondFilterData?.depth_percentage?.max
                            ),
                          },
                        });
                      } else if (
                        maxValue >=
                        Number(diamondFilterData?.depth_percentage?.max)
                      ) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          depth_percentage: {
                            minDepth: Number(prev?.depth_percentage?.minDepth),
                            maxDepth: Number(
                              diamondFilterData?.depth_percentage?.max
                            ),
                          },
                          sliderDepthValue: [
                            Number(prev?.sliderDepthValue?.[0]),
                            Number(diamondFilterData?.depth_percentage?.max),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            maxDepth: Number(
                              diamondFilterData?.depth_percentage?.max
                            ),
                          },
                        });
                      } else
                        setFilteredData({
                          ...filteredData,
                          depth_percentage: {
                            ...filteredData?.depth_percentage,
                            maxDepth: maxValue,
                          },
                        });
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
              min={parseFloat(diamondFilterData?.depth_percentage?.min)}
              max={parseFloat(diamondFilterData?.depth_percentage?.max)}
              value={sliderDepthValue}
              onChangeComplete={handleAfterDepthChange}
              onChange={handleSliderChangeDepth}
              ariaLabelForHandle="depth"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Depth;
