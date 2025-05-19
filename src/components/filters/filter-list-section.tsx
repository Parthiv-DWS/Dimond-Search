import { FC, useCallback, useMemo, useState } from "react";
import Slider from "rc-slider";
import _ from "lodash";
import { Transition } from "@headlessui/react";
import Shape from "./shape";
import Price from "./price";
import Carat from "./carat";
import {
  CLARITY,
  CLARITY_TITLE,
  COLOR,
  COLOR_TITLE,
  FANCY_COLOR,
  FANCY_COLOR_TITLE,
  FLUORESCENCE_INTENSITY,
  MINED,
  MINED_TITLE,
  POLISH,
  SLIDER_CLARITY,
  SLIDER_COLOR,
  SLIDER_FANCY_COLOR,
  SYMMETRY,
} from "../../constants";
import { getInitialFilteredData } from "../../utility/utils";
import {
  FilterGlobalType,
  FilteredValueType,
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
import { getFilteredObjFromDiamondFilterData } from "../../services/getFilteredObjFromDiamondFilterData";
import EditHideIcon from "../../assets/custom-icons/EditHideIcon";

const FilterListSection: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filteredDataBackUp: FilterGlobalType;
  globalFilterData: GlobalFilterType;
  setGlobalFilterData: React.Dispatch<React.SetStateAction<GlobalFilterType>>;
}> = ({
  filteredData,
  setFilteredData,
  isModelOpen,
  setIsModelOpen,
  setApplyFilter,
  filteredDataBackUp,
  globalFilterData,
  setGlobalFilterData,
}) => {
  const initialFilteredData = getInitialFilteredData();
  const { isDarkMode, diamondFilterData } = useModeStore((state) => state);

  const [filteredValue, setFilteredValue] = useState<FilteredValueType>({
    price: filteredData?.price || initialFilteredData.price,
    sliderPriceValue: [
      filteredData?.price?.minPrice ||
        initialFilteredData?.price?.minPrice ||
        0,
      filteredData?.price?.maxPrice ||
        initialFilteredData?.price?.maxPrice ||
        0,
    ],

    carat: filteredData?.carat || initialFilteredData?.carat,
    sliderCaratValue: [
      filteredData?.carat?.minCarat ||
        initialFilteredData?.carat?.minCarat ||
        0,
      filteredData?.carat?.maxCarat ||
        initialFilteredData?.carat?.maxCarat ||
        0,
    ],

    depth_percentage: filteredData?.depth_percentage,
    sliderDepthValue: [
      parseFloat(diamondFilterData?.depth_percentage?.min),
      parseFloat(diamondFilterData?.depth_percentage?.max),
    ],

    table_percentage: filteredData?.table_percentage,
    sliderTableValue: [
      parseFloat(diamondFilterData?.table_percentage?.min),
      parseFloat(diamondFilterData?.table_percentage?.max),
    ],

    sliderColorValue: filteredData?.color || initialFilteredData?.color,

    sliderFancyColorValue:
      filteredData?.fancy_color || initialFilteredData?.fancy_color,

    sliderClarityValue: filteredData?.clarity || initialFilteredData?.clarity,

    sliderFluorescenceValue: filteredData?.[FLUORESCENCE_INTENSITY] || [
      0,
      diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
        ? Object.keys(diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options)
            .length - 1
        : 0,
    ],

    sliderPolishValue: filteredData?.polish || initialFilteredData?.polish,

    sliderSymmetryValue: filteredData?.symmetry || [
      0,
      diamondFilterData?.symmetry?.options
        ? Object.keys(diamondFilterData?.symmetry?.options).length - 1
        : 0,
    ],
  });

  const data = (filterName: string) => diamondFilterData[filterName]?.options;

  const [modelFilteredValue, setModelFilteredValue] =
    useState<ModelFilteredValueType>(getFilterModelObj(filteredData));

  const [isAdvancedAllow, setIsAdvancedAllow] = useState<boolean>(false);
  const [isFilterHide, setIsFilterHide] = useState<boolean>(false);

  function getFilterModelObj(
    filterObj: FilterGlobalType
  ): ModelFilteredValueType {
    const getMinMaxObj = (filterName: string) => ({
      min:
        data(filterName)?.find(
          (index: number) =>
            filterObj?.[filterName]?.[0] &&
            index === filterObj?.[filterName]?.[0]
        )?.value || data(filterName)?.[0]?.value,
      max:
        data(filterName)?.find(
          (index: number) =>
            filterObj?.[filterName]?.[1] &&
            index === filterObj?.[filterName]?.[1] - 1
        )?.value || data(filterName)[data(filterName)?.length - 2]?.value,
    });

    return {
      shape: filterObj?.shape || initialFilteredData?.shape,
      price: filterObj?.price || initialFilteredData?.price,
      carat: filterObj?.carat || initialFilteredData.carat,
      depth_percentage: filterObj?.depth_percentage,
      table_percentage: filterObj?.table_percentage,

      color: getMinMaxObj(COLOR),
      fancy_color: getMinMaxObj(FANCY_COLOR),
      clarity: getMinMaxObj(CLARITY),
      fluorescence: getMinMaxObj(FLUORESCENCE_INTENSITY),
      polish: getMinMaxObj(POLISH),
      symmetry: getMinMaxObj(SYMMETRY),
    };
  }

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

  const handleResetFilter = useCallback(() => {
    const allData = getFilteredObjFromDiamondFilterData(diamondFilterData);

    if (allData.data) {
      setFilteredData({
        ...initialFilteredData,
        ...allData.data,
      });

      setFilteredValue({
        price: {
          minPrice: Number(diamondFilterData?.rapnet_price?.min),
          maxPrice: Number(diamondFilterData?.rapnet_price?.max),
        },
        sliderPriceValue: [
          Number(diamondFilterData?.rapnet_price?.min),
          Number(diamondFilterData?.rapnet_price?.max),
        ],
        carat: {
          minCarat: Number(diamondFilterData?.size?.min),
          maxCarat: Number(diamondFilterData?.size?.max),
        },
        sliderCaratValue: [
          Number(diamondFilterData?.size?.min),
          Number(diamondFilterData?.size?.max),
        ],
        depth_percentage: {
          minDepth: parseFloat(diamondFilterData?.depth_percentage?.min),
          maxDepth: parseFloat(diamondFilterData?.depth_percentage?.max),
        },
        sliderDepthValue: [
          parseFloat(diamondFilterData?.depth_percentage?.min),
          parseFloat(diamondFilterData?.depth_percentage?.max),
        ],
        table_percentage: {
          minTable: parseFloat(diamondFilterData?.table_percentage?.min),
          maxTable: parseFloat(diamondFilterData?.table_percentage?.max),
        },
        sliderTableValue: [
          parseFloat(diamondFilterData?.table_percentage?.min),
          parseFloat(diamondFilterData?.table_percentage?.max),
        ],

        sliderColorValue:
          filteredDataBackUp?.color || initialFilteredData?.color,

        sliderFancyColorValue:
          filteredDataBackUp?.fancy_color || initialFilteredData?.fancy_color,

        sliderClarityValue:
          filteredDataBackUp?.clarity || initialFilteredData?.clarity,

        sliderFluorescenceValue: filteredDataBackUp?.fluorescence || [
          0,
          diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
            ? Object.keys(diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options)
                .length - 1
            : 0,
        ],

        sliderPolishValue:
          filteredDataBackUp?.polish || initialFilteredData?.polish,

        sliderSymmetryValue: filteredDataBackUp?.symmetry || [
          0,
          diamondFilterData?.symmetry?.options
            ? Object.keys(diamondFilterData?.symmetry?.options).length - 1
            : 0,
        ],
      });

      // here we are not reseting Certificates
    } else {
      console.error("Error in resetting filter");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    diamondFilterData,
    filteredDataBackUp?.clarity,
    filteredDataBackUp?.color,
    filteredDataBackUp?.fancy_color,
    filteredDataBackUp?.[FLUORESCENCE_INTENSITY],
    filteredDataBackUp?.polish,
    filteredDataBackUp?.symmetry,
    initialFilteredData,
  ]);

  const handleAddFilter = () => {
    setIsModelOpen(true);
    setModelFilteredValue(getFilterModelObj(filteredData));
  };

  const handleHideBtn = () => {
    setIsFilterHide(!isFilterHide);
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

    setFilteredData({
      ...filteredData,
      shape: modelFilteredValue?.shape,
      price: modelFilteredValue?.price,
      carat: modelFilteredValue?.carat,
      depth_percentage: modelFilteredValue?.depth_percentage,
      table_percentage: modelFilteredValue?.table_percentage,

      color: [minColor, maxColor],
      fancy_color: [minFancyColor, maxFancyColor],
      clarity: [minClarity, maxClarity],
      fluorescence: [minFluorescenceIntensity, maxFluorescenceIntensity],
      polish: [minPolish, maxPolish],
      symmetry: [minSymmetry, maxSymmetry],
    });

    setFilteredValue({
      price: modelFilteredValue?.price,
      sliderPriceValue: [
        modelFilteredValue?.price?.minPrice ||
          initialFilteredData?.price?.minPrice ||
          0,
        modelFilteredValue?.price?.maxPrice ||
          initialFilteredData?.price?.maxPrice ||
          0,
      ],
      carat: modelFilteredValue?.carat,
      sliderCaratValue: [
        modelFilteredValue?.carat?.minCarat ||
          initialFilteredData?.carat?.minCarat ||
          0,
        modelFilteredValue?.carat?.maxCarat ||
          initialFilteredData?.carat?.maxCarat ||
          0,
      ],
      depth_percentage: modelFilteredValue?.depth_percentage,
      sliderDepthValue: [
        modelFilteredValue?.depth_percentage?.minDepth || 0,
        modelFilteredValue?.depth_percentage?.maxDepth || 0,
      ],
      table_percentage: modelFilteredValue?.table_percentage,
      sliderTableValue: [
        modelFilteredValue?.table_percentage?.minTable || 0,
        modelFilteredValue?.table_percentage?.maxTable || 0,
      ],

      sliderColorValue: [minColor, maxColor],

      sliderFancyColorValue: [minFancyColor, maxFancyColor],

      sliderClarityValue: [minClarity, maxClarity],

      sliderFluorescenceValue: [
        minFluorescenceIntensity,
        maxFluorescenceIntensity,
      ],

      sliderPolishValue: [minPolish, maxPolish],

      sliderSymmetryValue: [minSymmetry, maxSymmetry],
    });

    setIsModelOpen(false);
    setApplyFilter(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredData, initialFilteredData, modelFilteredValue]);

  const disableResetBtn = useMemo(
    () => _.isEqual(filteredDataBackUp, filteredData),
    [filteredData, filteredDataBackUp]
  );

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
          <div className="flex flex-col gap-y-4 items-start w-full relative flex-[0_0_auto]">
            <div className="grid grid-cols-2 gap-x-6">
              <Shape
                filteredData={filteredData}
                setFilteredData={setFilteredData}
              />
              <div className="w-full inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
                <Price
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  price={filteredValue?.price}
                  sliderPriceValue={filteredValue?.sliderPriceValue || [0, 0]}
                  setFilteredValue={setFilteredValue}
                />
                {Number(filteredData?.carat?.maxCarat) > 0 && Number(filteredData?.carat?.minCarat) >= 0 ? <Carat
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  carat={filteredValue?.carat}
                  sliderCaratValue={filteredValue?.sliderCaratValue || [0, 0]}
                  setFilteredValue={setFilteredValue}
                /> : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 w-full">
              <div className="w-full flex flex-col items-start gap-2 p-4 relative bg-[var(--theme-filter-color)] rounded-lg">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto] mr-[-16.00px] w-full">
                  {globalFilterData.colorType === MINED ? (
                    <>
                      <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                          {COLOR_TITLE}
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-8 items-start justify-end relative flex-[0_0_auto]">
                        <Slider
                          range
                          min={0}
                          max={
                            diamondFilterData?.color?.options
                              ? Object.keys(diamondFilterData?.color?.options)
                                  .length - 1
                              : 0
                          }
                          marks={FilterSliderData(
                            diamondFilterData.color.options,
                            "5.5%"
                          )}
                          step={null}
                          onChangeComplete={(e) =>
                            (e[0] !== filteredData.color?.[0] ||
                              e[1] !== filteredData.color?.[1]) &&
                            handleAfterChangeSlider(COLOR, e)
                          }
                          onChange={(e) => handleChangeSlider(SLIDER_COLOR, e)}
                          defaultValue={filteredValue?.sliderColorValue}
                          value={filteredValue?.sliderColorValue}
                          allowCross={false}
                          pushable
                          ariaLabelForHandle={COLOR}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                          {FANCY_COLOR_TITLE}
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-8 items-start justify-end relative flex-[0_0_auto]">
                        <Slider
                          range
                          min={0}
                          max={
                            diamondFilterData?.fancy_color?.options
                              ? Object.keys(
                                  diamondFilterData?.fancy_color?.options
                                ).length - 1
                              : 0
                          }
                          marks={FilterSliderData(
                            diamondFilterData.fancy_color.options,
                            "5.5%"
                          )}
                          step={null}
                          onChangeComplete={(e) =>
                            (e[0] !== filteredData?.fancy_color?.[0] ||
                              e[1] !== filteredData?.fancy_color?.[1]) &&
                            handleAfterChangeSlider(FANCY_COLOR, e)
                          }
                          onChange={(e) =>
                            handleChangeSlider(SLIDER_FANCY_COLOR, e)
                          }
                          defaultValue={filteredValue?.sliderFancyColorValue}
                          value={filteredValue?.sliderFancyColorValue}
                          allowCross={false}
                          pushable
                          ariaLabelForHandle={FANCY_COLOR}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-2 p-4 relative bg-[var(--theme-filter-color)] rounded-lg">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto] mr-[-16.00px] w-full">
                  <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      {CLARITY_TITLE}
                    </div>
                  </div>
                  <div className="w-full flex flex-col h-8 items-start justify-end relative flex-[0_0_auto]">
                    <Slider
                      range
                      min={0}
                      max={
                        diamondFilterData?.clarity?.options
                          ? Object.keys(diamondFilterData?.clarity?.options)
                              .length - 1
                          : 0
                      }
                      marks={FilterSliderData(
                        diamondFilterData.clarity.options,
                        "3%"
                      )}
                      step={null}
                      onChangeComplete={(e) =>
                        (e[0] !== filteredData.clarity?.[0] ||
                          e[1] !== filteredData.clarity?.[1]) &&
                        handleAfterChangeSlider(CLARITY, e)
                      }
                      onChange={(e) => handleChangeSlider(SLIDER_CLARITY, e)}
                      defaultValue={filteredValue?.sliderClarityValue}
                      value={filteredValue?.sliderClarityValue}
                      allowCross={false}
                      pushable
                      ariaLabelForHandle={CLARITY}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              depth={filteredValue?.depth_percentage}
              sliderDepthValue={filteredValue?.sliderDepthValue || [0, 0]}
              table={filteredValue?.table_percentage}
              sliderTableValue={filteredValue?.sliderTableValue || [0, 0]}
              filteredValue={filteredValue}
              setFilteredValue={setFilteredValue}
            /></div>
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
