import _ from "lodash";
import { FLUORESCENCE_INTENSITY } from "../constants";

export const getFilteredObjFromDiamondFilterData = (data) => {
  const allData = { ...data };

  try {
    const minColor = _.findIndex(allData?.color?.options, {
      value: allData?.color?.min,
    });
    const maxColor =
      _.findIndex(allData?.color?.options, {
        value: allData?.color?.max,
      }) + 1;
    const minFancyColor = _.findIndex(allData?.fancy_color?.options, {
      value: allData?.fancy_color?.min,
    });
    const maxFancyColor =
      _.findIndex(allData?.fancy_color?.options, {
        value: allData?.fancy_color?.max,
      }) + 1;
    const minClarity = _.findIndex(allData?.clarity?.options, {
      value: allData?.clarity?.min
        ? allData?.clarity?.min
        : allData?.clarity?.options?.[0]?.value,
    });
    const maxClarity =
      _.findIndex(allData?.clarity?.options, {
        value: allData?.clarity?.max
          ? allData?.clarity?.max
          : allData?.clarity?.options?.[allData?.clarity?.options?.length - 2]
              ?.value,
      }) + 1;
    const minPolish = _.findIndex(allData?.polish?.options, {
      value: allData?.polish?.min,
    });
    const maxPolish =
      _.findIndex(allData?.polish?.options, {
        value: allData?.polish?.max,
      }) + 1;
    const minSymmetry = _.findIndex(allData?.symmetry?.options, {
      value: allData?.symmetry?.min,
    });
    const maxSymmetry =
      _.findIndex(allData?.symmetry?.options, {
        value: allData?.symmetry?.max,
      }) + 1;
    const minFluorescenceIntensity = _.findIndex(
      allData?.[FLUORESCENCE_INTENSITY]?.options,
      {
        value: allData?.[FLUORESCENCE_INTENSITY]?.min,
      }
    );
    const maxFluorescenceIntensity =
      _.findIndex(allData?.[FLUORESCENCE_INTENSITY]?.options, {
        value: allData?.[FLUORESCENCE_INTENSITY]?.max,
      }) + 1;

    if (allData !== null) {
      const filterDataObj = {
        price: {
          minPrice: Number(allData?.rapnet_price?.min),
          maxPrice: Number(allData?.rapnet_price?.max),
        },
        weight: {
          minWeight: Number(allData?.weight?.min),
          maxWeight: Number(allData?.weight?.max),
        },
        carat: {
          minCarat: Number(allData?.size?.min),
          maxCarat: Number(allData?.size?.max),
        },
        color: [minColor, maxColor],
        fancy_color: [minFancyColor, maxFancyColor],
        clarity: [minClarity, maxClarity],
        polish: [minPolish, maxPolish],
        symmetry: [minSymmetry, maxSymmetry],
        fluorescence: [minFluorescenceIntensity, maxFluorescenceIntensity],
        depth_percentage: {
          minDepth: parseFloat(allData?.depth_percentage?.min),
          maxDepth: parseFloat(allData?.depth_percentage?.max),
        },
        table_percentage: {
          minTable: parseFloat(allData?.table_percentage?.min),
          maxTable: parseFloat(allData?.table_percentage?.max),
        },
      };
      return { data: filterDataObj };
    } else {
      throw new Error(
        "Something went wrong in getFilteredObjFromDiamondFilterData()"
      );
    }
  } catch (err) {
    console.error(err);
    return { data: null };
  }
};
