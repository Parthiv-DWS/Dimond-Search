import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Slider from "rc-slider";
import _, { isNumber } from "lodash";
import { Transition } from "@headlessui/react";
import Shape from "./shape";
import {
  CLARITY,
  COLOR,
  CUT,
  FANCY_COLOR,
  FANCY_COLOR_TITLE,
  FLUORESCENCE_INTENSITY,
  LAB,
  MINED,
  MINED_TITLE,
  POLISH,
  SYMMETRY,
} from "../../constants";
import { getInitialFilteredData } from "../../utility/utils";
import {
  FilterGlobalType,
  GlobalFilterType,
  ModelFilteredValueType,
} from "../../types";
import { FilterSliderData } from "../../utility/utils";
import { AdvancedFilteres } from "./advanced-filters/advanced-filters";
import EditUndoIcon from "../../assets/custom-icons/EditUndoIcon";
import { useModeStore } from "../../store/theme-mode/store";
import EditShowIcon from "../../assets/custom-icons/EditShowIcon";
import ChevroUpIcon from "../../assets/custom-icons/ChevroUpIcon";
import ModalOverlay from "../model-overlay";
import FilterModel from "./filter-model";
import EditHideIcon from "../../assets/custom-icons/EditHideIcon";
import MinMaxInput from "./MinMaxInput";
import { Tooltip } from "../Tooltip";

