import Slider from "rc-slider";
import { FC } from "react";
import { GetFormatedAdvancedValue } from "../../../utility/utils";
import { TABLE_TITLE } from "../../../constants";
import { FilterGlobalType, FilteredValueType } from "../../../types";
import { useModeStore } from "../../../store/theme-mode/store";

const Table: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  table: FilterGlobalType["table_percentage"];
  sliderTableValue: number[];
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
}> = ({
  filteredData,
  setFilteredData,
  table,
  sliderTableValue,
  setFilteredValue,
}) => {
  const { diamondFilterData } = useModeStore((state) => state);

  const handleSliderChangePrice = (newValue: number | number[]): void => {
    if (Array.isArray(newValue)) {
      let [newMin, newMax] = newValue;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];
      setFilteredValue((prev) => ({
        ...prev,
        table_percentage: {
          minTable: newMin,
          maxTable: newMax,
        },
        sliderTableValue: [newMin, newMax],
      }));
    }
  };

  const handleAfterPriceChange = (e: any) => {
    if (
      e[0] !== filteredData?.table_percentage?.minTable ||
      e[1] !== filteredData?.table_percentage?.maxTable
    )
      setFilteredData({
        ...filteredData,
        table_percentage: {
          minTable: e[0],
          maxTable: e[1],
        },
      });
  };

  return (
    <>
      <div className="inline-flex flex-col items-start gap-4 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg w-full">
        <div className="w-full flex items-center justify-between relative flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              {TABLE_TITLE}
            </div>
          </div>
          <div className="inline-flex items-start gap-[24px] relative flex-[0_0_auto]">
            <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                <input
                  className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                  type="tel"
                  aria-label="min-table"
                  value={GetFormatedAdvancedValue(`${table?.minTable}`)}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const minValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );
                    setFilteredValue((prev) => ({
                      ...prev,
                      table_percentage: {
                        minTable: minValue,
                        maxTable: Number(prev?.table_percentage?.maxTable),
                      },
                      sliderTableValue: [
                        minValue,
                        Number(prev?.sliderTableValue?.[1]),
                      ],
                    }));
                  }}
                  onBlur={(e) => {
                    const inputText = e.target.value;
                    const minValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );

                    if (minValue !== Number(filteredData?.table_percentage?.minTable)) {
                      if (minValue >= Number(table?.maxTable)) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          table_percentage: {
                            minTable: Number(
                              diamondFilterData?.table_percentage?.min
                            ),
                            maxTable: Number(prev?.table_percentage?.maxTable),
                          },
                          sliderTableValue: [
                            Number(diamondFilterData?.table_percentage?.min),
                            Number(prev?.sliderTableValue?.[1]),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            minTable: Number(
                              diamondFilterData?.table_percentage?.min
                            ),
                          },
                        });
                      } else if (
                        minValue <=
                        Number(diamondFilterData?.table_percentage?.min)
                      ) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          table_percentage: {
                            minTable: Number(
                              diamondFilterData?.table_percentage?.min
                            ),
                            maxTable: Number(prev?.table_percentage?.maxTable),
                          },
                          sliderTableValue: [
                            Number(diamondFilterData?.table_percentage?.min),
                            Number(prev?.sliderTableValue?.[1]),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            minTable: Number(
                              diamondFilterData?.table_percentage?.min
                            ),
                          },
                        });
                      } else
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            minTable: minValue,
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
                  aria-label="max-table"
                  value={GetFormatedAdvancedValue(`${table?.maxTable}`)}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const maxValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );
                    setFilteredValue((prev) => ({
                      ...prev,
                      table_percentage: {
                        minTable: Number(prev?.table_percentage?.minTable),
                        maxTable: maxValue,
                      },
                      sliderTableValue: [
                        Number(prev?.sliderTableValue?.[0]),
                        maxValue,
                      ],
                    }));
                  }}
                  onBlur={(e) => {
                    const inputText = e.target.value;
                    const maxValue = parseFloat(
                      inputText.replace(/[^0-9.]/g, "")
                    );

                    if (maxValue !== Number(filteredData?.table_percentage?.maxTable)) {
                      if (maxValue <= Number(table?.minTable)) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          table_percentage: {
                            minTable: Number(prev?.table_percentage?.minTable),
                            maxTable: Number(
                              diamondFilterData?.table_percentage?.max
                            ),
                          },
                          sliderTableValue: [
                            Number(prev?.sliderTableValue?.[0]),
                            Number(diamondFilterData?.table_percentage?.max),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            maxTable: Number(
                              diamondFilterData?.table_percentage?.max
                            ),
                          },
                        });
                      } else if (
                        maxValue >=
                        Number(diamondFilterData?.table_percentage?.max)
                      ) {
                        setFilteredValue((prev) => ({
                          ...prev,
                          table_percentage: {
                            minTable: Number(prev?.table_percentage?.minTable),
                            maxTable: Number(
                              diamondFilterData?.table_percentage?.max
                            ),
                          },
                          sliderTableValue: [
                            Number(prev?.sliderTableValue?.[0]),
                            Number(diamondFilterData?.table_percentage?.max),
                          ],
                        }));
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            maxTable: Number(
                              diamondFilterData?.table_percentage?.max
                            ),
                          },
                        });
                      } else
                        setFilteredData({
                          ...filteredData,
                          table_percentage: {
                            ...filteredData?.table_percentage,
                            maxTable: maxValue,
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
              min={parseFloat(diamondFilterData?.table_percentage?.min)}
              max={parseFloat(diamondFilterData?.table_percentage?.max)}
              value={sliderTableValue}
              onChangeComplete={handleAfterPriceChange}
              onChange={handleSliderChangePrice}
              ariaLabelForHandle="table"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
