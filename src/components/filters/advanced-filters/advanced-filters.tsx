import { FC, JSX } from "react";
import Depth from "./depth";
import Table from "./table";
import {
  CERTIFICATES_TITLE,
  FLUORESCENCE_INTENSITY,
  FLUORESCENCE_TITLE,
  POLISH,
  POLISH_TITLE,
  SLIDER_FLOURESCENCE,
  SLIDER_POLISH,
  SLIDER_SYMMETRY,
  SYMMETRY,
  SYMMETRY_TITLE,
} from "../../../constants";
import Slider from "rc-slider";
import { FilterGlobalType, FilteredValueType } from "../../../types";
import { FilterSliderData } from "../../../utility/utils";
import { useModeStore } from "../../../store/theme-mode/store";

export const AdvancedFilteres: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  depth: FilterGlobalType["depth_percentage"];
  sliderDepthValue: number[];
  table: FilterGlobalType["table_percentage"];
  sliderTableValue: number[];
  filteredValue: FilteredValueType;
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
}> = ({
  filteredData,
  setFilteredData,
  depth,
  sliderDepthValue,
  table,
  sliderTableValue,
  filteredValue,
  setFilteredValue,
}): JSX.Element => {
  const { diamondFilterData } = useModeStore((state) => state);

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

  return (
    <div className="relative">
      <div className="w-full flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <div className="w-full grid grid-cols-2 gap-6">
          {Number(filteredData?.depth_percentage?.maxDepth) > 0 && Number(filteredData?.depth_percentage?.minDepth) >= 0 ? <Depth
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            depth={depth}
            sliderDepthValue={sliderDepthValue}
            setFilteredValue={setFilteredValue}
          /> : null}
          {Number(filteredData?.table_percentage?.maxTable) > 0 && Number(filteredData?.table_percentage?.minTable) >= 0 ? <Table
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            table={table}
            sliderTableValue={sliderTableValue}
            setFilteredValue={setFilteredValue}
          /> : null}
        </div>
        <div className="w-full grid grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-start gap-2 px-4 py-2 relative bg-[var(--theme-filter-color)] rounded-lg">
            <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                {FLUORESCENCE_TITLE}
              </div>
            </div>
            <div className="w-full h-10 inline-flex flex-col items-start justify-end relative flex-[0_0_auto] pb-2">
              <Slider
                range
                min={0}
                max={
                  diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
                    ? Object.keys(
                        diamondFilterData?.[FLUORESCENCE_INTENSITY]?.options
                      ).length - 1
                    : 0
                }
                marks={FilterSliderData(
                  diamondFilterData?.[FLUORESCENCE_INTENSITY].options,
                  "6.5%"
                )}
                step={null}
                onChangeComplete={(e) =>
                  (e[0] !== filteredData?.[FLUORESCENCE_INTENSITY]?.[0] ||
                    e[1] !== filteredData?.[FLUORESCENCE_INTENSITY]?.[1]) &&
                  handleAfterChangeSlider(FLUORESCENCE_INTENSITY, e)
                }
                onChange={(e) => handleChangeSlider(SLIDER_FLOURESCENCE, e)}
                defaultValue={filteredValue.sliderFluorescenceValue}
                value={filteredValue.sliderFluorescenceValue}
                allowCross={false}
                pushable
                ariaLabelForHandle={FLUORESCENCE_INTENSITY}
              />
            </div>
          </div>
          <div className="w-full inline-flex flex-col items-start gap-[8px] px-[16px] py-[8px] relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-[8px]">
            <div className="inline-flex items-center justify-center gap-[8px] px-0 py-[8px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                {POLISH_TITLE}
              </div>
            </div>
            <div className="w-full h-10 inline-flex flex-col items-start justify-end relative flex-[0_0_auto] pb-2">
              <Slider
                range
                min={0}
                max={
                  diamondFilterData?.polish?.options
                    ? Object.keys(diamondFilterData.polish.options).length - 1
                    : 0
                }
                marks={FilterSliderData(diamondFilterData.polish.options, "5%")}
                step={null}
                onChangeComplete={(e) =>
                  (e[0] !== filteredData.polish?.[0] ||
                    e[1] !== filteredData.polish?.[1]) &&
                  handleAfterChangeSlider(POLISH, e)
                }
                onChange={(e) => handleChangeSlider(SLIDER_POLISH, e)}
                defaultValue={filteredValue.sliderPolishValue}
                value={filteredValue.sliderPolishValue}
                allowCross={false}
                pushable
                ariaLabelForHandle={POLISH}
              />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-6">
          <div>
            <div className="w-full inline-flex flex-col items-start gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg">
              <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                  {SYMMETRY_TITLE}
                </div>
              </div>
              <div className="w-full h-10 inline-flex flex-col items-start justify-end relative flex-[0_0_auto] pb-2">
                <Slider
                  range
                  min={0}
                  max={
                    diamondFilterData?.symmetry?.options
                      ? Object.keys(diamondFilterData.symmetry.options).length -
                        1
                      : 0
                  }
                  marks={FilterSliderData(
                    diamondFilterData.symmetry.options,
                    "5%"
                  )}
                  step={null}
                  onChangeComplete={(e) =>
                    (e[0] !== filteredData.symmetry?.[0] ||
                      e[1] !== filteredData.symmetry?.[1]) &&
                    handleAfterChangeSlider(SYMMETRY, e)
                  }
                  onChange={(e) => handleChangeSlider(SLIDER_SYMMETRY, e)}
                  defaultValue={filteredValue.sliderSymmetryValue}
                  value={filteredValue.sliderSymmetryValue}
                  allowCross={false}
                  pushable
                  ariaLabelForHandle={SYMMETRY}
                />
              </div>
            </div>
          </div>
          <div className="w-full inline-flex flex-col items-start gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg">
            <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                {CERTIFICATES_TITLE}
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-between content-start gap-6 flex-[0_0_auto]">
              {diamondFilterData?.certificates?.options?.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleClickedCerti(item?.value)}
                  className="flex flex-wrap w-[91.34px] cursor-pointer items-center justify-center gap-[582.14px_582.14px] px-[48.18px] py-[12.04px] relative bg-[var(--dark-theme-color)] rounded-[8.03px] border border-solid border-[var(--filter-border-color)]"
                >
                  <div className="relative w-fit mt-[-1.00px] ml-[-19.01px] mr-[-19.01px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[var(--theme-alter-color)] text-[16.1px] tracking-[0] leading-[normal]">
                    {item?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