const FilterListSection: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filteredDataBackUp: FilterGlobalType;
  globalFilterData: GlobalFilterType;
  setGlobalFilterData: React.Dispatch<React.SetStateAction<GlobalFilterType>>;
  newFilterData: any;
  newFilteredValue: any;
  setNewFilteredValue: React.Dispatch<React.SetStateAction<any>>;
}> = ({
  filteredData,
  setFilteredData,
  isModelOpen,
  setIsModelOpen,
  setApplyFilter,
  filteredDataBackUp,
  globalFilterData,
  setGlobalFilterData,
  newFilterData,
  newFilteredValue,
  setNewFilteredValue,
}) => {
  const initialFilteredData = getInitialFilteredData();

  const initialFilteredValueRef = useRef(null);
  const [minMaxAttributes, setMinMaxAttributes] = useState({});

  const { isDarkMode, diamondFilterData } = useModeStore((state) => state);

  const data = (filterName: string) => diamondFilterData[filterName]?.options;
  const [isAdvancedAllow, setIsAdvancedAllow] = useState<boolean>(false);
  const [isFilterHide, setIsFilterHide] = useState<boolean>(false);
  const [modelFilteredValue, setModelFilteredValue] =
    useState<ModelFilteredValueType>(getFilterModelObj(newFilteredValue));

  useEffect(() => {
    if (!newFilterData?.length) return;
    handleNewFilteredValue();

    // Dynamically set input attributes where options is empty
    const inputAttributes = newFilterData.reduce((acc: any, item: any) => {
      const hasOptions = Array.isArray(item.options) && item.options.length > 0;
      if (!hasOptions && item.attribute_code) {
        acc[item.attribute_code] = [
          `Min ${item.label ?? item.attribute_code.replaceAll("_", " ")}`,
          `Max ${item.label ?? item.attribute_code.replaceAll("_", " ")}`,
        ];
      }
      return acc;
    }, {});
    setMinMaxAttributes(inputAttributes);
  }, [newFilterData]);

  const getRangeValues = (data, min, max) => {
    const startIndex = data.findIndex(item => item.value === min);
    const endIndex = data.findIndex(item => item.value === max);
  
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return "[]"; // fallback for invalid input
    }
  
    const valuesInRange = data.slice(startIndex, endIndex + 1).map(item => item.value);
    return valuesInRange
  };

  const handleNewFilteredValue = () => {
    const value = newFilterData.reduce((acc: any, item: any) => {
      const hasOptions = Array.isArray(item.options) && item.options.length > 0;
      let Range: number[] | string[] | null = []
      let min: number | string | null = item.min;
      let max: number | string | null = item.max;

      // If both min and max are blank, assign empty array
      if (
        min === null ||
        min === undefined ||
        min === "" ||
        max === null ||
        max === undefined ||
        max === ""
      ) {
        acc[item.attribute_code] = [];
        return acc;
      }

      if (hasOptions) {
        Range = getRangeValues(item.options, min, max);

        // Fallback in case value not found
        if (min === -1) min = 0;
        if (max === -1) max = item.options.length;
      } else {
        Range = [Number(item.min), Number(item.max)];
      }

      acc[item.attribute_code] = Range;
      return acc;
    }, {});

    setNewFilteredValue(value);

    if (
      value &&
      Object.keys(value).length > 0 &&
      initialFilteredValueRef.current === null
    ) {
      initialFilteredValueRef.current = value;
    }
  };

  function getFilterModelObj(
    filterObj: FilterGlobalType
  ): ModelFilteredValueType {
    const getMinMaxObj = (filterName: string) => {
      const filterData = data(filterName) || [];
      const filterValues = filterObj?.[filterName];

      const minIndex = filterValues?.[0];
      const maxIndex = filterValues?.[1];

      const minValue =
        filterData.find((_, i) => i === minIndex)?.value ??
        filterData[0]?.value;

      const maxValue =
        filterData.find((_, i) => i === maxIndex - 1)?.value ??
        filterData[filterData.length - 2]?.value;

      return {
        min: minValue,
        max: maxValue,
      };
    };

    return {
      shape: filterObj?.shape || initialFilteredData?.shape,
      price: filterObj?.price || initialFilteredData?.price,
      weight: filterObj?.weight || initialFilteredData?.weight,
      depth_percentage:
        filterObj?.depth_percentage || initialFilteredData?.depth_percentage,
      table_percentage:
        filterObj?.table_percentage || initialFilteredData?.table_percentage,

      color: getMinMaxObj(COLOR),
      lab: getMinMaxObj(LAB),
      cut: getMinMaxObj(CUT),
      fancy_color: getMinMaxObj(FANCY_COLOR),
      clarity: getMinMaxObj(CLARITY),
      fluorescence: getMinMaxObj(FLUORESCENCE_INTENSITY),
      polish: getMinMaxObj(POLISH),
      symmetry: getMinMaxObj(SYMMETRY),
    };
  }

  const handleAfterChangeSlider = (
    key: string,
    e: number[] | number | undefined,
    isRange: boolean
  ) => {
    if (isRange && Array.isArray(e)) {
      const Range = data(key).slice(e[0], e[1]).map(opt => opt.value);
      setNewFilteredValue((prev: any) => ({
        ...prev,
        [key]: Range,
      }));
    } else {
    setNewFilteredValue((prev: any) => ({
      ...prev,
      [key]: e,
    }));
  }
  };

  const handleChangeSlider = (
    key: string,
    e: number[] | number | undefined,
    isRange: boolean
  ) => {
    if (isRange && Array.isArray(e)) {
      const Range = data(key).slice(e[0], e[1]).map(opt => opt.value);
      setNewFilteredValue((prev: any) => ({
        ...prev,
        [key]: Range,
      }));
    } else {
    if (Array.isArray(e)) {
      let [newMin, newMax] = e;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];

      setNewFilteredValue((prev: any) => ({
        ...prev,
        [key]: [newMin, newMax],
      }));
    }
  }
};

  const handleResetFilter = () => {
    handleNewFilteredValue();
  };

  const handleAddFilter = () => {
    setIsModelOpen(true);
    setModelFilteredValue(getFilterModelObj(newFilteredValue));
  };

  const handleHideBtn = () => {
    setIsFilterHide(!isFilterHide);
  };

  const getIndexRange = (options: any[], min: string, max: string): [number, number] => {
    const minIndex = options?.findIndex(opt => opt.value === min);
    const maxIndex = options?.findIndex(opt => opt.value === max)+1;
  
    if (minIndex === -1 || maxIndex === -1) return [0, 0]; // fallback if not found
  
    return [Math.min(minIndex, maxIndex), Math.max(minIndex, maxIndex)];
  };

  const handleApplyFilterInModel = useCallback(() => {
    const minColor = _.findIndex(data(COLOR), {
      value: modelFilteredValue?.[COLOR]?.min,
    });
    const maxColor =
      _.findIndex(data(COLOR), {
        value: modelFilteredValue?.[COLOR]?.max,
      }) + 1;
    const minFancyColor = _.findIndex(data(FANCY_COLOR), {
      value: modelFilteredValue?.[FANCY_COLOR]?.min,
    });
    const maxFancyColor =
      _.findIndex(data(FANCY_COLOR), {
        value: modelFilteredValue?.[FANCY_COLOR]?.max,
      }) + 1;
    const minClarity = _.findIndex(data(CLARITY), {
      value: modelFilteredValue?.[CLARITY]?.min,
    });
    const maxClarity =
      _.findIndex(data(CLARITY), {
        value: modelFilteredValue?.[CLARITY]?.max,
      }) + 1;
    const minPolish = _.findIndex(data(POLISH), {
      value: modelFilteredValue?.[POLISH]?.min,
    });
    const maxPolish =
      _.findIndex(data(POLISH), {
        value: modelFilteredValue?.[POLISH]?.max,
      }) + 1;
    const minSymmetry = _.findIndex(data(SYMMETRY), {
      value: modelFilteredValue?.[SYMMETRY]?.min,
    });
    const maxSymmetry =
      _.findIndex(data(SYMMETRY), {
        value: modelFilteredValue?.[SYMMETRY]?.max,
      }) + 1;
    const minFluorescenceIntensity = _.findIndex(data(FLUORESCENCE_INTENSITY), {
      value: modelFilteredValue?.[FLUORESCENCE_INTENSITY]?.min,
    });
    const maxFluorescenceIntensity =
      _.findIndex(data(FLUORESCENCE_INTENSITY), {
        value: modelFilteredValue?.[FLUORESCENCE_INTENSITY]?.max,
      }) + 1;
    const minLab = _.findIndex(data(LAB), {
      value: modelFilteredValue?.[LAB]?.min,
    });
    const maxLab =
      _.findIndex(data(LAB), {
        value: modelFilteredValue?.[LAB]?.max,
      }) + 1;
    setFilteredData({
      ...filteredData,
      shape: modelFilteredValue?.shape,
      price: modelFilteredValue?.price,
      weight: modelFilteredValue?.weight,
      depth_percentage: modelFilteredValue?.depth_percentage,
      table_percentage: modelFilteredValue?.table_percentage,

      color: [minColor, maxColor],
      lab: [minLab, maxLab],
      fancy_color: [minFancyColor, maxFancyColor],
      clarity: [minClarity, maxClarity],
      fluorescence: [minFluorescenceIntensity, maxFluorescenceIntensity],
      polish: [minPolish, maxPolish],
      symmetry: [minSymmetry, maxSymmetry],
    });

    setIsModelOpen(false);
    setApplyFilter(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredData, initialFilteredData, modelFilteredValue]);

  const handleClickedCerti = (certificate: string) => {
    setNewFilteredValue((prev: any) => ({
      ...prev,
      certificates: certificate,
    }));
  };

  const disableResetBtn = useMemo(
    () => _.isEqual(initialFilteredValueRef.current, newFilteredValue),
    [newFilteredValue]
  );
  const isMinMaxAttribute = (
    attr: string
  ): attr is keyof typeof minMaxAttributes => attr in minMaxAttributes;

  return (
    <div className="py-6 xl:py-8 px-3" id="scroll-filter-section">
      <div className="p-2 flex flex-col justify-between gap-6 rounded-lg border items-center border-[var(--filter-border-color)] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
        <div className="w-full h-full flex flex-wrap flex-col md:flex-row justify-center xl:justify-between gap-6 items-center relative">
          <div className="md:w-auto w-full h-full rounded-lg bg-[var(--theme-filter-color)] p-2 flex gap-x-2 items-start">
            <button
              className={`px-8 py-2 rounded-lg h-full focus:bg-[var(--dark-theme-color)] hover:bg-[var(--dark-theme-color)] w-1/2 md:w-40 flex justify-center items-center ${
                globalFilterData.colorType === MINED
                  ? "bg-[var(--dark-theme-color)]"
                  : ""
              }`}
              onClick={() => {
                if (globalFilterData.colorType !== MINED)
                  setGlobalFilterData((prev) => ({
                    colorType: MINED,
                    dimondCreatedBy: prev.dimondCreatedBy,
                  }));
              }}
            >
              {MINED_TITLE}
            </button>
            <button
              className={`px-8 py-2 rounded-lg w-1/2 focus:bg-[var(--dark-theme-color)] hover:bg-[var(--dark-theme-color)] whitespace-nowrap md:w-40 flex justify-center items-center ${
                globalFilterData.colorType === FANCY_COLOR
                  ? "bg-[var(--dark-theme-color)]"
                  : ""
              }`}
              onClick={() => {
                if (globalFilterData.colorType !== FANCY_COLOR)
                  setGlobalFilterData((prev) => ({
                    colorType: FANCY_COLOR,
                    dimondCreatedBy: prev.dimondCreatedBy,
                  }));
              }}
            >
              {FANCY_COLOR_TITLE}
            </button>
          </div>
          <div className="md:w-auto w-full h-full rounded-lg bg-[var(--theme-filter-color)] p-2 flex gap-x-2 items-start">
            <button className="px-8 py-2 rounded-lg whitespace-nowrap bg-[var(--dark-theme-color)] focus:bg-[var(--dark-theme-color)] hover:bg-[var(--dark-theme-color)] w-1/2 flex justify-center items-center">
              Earth Created
            </button>
            <button className="px-[30px] py-2 rounded-lg w-1/2 whitespace-nowrap focus:bg-[var(--dark-theme-color)] hover:bg-[var(--dark-theme-color)] flex justify-center items-center">
              Lab Created
            </button>
          </div>
          <div className="items-center hidden lg:flex gap-x-6">
            <button
              className={`px-6 py-[14px] rounded-lg border hover:bg-[var(--funnel-theme-color)] border-[var(--theme-alter-color)] focus:bg-[var(--funnel-theme-color)] flex items-center gap-x-2
              ${disableResetBtn && "disabled:opacity-50 "}
              `}
              onClick={handleResetFilter}
              disabled={disableResetBtn}
            >
              <EditUndoIcon isDarkMode={isDarkMode} />
              <span>Reset Filter</span>
            </button>
            <button
              className={`px-6 py-[14px] rounded-lg border hover:bg-[var(--funnel-theme-color)] border-[var(--theme-alter-color)] focus:bg-[var(--funnel-theme-color)] flex items-center gap-x-2 w-44`}
              onClick={handleHideBtn}
            >
              {isFilterHide ? (
                <>
                  <EditShowIcon isDarkMode={isDarkMode} />
                  <span>Show Filters</span>
                </>
              ) : (
                <>
                  <EditHideIcon isDarkMode={isDarkMode} />
                  <span>Hide Filters</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="lg:hidden block">
          <button
            aria-label="add filters"
            onClick={handleAddFilter}
            className="px-4 lg:px-10 py-3 lg:py-4 w-[156px] rounded-lg border hover:bg-[var(--funnel-theme-color)] border-[var(--theme-alter-color)] focus:bg-[var(--funnel-theme-color)] flex items-center justify-center gap-x-2"
          >
            Add Filter
          </button>
        </div>
      </div>
      <Transition
        show={!isFilterHide}
        // className="transition-all duration-500 ease-in-out overflow-hidden"
        enterFrom="transform max-h-0"
        enterTo="transform max-h-[9999px]"
        leaveFrom="transform max-h-[9999px]"
        leaveTo="transform max-h-0"
      >
        <div className="py-6 hidden lg:block">
          {/* /////////////////////////////////////////////// START */}
          <div className="flex flex-col gap-y-4 items-start w-full relative flex-[0_0_auto]">
            {/* Rest of the filters in grid layout */}
            <div className="grid grid-cols-1 gap-x-6 w-full gap-y-6">
              {[...newFilterData]
                .filter(
                  (a) =>
                    (a as { attribute_code: string }).attribute_code === "shape"
                )
                .map((item: any, index: number) => (
                  <div key={index + item.label}>
                    <Shape
                      newFilteredValue={newFilteredValue}
                      setNewFilteredValue={setNewFilteredValue}
                      item={item}
                    />
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-6 w-full gap-y-6">
              {[...newFilterData]
                .filter(
                  (item: any) =>
                    item.attribute_code !== "shape" &&
                    !item.isAdvance &&
                    item.attribute_code !==
                      (globalFilterData.colorType === "mined"
                        ? "fancy_color"
                        : "color")
                )
                .sort((a, b) =>
                  (a as { attribute_code: string }).attribute_code ===
                  "certificates"
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
                                {item.tooltip && <Tooltip content={item.tooltip} placement="top">
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
                                newFilteredValue?.[attr]?.[0] ??
                                  Number(item.min),
                                newFilteredValue?.[attr]?.[1] ??
                                  Number(item.max),
                              ]}
                              onChange={([min, max]) =>
                                setNewFilteredValue((prev: any) => ({
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
                                step={Number(item?.max)-Number(item?.min) < 20 ? 0.01 : Number(item?.max)-Number(item?.min) < 100 ? 0.1 : 0}
                                onChangeComplete={(e) =>
                                  handleAfterChangeSlider(attr, e, !isNumber(newFilteredValue?.[attr]?.[0]))
                                }
                                onChange={(e) => handleChangeSlider(attr, e, !isNumber(newFilteredValue?.[attr]?.[0]))}
                                defaultValue={item.options}
                                value={!isNumber(newFilteredValue?.[attr]?.[0]) ? 
                                  getIndexRange(
                                    item.options,
                                    newFilteredValue?.[attr]?.[0],
                                    newFilteredValue?.[attr]?.[newFilteredValue?.[attr]?.length-1]) : newFilteredValue?.[attr]}
                                allowCross={false}
                                pushable
                                ariaLabelForHandle={attr}
                              />
                            </div>
                          ) : attr === "certificates" ? (
                            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
                              <div className="flex flex-wrap items-start justify-between content-start gap-6 flex-[0_0_auto]">
                                {item?.options?.map(
                                  (option: any, i: number) => (
                                    <div
                                      key={i}
                                      onClick={() =>
                                        handleClickedCerti(option?.value)
                                      }
                                      className="cursor-pointer w-1/4 h-full py-3 flex justify-center bg-[var(--dark-theme-color)] rounded-lg border border-solid border-[var(--filter-border-color)]"
                                    >
                                      <div className="relative w-fit [font-family:'Poppins-Regular',Helvetica] font-normal text-[var(--theme-alter-color)] text-[16.1px] tracking-[0] leading-[normal]">
                                        {option?.label}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* /////////////////////////////////////////////// END */}
          <div className="w-full flex items-center gap-6 p-4 relative flex-[0_0_auto] bg-[var(--theme-color)]">
            <div className="relative w-full h-[2px] bg-[var(--bg-blank)]" />
            <button
              onClick={() => setIsAdvancedAllow(!isAdvancedAllow)}
              className="flex items-center gap-2 px-6 py-4 relative flex-[0_0_auto] rounded-lg border border-solid border-[var(--theme-alter-color)]"
            >
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                Advanced Filter
              </div>
              <span
                className={`!relative !w-[24px] !h-[24px] transform transition-transform ${
                  isAdvancedAllow ? "rotate-0" : "rotate-180"
                } ease-in-out duration-300`}
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
            <div>
              <AdvancedFilteres
                setFilteredData={setFilteredData}
                newFilteredValue={newFilteredValue}
                setNewFilteredValue={setNewFilteredValue}
                globalFilterData={globalFilterData}
                minMaxAttributes={minMaxAttributes}
                isMinMaxAttribute={isMinMaxAttribute}
                handleClickedCerti={handleClickedCerti}
                handleChangeSlider={handleChangeSlider}
                handleAfterChangeSlider={handleAfterChangeSlider}
                newFilterData={newFilterData}
                getIndexRange={getIndexRange}
              />
            </div>
          </Transition>
        </div>
      </Transition>

      {isModelOpen && (
        <ModalOverlay
          setOpen={setIsModelOpen}
          open={isModelOpen}
          setFilteredData={setFilteredData}
          maxWidth="w-[90%] sm:w-[35rem] md:w-[50rem] block lg:hidden"
        >
          <FilterModel
            setOpen={setIsModelOpen}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            handleResetFilterMain={handleResetFilter}
            handleApplyFilter={handleApplyFilterInModel}
            modelFilteredValue={modelFilteredValue}
            setModelFilteredValue={setModelFilteredValue}
            disableResetBtn={disableResetBtn}
            filteredDataBackUp={filteredDataBackUp}
            getFilterModelObj={getFilterModelObj}
            globalFilterData={globalFilterData}
          />
        </ModalOverlay>
      )}
    </div>
  );
};

export default FilterListSection;
