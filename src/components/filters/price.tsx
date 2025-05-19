import { FC } from "react";
import { PRICE_TITLE } from "../../constants";
import Slider from "rc-slider";
import { GetFormatedValue } from "../../utility/utils";
import { FilterGlobalType, FilteredValueType } from "../../types";
import { useModeStore } from "../../store/theme-mode/store";

const Price: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  price: FilterGlobalType["price"];
  sliderPriceValue: number[];
  setFilteredValue: React.Dispatch<React.SetStateAction<FilteredValueType>>;
}> = ({
  filteredData,
  setFilteredData,
  price,
  sliderPriceValue,
  setFilteredValue,
}) => {
  const { diamondFilterData } = useModeStore((state) => state);

  const handleSliderChangePrice = (newValue: number | number[]): void => {
    if (Array.isArray(newValue)) {
      let [newMin, newMax] = newValue;
      if (newMax < newMin) [newMin, newMax] = [newMax, newMin];
      setFilteredValue((prev) => ({
        ...prev,
        price: {
          minPrice: newMin,
          maxPrice: newMax,
        },
        sliderPriceValue: [newMin, newMax],
      }));
    }
  };

  const handleAfterPriceChange = (e: any) => {
    if (
      e[0] !== filteredData.price?.minPrice ||
      e[1] !== filteredData.price?.maxPrice
    )
      setFilteredData({
        ...filteredData,
        price: {
          minPrice: e[0],
          maxPrice: e[1],
        },
      });
  };

  return (
    <div className="inline-flex flex-col items-start gap-4 px-4 py-2 relative flex-[0_0_auto] bg-[var(--theme-filter-color)] rounded-lg w-full">
      <div className="w-full flex items-center justify-between relative flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-2 px-0 py-2 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
            {PRICE_TITLE}
          </div>
        </div>
        <div className="inline-flex items-start gap-[24px] relative flex-[0_0_auto]">
          <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
            <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
              <input
                className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
                type="tel"
                aria-label="min-price"
                value={GetFormatedValue(`$${price?.minPrice}`)}
                onChange={(e) => {
                  const inputText = e.target.value;
                  const minValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  setFilteredValue((prev) => ({
                    ...prev,
                    price: {
                      minPrice: minValue,
                      maxPrice: Number(prev?.price?.maxPrice),
                    },
                    sliderPriceValue: [
                      minValue,
                      Number(prev?.sliderPriceValue?.[1]),
                    ],
                  }));
                }}
                onBlur={(e) => {
                  const inputText = e.target.value;
                  const minValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  if (minValue !== filteredData?.price?.minPrice) {
                    if (minValue >= Number(price?.maxPrice)) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        price: {
                          minPrice: Number(
                            diamondFilterData?.rapnet_price?.min
                          ),
                          maxPrice: Number(prev?.price?.maxPrice),
                        },
                        sliderPriceValue: [
                          Number(diamondFilterData?.rapnet_price?.min),
                          Number(prev.sliderPriceValue?.[1]),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          minPrice: Number(
                            diamondFilterData?.rapnet_price?.min
                          ),
                        },
                      });
                    } else if (
                      minValue <= Number(diamondFilterData?.rapnet_price?.min)
                    ) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        price: {
                          minPrice: Number(
                            diamondFilterData?.rapnet_price?.min
                          ),
                          maxPrice: Number(prev?.price?.maxPrice),
                        },
                        sliderPriceValue: [
                          Number(diamondFilterData?.rapnet_price?.min),
                          Number(prev.sliderPriceValue?.[1]),
                        ],
                      }));

                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          minPrice: Number(
                            diamondFilterData?.rapnet_price?.min
                          ),
                        },
                      });
                    } else
                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          minPrice: minValue,
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
                aria-label="max-price"
                value={GetFormatedValue(`$${price?.maxPrice}`)}
                onChange={(e) => {
                  const inputText = e.target.value;
                  const maxValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  setFilteredValue((prev) => ({
                    ...prev,
                    price: {
                      minPrice: Number(prev?.price?.minPrice),
                      maxPrice: maxValue,
                    },
                    sliderPriceValue: [
                      Number(prev.sliderPriceValue?.[0]),
                      maxValue,
                    ],
                  }));
                }}
                onBlur={(e) => {
                  const inputText = e.target.value;
                  const maxValue = Number(inputText.replace(/[^0-9.]/g, ""));

                  if (maxValue !== filteredData?.price?.maxPrice) {
                    if (maxValue <= Number(price?.minPrice)) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        price: {
                          minPrice: Number(prev?.price?.minPrice),
                          maxPrice: Number(
                            diamondFilterData?.rapnet_price?.max
                          ),
                        },
                        sliderPriceValue: [
                          Number(prev?.sliderPriceValue?.[0]),
                          Number(diamondFilterData?.rapnet_price?.max),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          maxPrice: Number(
                            diamondFilterData?.rapnet_price?.max
                          ),
                        },
                      });
                    } else if (
                      maxValue >= Number(diamondFilterData?.rapnet_price?.max)
                    ) {
                      setFilteredValue((prev) => ({
                        ...prev,
                        price: {
                          minPrice: Number(prev?.price?.minPrice),
                          maxPrice: Number(
                            diamondFilterData?.rapnet_price?.max
                          ),
                        },
                        sliderPriceValue: [
                          Number(prev?.sliderPriceValue?.[0]),
                          Number(diamondFilterData?.rapnet_price?.max),
                        ],
                      }));
                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          maxPrice: Number(
                            diamondFilterData?.rapnet_price?.max
                          ),
                        },
                      });
                    } else
                      setFilteredData({
                        ...filteredData,
                        price: {
                          ...filteredData?.price,
                          maxPrice: maxValue,
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
            min={Number(diamondFilterData?.rapnet_price?.min)}
            max={Number(diamondFilterData?.rapnet_price?.max)}
            value={sliderPriceValue}
            onChangeComplete={handleAfterPriceChange}
            onChange={handleSliderChangePrice}
            ariaLabelForHandle="price"
          />
        </div>
      </div>
    </div>
  );
};

export default Price;
