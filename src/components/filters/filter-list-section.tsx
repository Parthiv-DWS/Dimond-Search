import { FC, useCallback, useMemo, useState } from "react";
import Slider from "rc-slider";
import _ from "lodash";
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
import MinMaxInput from "./MinMaxInput";

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
    rapnet_price: [
      filteredData?.price?.minPrice ||
        initialFilteredData?.price?.minPrice ||
        0,
      filteredData?.price?.maxPrice ||
        initialFilteredData?.price?.maxPrice ||
        0,
    ],
    weight: [
      filteredData?.weight?.minWeight ||
        initialFilteredData?.weight?.minWeight ||
        0,
      filteredData?.weight?.maxWeight ||
        initialFilteredData?.weight?.maxWeight ||
        0,
    ],
    table_percentage: [
      filteredData?.table_percentage?.minTable ||
        initialFilteredData?.table_percentage?.minTable ||
        0,
      filteredData?.table_percentage?.maxTable ||
        initialFilteredData?.table_percentage?.maxTable ||
        0,
    ],

    depth_percentage: [
      filteredData?.depth_percentage?.minDepth ||
        initialFilteredData?.depth_percentage?.minDepth ||
        0,
      filteredData?.depth_percentage?.maxDepth ||
        initialFilteredData?.depth_percentage?.maxDepth ||
        0,
    ],
    color: filteredData?.color || initialFilteredData?.color,
    lab: filteredData?.lab || initialFilteredData?.lab,
    cut: filteredData?.cut || initialFilteredData?.cut,

    fancy_color: filteredData?.fancy_color || initialFilteredData?.fancy_color,

    clarity: filteredData?.clarity || initialFilteredData?.clarity,

    fluorescence: filteredData?.[FLUORESCENCE_INTENSITY] || [
      0,
      diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
        ? Object.keys(diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options)
            .length - 1
        : 0,
    ],

    polish: filteredData?.polish || initialFilteredData?.polish,

    symmetry: filteredData?.symmetry || [
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
        rapnet_price: [
          Number(diamondFilterData?.rapnet_price?.min),
          Number(diamondFilterData?.rapnet_price?.max),
        ],
        weight: [
          Number(diamondFilterData?.weight?.min),
          Number(diamondFilterData?.weight?.max),
        ],
        depth_percentage: [
          parseFloat(diamondFilterData?.depth_percentage?.min),
          parseFloat(diamondFilterData?.depth_percentage?.max),
        ],
        table_percentage: [
          parseFloat(diamondFilterData?.table_percentage?.min),
          parseFloat(diamondFilterData?.table_percentage?.max),
        ],

        color: filteredDataBackUp?.color || initialFilteredData?.color,
        cut: filteredDataBackUp?.cut || initialFilteredData?.cut,
        lab: filteredDataBackUp?.lab || initialFilteredData?.lab,

        fancy_color:
          filteredDataBackUp?.fancy_color || initialFilteredData?.fancy_color,

        clarity: filteredDataBackUp?.clarity || initialFilteredData?.clarity,

        fluorescence: filteredDataBackUp?.fluorescence || [
          0,
          diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
            ? Object.keys(diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options)
                .length - 1
            : 0,
        ],

        polish: filteredDataBackUp?.polish || initialFilteredData?.polish,

        symmetry: filteredDataBackUp?.symmetry || [
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
    filteredDataBackUp?.lab,
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

    setFilteredValue({
      price: modelFilteredValue?.price,
      rapnet_price: [
        modelFilteredValue?.price?.minPrice ||
          initialFilteredData?.price?.minPrice ||
          0,
        modelFilteredValue?.price?.maxPrice ||
          initialFilteredData?.price?.maxPrice ||
          0,
      ],
      weight: [
        modelFilteredValue?.weight?.minWeight ||
          initialFilteredData?.weight?.minWeight ||
          0,
        modelFilteredValue?.weight?.maxWeight ||
          initialFilteredData?.weight?.maxWeight ||
          0,
      ],
      depth_percentage: [
        modelFilteredValue?.depth_percentage?.minDepth || 0,
        modelFilteredValue?.depth_percentage?.maxDepth || 0,
      ],
      table_percentage: [
        modelFilteredValue?.table_percentage?.minTable ||
          initialFilteredData?.table_percentage?.minTable ||
          0,
        modelFilteredValue?.table_percentage?.minTable ||
          initialFilteredData?.table_percentage?.minTable ||
          0,
      ],

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

  const disableResetBtn = useMemo(
    () => _.isEqual(filteredDataBackUp, filteredData),
    [filteredData, filteredDataBackUp]
  );

  const dynamicDiamondFilterData = Object.values(diamondFilterData);

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
            <div className="grid grid-cols-2 gap-6 w-full gap-y-6">
              {[...dynamicDiamondFilterData]
                .filter(
                  (item: any) =>
                    item.attribute_code !== "shape" && !item.isAdvance &&
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
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                filteredValue={filteredValue}
                setFilteredValue={setFilteredValue}
                globalFilterData={globalFilterData}
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
