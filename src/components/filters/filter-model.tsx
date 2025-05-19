import { FC, useMemo, useState, useEffect, JSX } from "react";
import { Transition } from "@headlessui/react";
import _ from "lodash";
import EditUndoIcon from "../../assets/custom-icons/EditUndoIcon";
import { useModeStore } from "../../store/theme-mode/store";
import ChevroUpIcon from "../../assets/custom-icons/ChevroUpIcon";
import Accordion from "../accordion";
import {
  CARAT_TITLE,
  CERTIFICATES_TITLE,
  CLARITY,
  CLARITY_TITLE,
  COLOR,
  COLOR_TITLE,
  DEPTH_TITLE,
  FLUORESCENCE_TITLE,
  FLUORESCENCE_INTENSITY,
  POLISH,
  POLISH_TITLE,
  PRICE_TITLE,
  SHAPE_TITLE,
  SYMMETRY,
  SYMMETRY_TITLE,
  TABLE_TITLE,
  MINED,
  FANCY_COLOR_TITLE,
  FANCY_COLOR,
} from "../../constants";
import { getInitialFilteredData } from "../../utility/utils";
import {
  FilterGlobalType,
  GlobalFilterType,
  ModelFilteredValueType,
} from "../../types";
import Dropdown from "../dropdown";

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
  const initialFilteredData = getInitialFilteredData();

  const { isDarkMode, diamondFilterData } = useModeStore((state) => state);
  const data = (filterName: string) => diamondFilterData[filterName]?.options;
  const [isAdvancedAllow, setIsAdvancedAllow] = useState<boolean>(false);
  const [openShape, setOpenShape] = useState<boolean>(true);

  const [isDisabled, setIsDisabled] = useState({
    color: 0,
    clarity: 0,
    flourescence: 0,
    polish: 0,
    symmetry: 0,
  });

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

  const handleClickedShape = (value: string) => {
    if (modelFilteredValue?.shape?.some((shape) => shape === value)) {
      setModelFilteredValue((fd) => ({
        ...fd,
        shape: fd?.shape?.filter((shape) => shape !== value),
      }));
    } else {
      setModelFilteredValue((fd) => ({
        ...fd,
        shape: [...(fd?.shape || []), value],
      }));
    }
  };

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
          <div>
            <Accordion
              label={SHAPE_TITLE}
              controls={{
                open: openShape,
                setOpen: setOpenShape,
              }}
            >
              <div className="relative">
                <div
                  className={`transition-all duration-500  relative pt-3 pb-[2rem] flex flex-wrap gap-6 items-center justify-center `}
                  style={{
                    maxHeight: openShape ? "21.4rem" : "2000px",
                  }}
                >
                  {diamondFilterData?.shape?.options?.map(
                    (item: { label: string; value: string; image: string }) => (
                      <button
                        key={item?.value}
                        onClick={() => handleClickedShape(item.value)}
                        className={`relative flex hover:bg-[var(--dark-theme-color)] flex-col justify-center items-center w-[93px] h-[75px] rounded-lg overflow-hidden  ${
                          modelFilteredValue?.shape?.some(
                            (shape) => shape === item?.value
                          )
                            ? "bg-[var(--dark-theme-color)]"
                            : "border border-solid border-[var(--filter-border-color)]"
                        }`}
                      >
                        <img src={item?.image} alt="shape image" />
                        <div className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                          {item?.label}
                        </div>
                      </button>
                    )
                  )}
                </div>
                {diamondFilterData?.shape?.options?.length > 12 && (
                  <div
                    className={`transition-all duration-800 relative bg-[var(--theme-filter-color)] ${
                      openShape
                        ? !isDarkMode
                          ? "shadow-[0_0_30px_rgba(0,0,0,0.53)]"
                          : "shadow-[0_0_30px_rgba(255,255,255,0.53)]"
                        : ""
                    }`}
                    style={{
                      width: "100%",
                      position: "absolute",
                      bottom: "-5px",
                    }}
                  >
                    <button
                      type="button"
                      className="w-full mt-1 rounded hover:bg-gray-300"
                      onClick={() => setOpenShape(!openShape)}
                    >
                      <span
                        className={`flex justify-center transform transition-transform ${
                          openShape ? "rotate-180" : "rotate-0"
                        } ease-in-out duration-300`}
                      >
                        <ChevroUpIcon isDarkMode={isDarkMode} />
                      </span>
                    </button>
                  </div>
                )}
              </div>
              {/* </Transition> */}
            </Accordion>
          </div>
          <div className="flex gap-y-4 flex-col">
            <Accordion label={PRICE_TITLE}>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                  <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    <input
                      className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                      type="text"
                      aria-label="min-price"
                      value={modelFilteredValue?.price?.minPrice}
                      onChange={(e) => {
                        const inputText = e.target.value;
                        const minValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );
                        setModelFilteredValue((v) => ({
                          ...v,
                          price: {
                            minPrice: minValue,
                            maxPrice: v?.price?.maxPrice,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        const inputText = e.target.value;
                        const minValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        if (
                          minValue >=
                            Number(modelFilteredValue?.price?.maxPrice) ||
                          minValue <=
                            Number(diamondFilterData?.rapnet_price?.min)
                        ) {
                          setModelFilteredValue((v) => ({
                            ...v,
                            price: {
                              minPrice: Number(
                                diamondFilterData?.rapnet_price?.min
                              ),
                              maxPrice: v?.price?.maxPrice,
                            },
                          }));
                        } else {
                          setModelFilteredValue((v) => ({
                            ...v,
                            price: {
                              minPrice: minValue,
                              maxPrice: v?.price?.maxPrice,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                  <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] leading-[var(--paregraph-p3-medium-line-height)] tracking-[var(--paregraph-p3-medium-letter-spacing)] [font-style:var(--paregraph-p3-medium-font-style)] ">
                    <input
                      className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                      type="text"
                      aria-label="max-price"
                      value={modelFilteredValue?.price?.maxPrice}
                      onChange={(e) => {
                        const inputText = e.target.value;
                        const maxValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        setModelFilteredValue((v) => ({
                          ...v,
                          price: {
                            minPrice: v?.price?.minPrice,
                            maxPrice: maxValue,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        const inputText = e.target.value;
                        const maxValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        if (
                          maxValue <=
                            Number(modelFilteredValue?.price?.minPrice) ||
                          maxValue >=
                            Number(diamondFilterData?.rapnet_price?.max)
                        ) {
                          setModelFilteredValue((v) => ({
                            ...v,
                            price: {
                              minPrice: v?.price?.minPrice,
                              maxPrice: Number(
                                diamondFilterData?.rapnet_price?.max
                              ),
                            },
                          }));
                        } else {
                          setModelFilteredValue((v) => ({
                            ...v,
                            price: {
                              minPrice: v?.price?.minPrice,
                              maxPrice: maxValue,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion label={CARAT_TITLE}>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                  <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    <input
                      className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                      type="text"
                      aria-label="min-carat"
                      value={modelFilteredValue?.carat?.minCarat}
                      onChange={(e) => {
                        const inputText = e.target.value;
                        const minValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        setModelFilteredValue((v) => ({
                          ...v,
                          carat: {
                            minCarat: minValue,
                            maxCarat: v?.carat?.maxCarat,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        const inputText = e.target.value;
                        const minValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        if (
                          minValue >=
                            Number(modelFilteredValue?.carat?.maxCarat) ||
                          minValue <=
                            Number(initialFilteredData?.carat?.minCarat)
                        ) {
                          setModelFilteredValue((v) => ({
                            ...v,
                            carat: {
                              minCarat: Number(
                                initialFilteredData?.carat?.minCarat
                              ),
                              maxCarat: v?.carat?.maxCarat,
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                  <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] leading-[var(--paregraph-p3-medium-line-height)] tracking-[var(--paregraph-p3-medium-letter-spacing)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    <input
                      className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                      type="text"
                      aria-label="max-carat"
                      value={modelFilteredValue?.carat?.maxCarat}
                      onChange={(e) => {
                        const inputText = e.target.value;
                        const maxValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );
                        setModelFilteredValue((v) => ({
                          ...v,
                          carat: {
                            minCarat: v?.carat?.minCarat,
                            maxCarat: maxValue,
                          },
                        }));
                      }}
                      onBlur={(e) => {
                        const inputText = e.target.value;
                        const maxValue = Number(
                          inputText.replace(/[^0-9.]/g, "")
                        );

                        if (
                          maxValue <=
                            Number(modelFilteredValue?.carat?.minCarat) ||
                          maxValue >=
                            Number(initialFilteredData?.carat?.maxCarat)
                        ) {
                          setModelFilteredValue((v) => ({
                            ...v,
                            carat: {
                              minCarat: v?.carat?.minCarat,
                              maxCarat: Number(
                                initialFilteredData?.carat?.maxCarat
                              ),
                            },
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </Accordion>
            {globalFilterData?.colorType === MINED ? (
              <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                  >
                    <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      {COLOR_TITLE}
                    </span>
                  </button>
                </h2>
                <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                  <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                    <Dropdown
                      value={modelFilteredValue?.color?.min}
                      dataList={data(COLOR)?.filter(
                        (item: any) => item.value !== ""
                      )}
                      handleClickItem={(e) => handleClick(e, MIN, COLOR)}
                    />
                  </div>
                  <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    To
                  </span>
                  <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                    <Dropdown
                      value={modelFilteredValue?.color?.max}
                      dataList={data(COLOR)?.filter(
                        (item: any) => item.value !== ""
                      )}
                      handleClickItem={(e) => handleClick(e, MAX, COLOR)}
                      isDisabled={(item) => isHandleDisabled(item, COLOR)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                  >
                    <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      {FANCY_COLOR_TITLE}
                    </span>
                  </button>
                </h2>
                <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                  <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                    <Dropdown
                      value={modelFilteredValue?.fancy_color?.min}
                      dataList={data(FANCY_COLOR)?.filter(
                        (item: any) => item.value !== ""
                      )}
                      handleClickItem={(e) => handleClick(e, MIN, FANCY_COLOR)}
                    />
                  </div>
                  <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    To
                  </span>
                  <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                    <Dropdown
                      value={modelFilteredValue?.fancy_color?.max}
                      dataList={data(FANCY_COLOR)?.filter(
                        (item: any) => item.value !== ""
                      )}
                      handleClickItem={(e) => handleClick(e, MAX, FANCY_COLOR)}
                      isDisabled={(item) => isHandleDisabled(item, FANCY_COLOR)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {CLARITY_TITLE}
                  </span>
                </button>
              </h2>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.clarity?.min}
                    dataList={data(CLARITY)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MIN, CLARITY)}
                  />
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.clarity?.max}
                    dataList={data(CLARITY)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MAX, CLARITY)}
                    isDisabled={(item) => isHandleDisabled(item, CLARITY)}
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
            <div>
              <Accordion label={`${DEPTH_TITLE}(%)`}>
                <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                  <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                    <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      <input
                        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                        type="text"
                        aria-label="min-depth"
                        value={modelFilteredValue?.depth_percentage?.minDepth}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          const minValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );
                          setModelFilteredValue((v) => ({
                            ...v,
                            depth_percentage: {
                              minDepth: minValue,
                              maxDepth: v?.depth_percentage?.maxDepth,
                            },
                          }));
                        }}
                        onBlur={(e) => {
                          const inputText = e.target.value;
                          const minValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );

                          if (
                            minValue >=
                              Number(
                                modelFilteredValue?.depth_percentage?.maxDepth
                              ) ||
                            minValue <=
                              Number(diamondFilterData?.depth_percentage?.min)
                          ) {
                            setModelFilteredValue((v) => ({
                              ...v,
                              depth_percentage: {
                                minDepth: Number(
                                  diamondFilterData?.depth_percentage?.min
                                ),
                                maxDepth: v.depth_percentage?.maxDepth,
                              },
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    To
                  </span>
                  <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                    <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] leading-[var(--paregraph-p3-medium-line-height)] tracking-[var(--paregraph-p3-medium-letter-spacing)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      <input
                        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                        type="text"
                        aria-label="max-depth"
                        value={modelFilteredValue?.depth_percentage?.maxDepth}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          const maxValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );

                          setModelFilteredValue((v) => ({
                            ...v,
                            depth_percentage: {
                              minDepth: v?.depth_percentage?.minDepth,
                              maxDepth: maxValue,
                            },
                          }));
                        }}
                        onBlur={(e) => {
                          const inputText = e.target.value;
                          const maxValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );

                          if (
                            maxValue <=
                              Number(
                                modelFilteredValue?.depth_percentage?.minDepth
                              ) ||
                            maxValue >=
                              Number(diamondFilterData?.depth_percentage?.max)
                          ) {
                            setModelFilteredValue((v) => ({
                              ...v,
                              depth_percentage: {
                                minDepth: v?.depth_percentage?.minDepth,
                                maxDepth: Number(
                                  diamondFilterData?.depth_percentage?.max
                                ),
                              },
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
            <div>
              <Accordion label={`${TABLE_TITLE}(%)`}>
                <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                  <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                    <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      <input
                        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                        type="text"
                        aria-label="min-table"
                        value={`${modelFilteredValue?.table_percentage?.minTable}`}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          const minValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );
                          setModelFilteredValue((v) => ({
                            ...v,
                            table_percentage: {
                              minTable: minValue,
                              maxTable: v?.table_percentage?.maxTable,
                            },
                          }));
                        }}
                        onBlur={(e) => {
                          const inputText = e.target.value;
                          const minValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );

                          if (
                            minValue >=
                              Number(
                                modelFilteredValue?.table_percentage?.maxTable
                              ) ||
                            minValue <=
                              Number(diamondFilterData?.table_percentage?.min)
                          ) {
                            setModelFilteredValue((v) => ({
                              ...v,
                              table_percentage: {
                                minTable: Number(
                                  diamondFilterData?.table_percentage?.min
                                ),
                                maxTable: v?.table_percentage?.maxTable,
                              },
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    To
                  </span>
                  <div className="flex items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
                    <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] leading-[var(--paregraph-p3-medium-line-height)] tracking-[var(--paregraph-p3-medium-letter-spacing)] [font-style:var(--paregraph-p3-medium-font-style)]">
                      <input
                        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                        type="text"
                        aria-label="max-table"
                        value={modelFilteredValue?.table_percentage?.maxTable}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          const maxValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );
                          setModelFilteredValue((v) => ({
                            ...v,
                            table_percentage: {
                              minTable: v?.table_percentage?.minTable,
                              maxTable: maxValue,
                            },
                          }));
                        }}
                        onBlur={(e) => {
                          const inputText = e.target.value;
                          const maxValue = Number(
                            inputText.replace(/[^0-9.]/g, "")
                          );
                          if (
                            maxValue <=
                              Number(
                                modelFilteredValue?.table_percentage?.minTable
                              ) ||
                            maxValue >=
                              Number(diamondFilterData?.table_percentage?.max)
                          ) {
                            setModelFilteredValue((v) => ({
                              ...v,
                              table_percentage: {
                                minTable: v?.table_percentage?.minTable,
                                maxTable: Number(
                                  diamondFilterData?.table_percentage?.max
                                ),
                              },
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {FLUORESCENCE_TITLE}
                  </span>
                </button>
              </h2>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.[FLUORESCENCE_INTENSITY]?.min}
                    dataList={data(FLUORESCENCE_INTENSITY)?.filter(
                      (item: any) => item.value !== ""
                    )}
                    handleClickItem={(e) =>
                      handleClick(e, MIN, FLUORESCENCE_INTENSITY)
                    }
                  />
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.[FLUORESCENCE_INTENSITY]?.max}
                    dataList={data(FLUORESCENCE_INTENSITY)?.filter(
                      (value) => value !== ""
                    )}
                    handleClickItem={(e) =>
                      handleClick(e, MAX, FLUORESCENCE_INTENSITY)
                    }
                    isDisabled={(item) =>
                      isHandleDisabled(item, FLUORESCENCE_INTENSITY)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {POLISH_TITLE}
                  </span>
                </button>
              </h2>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.polish?.min}
                    dataList={data(POLISH)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MIN, POLISH)}
                  />
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.polish?.max}
                    dataList={data(POLISH)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MAX, POLISH)}
                    isDisabled={(item) => isHandleDisabled(item, POLISH)}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {SYMMETRY_TITLE}
                  </span>
                </button>
              </h2>
              <div className="flex items-center justify-center gap-6 relative flex-[0_0_auto]">
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.symmetry?.min}
                    dataList={data(SYMMETRY)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MIN, SYMMETRY)}
                  />
                </div>
                <span className="relative w-fit [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  To
                </span>
                <div className="flex items-center justify-center gap-2 relative bg-[var(--dark-theme-color)] rounded-lg w-full">
                  <Dropdown
                    value={modelFilteredValue?.symmetry?.max}
                    dataList={data(SYMMETRY)?.filter((value) => value !== "")}
                    handleClickItem={(e) => handleClick(e, MAX, SYMMETRY)}
                    isDisabled={(item) => isHandleDisabled(item, SYMMETRY)}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[var(--theme-filter-color)] px-4 py-2 rounded-lg">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 dark:text-gray-400"
                >
                  <span className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    {CERTIFICATES_TITLE}
                  </span>
                </button>
              </h2>
              <div className="flex flex-wrap items-start justify-between content-start gap-6 flex-[0_0_auto]">
                {diamondFilterData?.certificates?.options?.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleClickedCerti(item?.value)}
                    className="cursor-pointer w-1/4 h-full py-3 flex justify-center bg-[var(--dark-theme-color)] rounded-lg border border-solid border-[var(--filter-border-color)]"
                  >
                    <div className="relative w-fit [font-family:'Poppins-Regular',Helvetica] font-normal text-[var(--theme-alter-color)] text-[16.1px] tracking-[0] leading-[normal]">
                      {item?.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default FilterModel;
