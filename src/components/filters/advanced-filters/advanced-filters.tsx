import React, { FC, JSX } from "react";
import Slider from "rc-slider";
import { FilterGlobalType, GlobalFilterType } from "../../../types";
import { FilterSliderData } from "../../../utility/utils";
import MinMaxInput from "../MinMaxInput";
import { Tooltip } from "../../Tooltip";
import { isNumber } from "lodash";

export const AdvancedFilteres: FC<{
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  newFilteredValue: any;
  setNewFilteredValue: React.Dispatch<React.SetStateAction<any>>;
  globalFilterData: GlobalFilterType;
  minMaxAttributes: {
    [key: string]: [string, string];
  };
  isMinMaxAttribute: (attr: string) => boolean;
  handleClickedCerti: (value: string) => void;
  handleChangeSlider: (key: string, e: number[] | number | undefined, isRange: boolean) => void;
  handleAfterChangeSlider: (
    key: string,
    e: number[] | number | undefined, isRange: boolean
  ) => void;
  newFilterData: any;
  getIndexRange: (options: string[], min: string, max: string) => [number, number];
}> = ({
  newFilteredValue,
  setNewFilteredValue,
  globalFilterData,
  minMaxAttributes,
  isMinMaxAttribute,
  handleClickedCerti,
  handleChangeSlider,
  handleAfterChangeSlider,
  newFilterData,
  getIndexRange,
}): JSX.Element => {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-6 w-full gap-y-6">
        {[...newFilterData]
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
                        <span className="flex">{item.label} {" "}
                          {item.tooltip && <Tooltip content={item.tooltip}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1.5 inline-block">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                          </Tooltip>}
                        </span>
                      </div>
                    </div>

                    {isMinMaxAttribute(attr) && (
                      <MinMaxInput
                        min={Number(item.min)}
                        max={Number(item.max)}
                        value={[
                          newFilteredValue?.[attr]?.[0] ?? Number(item.min),
                          newFilteredValue?.[attr]?.[1] ?? Number(item.max),
                        ]}
                        onChange={([min, max]) =>
                          setNewFilteredValue((prev) => ({
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
                            (e[0] !== newFilteredValue[attr]?.[0] ||
                              e[1] !== newFilteredValue[attr]?.[1]) &&
                            handleAfterChangeSlider(attr, e, !isNumber(newFilteredValue?.[attr]?.[0]))
                          }
                          onChange={(e) => handleChangeSlider(attr, e,!isNumber(newFilteredValue?.[attr]?.[0]))}
                          defaultValue={item.options}
                          value={
                            !isNumber(newFilteredValue?.[attr]?.[0]) ? 
                              getIndexRange(
                                item.options,
                                newFilteredValue?.[attr]?.[0],
                                newFilteredValue?.[attr]?.[newFilteredValue?.[attr]?.length-1]) 
                              : newFilteredValue?.[attr]}
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
