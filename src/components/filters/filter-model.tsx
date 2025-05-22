import { FC, useMemo, useState, useEffect, JSX } from "react";
import { Transition } from "@headlessui/react";
import _ from "lodash";
import EditUndoIcon from "../../assets/custom-icons/EditUndoIcon";
import { useModeStore } from "../../store/theme-mode/store";
import ChevroUpIcon from "../../assets/custom-icons/ChevroUpIcon";
import Accordion from "../accordion";
import { MINED } from "../../constants";
import {
  FilterGlobalType,
  GlobalFilterType,
  ModelFilteredValueType,
} from "../../types";
import Dropdown from "../dropdown";
import Shape from "./shape";

const MIN = "min",
  MAX = "max";

const FilterModel: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  setOpen: (value: boolean) => void;
  handleResetFilterMain: () => void;
  handleApplyFilter: () => void;
  modelFilteredValue: ModelFilteredValueType;
  setModelFilteredValue: React.Dispatch<
    React.SetStateAction<ModelFilteredValueType>
  >;
  disableResetBtn: boolean;
  filteredDataBackUp: FilterGlobalType;
  getFilterModelObj: (filterObj: FilterGlobalType) => ModelFilteredValueType;
  globalFilterData: GlobalFilterType;
}> = ({
  filteredData,
  setFilteredData,
  setOpen,
  handleResetFilterMain,
  handleApplyFilter,
  modelFilteredValue,
  setModelFilteredValue,
  disableResetBtn,
  filteredDataBackUp,
  getFilterModelObj,
  globalFilterData,
}): JSX.Element => {
  const { isDarkMode, diamondFilterData } = useModeStore((state) => state);
  const data = (filterName: string) => diamondFilterData[filterName]?.options;
  const [isAdvancedAllow, setIsAdvancedAllow] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState({
    color: 0,
    clarity: 0,
    flourescence: 0,
    polish: 0,
    symmetry: 0,
  });
  const dynamicDiamondFilterData = Object.values(diamondFilterData);

  const handleClickedCerti = (certificate: string) => {
    setFilteredData({
      ...filteredData,
      certificate,
    });
  };

  const handleClick = (e: any, type: string, filterName: string) => {
    const min = e.value;

    if (type === MIN) {
      const max = modelFilteredValue[filterName].max,
        minIndex = data(filterName).findIndex((i) => i.value === min),
        maxIndex = data(filterName).findIndex((i) => i.value === max);

      setIsDisabled({
        ...isDisabled,
        [filterName]: minIndex,
      });

      setModelFilteredValue((v) => ({
        ...v,
        [filterName]: {
          max: minIndex > maxIndex ? min : v[filterName].max,
          min: min,
        },
      }));
    } else {
      setModelFilteredValue((v) => ({
        ...v,
        [filterName]: { ...v[filterName], max: min },
      }));
    }
  };

  const isHandleDisabled = (item, filterName) => isDisabled[filterName] > item;

  const handleResetFilter = () => {
    if (!disableResetBtn) handleResetFilterMain();
    setOpen(false);
  };

  const isFilteredValueInitial = useMemo(
    () => _.isEqual(getFilterModelObj(filteredDataBackUp), modelFilteredValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredDataBackUp, modelFilteredValue]
  );

  useEffect(() => {
    const minIndexs = {
      color: 0,
      clarity: 0,
      flourescence: 0,
      polish: 0,
      symmetry: 0,
    };

    Object.keys(isDisabled).forEach((filterName) => {
      minIndexs[filterName] = data(filterName)?.findIndex(
        (i) => i.value === modelFilteredValue?.[filterName].min
      );
    });

    setIsDisabled(minIndexs);
  }, []);

  return (
    <div className="py-4 px-3 h-screen overflow-y-scroll bg-[var(--theme-color)]">
      <div className="p-2 border border-grayscale-2500 rounded-lg flex gap-x-6 items-center justify-center [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
        <button
          onClick={handleResetFilter}
          aria-label="reset filter"
          className={`px-4 md:px-6 py-[9px] md:py-3 rounded-lg w-1/2 md:w-full border hover:bg-[var(--funnel-theme-color)] border-[var(--theme-alter-color)] focus:bg-[var(--funnel-theme-color)] flex items-center justify-center gap-x-2
          ${
            disableResetBtn && isFilteredValueInitial && "disabled:opacity-50 "
          }`}
          disabled={disableResetBtn && isFilteredValueInitial}
        >
          <EditUndoIcon isDarkMode={isDarkMode} />
          <span className="whitespace-nowrap text-center">Reset Filter</span>
        </button>
        <button
          onClick={handleApplyFilter}
          aria-label="apply"
          className="px-6 py-3 rounded-lg border w-1/2 md:w-full hover:bg-[var(--funnel-theme-color)] border-[var(--theme-alter-color)] focus:bg-[var(--funnel-theme-color)] flex items-center justify-center gap-x-2"
        >
          <span>Apply</span>
        </button>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 w-full">
          <div className="relative">
            <div className="grid grid-cols-1 gap-x-6 w-full gap-y-6">
              {[...dynamicDiamondFilterData]
                .filter(
                  (a) =>
                    (a as { attribute_code: string }).attribute_code === "shape"
                )
                .map((item: any, index: number) => (
                  <div key={index + item.label}>
                    <Shape
                      filteredData={filteredData}
                      setFilteredData={setFilteredData}
                      item={item}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-y-4 flex-col">
            <div className="flex gap-y-4 flex-col">
              {[...dynamicDiamondFilterData]
                .filter((item: any) => {
                  // Show all filters except shape (handled separately)
                  if (item.attribute_code === "shape") return false;
                  // Show only filters that are not advance

                  if (item.isAdvance) return false;
                  // Only show rapnet_price, clarity, and the correct color/fancy_color

                  // For color/fancy_color, only show the relevant one
                  if (
                    (item.attribute_code === "color" &&
                      globalFilterData.colorType === MINED) ||
                    (item.attribute_code === "fancy_color" &&
                      globalFilterData.colorType !== MINED)
                  ) {
                    return true;
                  }
                  return true;
                })
                .map((item: any) => {
                  // Price/min-max input
                  if (
                    [
                      "rapnet_price",
                      "weight",
                      "depth_percentage",
                      "table_percentage",
                    ].includes(item.attribute_code)
                  ) {
                    // Determine value and onChange logic based on attribute_code
                    let value: [number, number] = [0, 0];
                    let onChange: (v: [number, number]) => void = () => {};
                    if (item.attribute_code === "rapnet_price") {
                      value = [
                        modelFilteredValue?.price?.minPrice ?? Number(item.min),
                        modelFilteredValue?.price?.maxPrice ?? Number(item.max),
                      ];
                      onChange = ([min, max]) =>
                        setModelFilteredValue((v) => ({
                          ...v,
                          price: { minPrice: min, maxPrice: max },
                        }));
                    } else if (item.attribute_code === "weight") {
                      value = [
                        modelFilteredValue?.weight?.minWeight ??
                          Number(item.min),
                        modelFilteredValue?.weight?.maxWeight ??
                          Number(item.max),
                      ];
                      onChange = ([min, max]) =>
                        setModelFilteredValue((v) => ({
                          ...v,
                          weight: { minWeight: min, maxWeight: max },
                        }));
                    } else if (item.attribute_code === "depth_percentage") {
                      value = [
                        modelFilteredValue?.depth_percentage?.minDepth ??
                          Number(item.min),
                        modelFilteredValue?.depth_percentage?.maxDepth ??
                          Number(item.max),
                      ];
                      onChange = ([min, max]) =>
                        setModelFilteredValue((v) => ({
                          ...v,
                          depth_percentage: { minDepth: min, maxDepth: max },
                        }));
                    } else if (item.attribute_code === "table_percentage") {
                      value = [
                        modelFilteredValue?.table_percentage?.minTable ??
                          Number(item.min),
                        modelFilteredValue?.table_percentage?.maxTable ??
                          Number(item.max),
                      ];
                      onChange = ([min, max]) =>
                        setModelFilteredValue((v) => ({
                          ...v,
                          table_percentage: { minTable: min, maxTable: max },
                        }));
                    }
                    return (
                      <Accordion key={item.attribute_code} label={item.label}>
                        <div className="flex items-center gap-4">
                          <input
                            className="outline-none w-24 bg-[var(--dark-theme-color)] text-center rounded"
                            type="number"
                            min={item.min}
                            max={value[1]}
                            value={value[0]}
                            onChange={(e) =>
                              onChange([Number(e.target.value), value[1]])
                            }
                          />
                          <span>To</span>
                          <input
                            className="outline-none w-24 bg-[var(--dark-theme-color)] text-center rounded"
                            type="number"
                            min={value[0]}
                            max={item.max}
                            value={value[1]}
                            onChange={(e) =>
                              onChange([value[0], Number(e.target.value)])
                            }
                          />
                        </div>
                      </Accordion>
                    );
                  }

                  // Dropdowns for filters with options (like color, clarity, polish, etc.)
                  if (item.options && Array.isArray(item.options)) {
                    // Get current min/max from modelFilteredValue
                    const minValue =
                      modelFilteredValue?.[item.attribute_code]?.min;
                    const maxValue =
                      modelFilteredValue?.[item.attribute_code]?.max;
                    return (
                      <Accordion key={item.attribute_code} label={item.label}>
                        <div className="flex items-center gap-4">
                          <Dropdown
                            value={minValue}
                            dataList={item.options.filter(
                              (i: any) => i.value !== ""
                            )}
                            handleClickItem={(e) =>
                              handleClick(e, MIN, item.attribute_code)
                            }
                          />
                          <span>To</span>
                          <Dropdown
                            value={maxValue}
                            dataList={item.options.filter(
                              (i: any) => i.value !== ""
                            )}
                            handleClickItem={(e) =>
                              handleClick(e, MAX, item.attribute_code)
                            }
                            isDisabled={(i) =>
                              isHandleDisabled(i, item.attribute_code)
                            }
                          />
                        </div>
                      </Accordion>
                    );
                  }

                  return null;
                })}
            </div>
          </div>
        </div>

        {/* Advance Filter start */}
        <div className="w-full flex items-center gap-6 p-4 relative flex-[0_0_auto] bg-[var(--theme-color)]">
          <div className="relative w-full h-[2px] bg-[var(--bg-blank)]" />
          <button
            onClick={() => setIsAdvancedAllow(!isAdvancedAllow)}
            className="flex items-center gap-2 px-[24px] py-3 relative flex-[0_0_auto] rounded-lg border border-solid border-[var(--theme-alter-color)]"
          >
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              Advanced Filter
            </div>
            <span
              className={`!relative !w-[24px] !h-[24px] transform transition-transform ${
                isAdvancedAllow ? "rotate-0" : "rotate-180"
              } ease-in-out duration-800`}
            >
              <ChevroUpIcon isDarkMode={isDarkMode} />
            </span>
          </button>
          <div className="relative w-full h-[2px] bg-[var(--bg-blank)]" />
        </div>
        <Transition
          show={isAdvancedAllow}
          // className="transition-all duration-500 ease-in-out overflow-hidden"
          enterFrom="transform max-h-0"
          enterTo="transform max-h-[9999px]"
          leaveFrom="transform max-h-[9999px]"
          leaveTo="transform max-h-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[...dynamicDiamondFilterData]
              .filter((item: any) => {
                if (item.attribute_code === "shape") return false;

                if (!item.isAdvance) return false;
                if (
                  (item.attribute_code === "color" &&
                    globalFilterData.colorType === MINED) ||
                  (item.attribute_code === "fancy_color" &&
                    globalFilterData.colorType !== MINED)
                ) {
                  return true;
                }
                return true;
              })
              .sort((a, b) =>
                (a as { attribute_code: string }).attribute_code ===
                "certificates"
                  ? 1
                  : (b as { attribute_code: string }).attribute_code ===
                    "certificates"
                  ? -1
                  : 0
              )
              .map((item: any) => {
                // Min-max numeric input
                if (
                  [
                    "weight",
                    "depth_percentage",
                    "table_percentage",
                    "certificates",
                  ].includes(item.attribute_code)
                ) {
                  let value: [number, number] = [0, 0];
                  let onChange: ([min, max]: [
                    number,
                    number
                  ]) => void = () => {};
                  if (item.attribute_code === "weight") {
                    value = [
                      modelFilteredValue?.weight?.minWeight ?? Number(item.min),
                      modelFilteredValue?.weight?.maxWeight ?? Number(item.max),
                    ];
                    onChange = ([min, max]) =>
                      setModelFilteredValue((v) => ({
                        ...v,
                        weight: { minWeight: min, maxWeight: max },
                      }));
                  } else if (item.attribute_code === "depth_percentage") {
                    value = [
                      modelFilteredValue?.depth_percentage?.minDepth ??
                        Number(item.min),
                      modelFilteredValue?.depth_percentage?.maxDepth ??
                        Number(item.max),
                    ];
                    onChange = ([min, max]) =>
                      setModelFilteredValue((v) => ({
                        ...v,
                        depth_percentage: { minDepth: min, maxDepth: max },
                      }));
                  } else if (item.attribute_code === "table_percentage") {
                    value = [
                      modelFilteredValue?.table_percentage?.minTable ??
                        Number(item.min),
                      modelFilteredValue?.table_percentage?.maxTable ??
                        Number(item.max),
                    ];
                    onChange = ([min, max]) =>
                      setModelFilteredValue((v) => ({
                        ...v,
                        table_percentage: { minTable: min, maxTable: max },
                      }));
                  }
                  return item.range ? (
                    <Accordion
                      key={item.attribute_code + item.label}
                      label={item.label}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          className="outline-none w-24 bg-[var(--dark-theme-color)] text-center rounded"
                          type="number"
                          min={item.min}
                          max={value[1]}
                          value={value[0]}
                          onChange={(e) =>
                            onChange([Number(e.target.value), value[1]])
                          }
                        />
                        <span>To</span>
                        <input
                          className="outline-none w-24 bg-[var(--dark-theme-color)] text-center rounded"
                          type="number"
                          min={value[0]}
                          max={item.max}
                          value={value[1]}
                          onChange={(e) =>
                            onChange([value[0], Number(e.target.value)])
                          }
                        />
                      </div>
                    </Accordion>
                  ) : item.attribute_code === "certificates" ? (
                    <div
                      key={item.attribute_code}
                      className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg"
                    >
                      <h2>
                        <button
                          type="button"
                          className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                        >
                          <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                            {item.label}
                          </span>
                        </button>
                      </h2>
                      <div className="flex flex-wrap items-start justify-between content-start gap-6 flex-[0_0_auto]">
                        {item?.options?.map((option: any, i: number) => (
                          <div
                            key={i + option.label + option.value}
                            onClick={() => handleClickedCerti(option?.value)}
                            className="cursor-pointer w-1/4 h-full py-3 flex justify-center bg-[var(--dark-theme-color)] rounded-lg border border-solid border-[var(--filter-border-color)]"
                          >
                            <div className="relative w-fit [font-family:'Poppins-Regular',Helvetica] font-normal text-[var(--theme-alter-color)] text-[16.1px] tracking-[0] leading-[normal]">
                              {option?.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                }

                // Dropdowns for filters with options
                if (item.options && Array.isArray(item.options)) {
                  const minValue =
                    modelFilteredValue?.[item.attribute_code]?.min;
                  const maxValue =
                    modelFilteredValue?.[item.attribute_code]?.max;
                  return (
                    <Accordion key={item.attribute_code} label={item.label}>
                      <div className="flex items-center gap-4">
                        <Dropdown
                          value={minValue}
                          dataList={item.options.filter(
                            (i: any) => i.value !== ""
                          )}
                          handleClickItem={(e) =>
                            handleClick(e, MIN, item.attribute_code)
                          }
                        />
                        <span>To</span>
                        <Dropdown
                          value={maxValue}
                          dataList={item.options.filter(
                            (i: any) => i.value !== ""
                          )}
                          handleClickItem={(e) =>
                            handleClick(e, MAX, item.attribute_code)
                          }
                          isDisabled={(i) =>
                            isHandleDisabled(i, item.attribute_code)
                          }
                        />
                      </div>
                    </Accordion>
                  );
                }

                // Add more UI types here if needed for new filter types

                return null;
              })}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default FilterModel;
