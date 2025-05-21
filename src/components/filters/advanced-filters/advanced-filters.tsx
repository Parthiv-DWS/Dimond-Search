import { FC, JSX } from "react";
import Slider from "rc-slider";
import {
  FilterGlobalType,
  FilteredValueType,
  GlobalFilterType,
} from "../../../types";
import { FilterSliderData } from "../../../utility/utils";
import { useModeStore } from "../../../store/theme-mode/store";
import MinMaxInput from "../MinMaxInput";

export const AdvancedFilteres: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  filteredValue: FilteredValueType;
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
  globalFilterData: GlobalFilterType;
}> = ({
  filteredData,
  setFilteredData,
  filteredValue,
  setFilteredValue,
  globalFilterData,
}): JSX.Element => {
  const { diamondFilterData } = useModeStore((state) => state);
  const dynamicDiamondFilterData = Object.values(diamondFilterData);
  const handleAfterChangeSlider = (
    key: string,
    e: number[] | number | undefined
  ) => {
    setFilteredData({
      ...filteredData,
      [key]: e,
    });
  };

  const handleChangeSlider = (
    key: string,
    e: number[] | number | undefined
  ) => {
    if (Array.isArray(e)) {
      let [newMin, newMax] = e;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];
      setFilteredValue((prev) => ({
        ...prev,
        [key]: [newMin, newMax],
      }));
    }
  };

  const handleClickedCerti = (certificate: string) => {
    setFilteredData({
      ...filteredData,
      certificate,
    });
  };

  const minMaxAttributes = {
    rapnet_price: ["Min Price", "Max Price"],
    depth_percentage: ["Min Depth %", "Max Depth %"],
    table_percentage: ["Min Table %", "Max Table %"],
    weight: ["Min Weight", "Max Weight"],
  } as const;

  const isMinMaxAttribute = (
    attr: string
  ): attr is keyof typeof minMaxAttributes => attr in minMaxAttributes;

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-6 w-full gap-y-6">
        {[...dynamicDiamondFilterData]
          .filter(
            (item: any) =>
              item.attribute_code !== "shape" &&
              item.isAdvance &&
              item.attribute_code !==
                (globalFilterData.colorType === "mined"
                  ? "fancy_color"
                  : "color")
          )
          .sort((a, b) =>
            (a as { attribute_code: string }).attribute_code === "certificates"
              ? 1
              : (b as { attribute_code: string }).attribute_code ===
                "certificates"
              ? -1
              : 0
          )
          .map((item: any, index: number) => {
            const attr = item.attribute_code;

            return (
              <div
                key={index + item.label}
                className="inline-flex flex-col items-start gap-4 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg w-full"
              >
                <div className="inline-flex flex-col items-start gap-4 relative w-full">
                  <div className="w-full flex justify-between items-center">
                    <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
                      <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                        {item.label}
                      </div>
                    </div>

                    {isMinMaxAttribute(attr) && (
                      <MinMaxInput
                        min={Number(item.min)}
                        max={Number(item.max)}
                        value={[
                          filteredValue?.[attr]?.[0] ?? Number(item.min),
                          filteredValue?.[attr]?.[1] ?? Number(item.max),
                        ]}
                        onChange={([min, max]) =>
                          setFilteredValue((prev) => ({
                            ...prev,
                            [attr]: [min, max],
                          }))
                        }
                        minLabel={minMaxAttributes[attr][0]}
                        maxLabel={minMaxAttributes[attr][1]}
                      />
                    )}
                  </div>

                  <div className="w-full flex-col items-start justify-end relative">
                    {item.range ? (
                      <div className="relative h-[24px]">
                        <Slider
                          range
                          min={Number(item.min)}
                          max={
                            item.options?.length > 0
                              ? Object.keys(item.options).length - 1
                              : Number(item?.max)
                          }
                          marks={FilterSliderData(item.options, "3%")}
                          step={0}
                          onChangeComplete={(e) =>
                            (e[0] !== filteredData[attr]?.[0] ||
                              e[1] !== filteredData[attr]?.[1]) &&
                            handleAfterChangeSlider(attr, e)
                          }
                          onChange={(e) => handleChangeSlider(attr, e)}
                          defaultValue={item.options}
                          value={filteredValue?.[attr]}
                          allowCross={false}
                          pushable
                          ariaLabelForHandle={attr}
                        />
                      </div>
                    ) : attr === "certificates" ? (
                      <div className="flex flex-wrap gap-2">
                        {item.options?.map((option: any, i: number) => (
                          <div
                            key={i}
                            onClick={() => handleClickedCerti?.(option?.value)}
                            className="cursor-pointer px-3 py-2 bg-[var(--dark-theme-color)] rounded-lg border border-[var(--filter-border-color)] hover:border-[var(--theme-alter-color)]"
                          >
                            <span className="text-[var(--theme-alter-color)] text-sm">
                              {option?.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
