import { FC, useEffect, useState } from "react";
import _ from "lodash";
import { getInitialFilteredData } from "../utility/utils";
import "rc-slider/assets/index.css";
import FilterListSection from "../components/filters/filter-list-section";
import { FilterGlobalType, GlobalFilterType } from "../types";
import ProductListSection from "../components/products-view/product-list-section";
import { useModeStore } from "../store/theme-mode/store";
import { getFilteredObjFromDiamondFilterData } from "../services/getFilteredObjFromDiamondFilterData";
import { fetchAPI } from "../services/fetchAPI";
import { EARTH_CREATED, FLUORESCENCE_INTENSITY, MINED } from "../constants";

const Home: FC = () => {
  const { setDiamondFilterData } = useModeStore((state) => state);
  const initialFilteredData = getInitialFilteredData();
  const [isAvailData, setIsAvailData] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [globalFilterData, setGlobalFilterData] = useState<GlobalFilterType>({
    colorType: MINED,
    dimondCreatedBy: EARTH_CREATED,
  });
  const [filteredData, setFilteredData] =
    useState<FilterGlobalType>(initialFilteredData);
  const [filteredDataBackUp, setFilteredDataBackUp] =
    useState<FilterGlobalType>(initialFilteredData);

  useEffect(() => {
    const query = `
    query {
      diamondFilter {
          attribute_code
          count
          label
          range
          min
          max
          isAdvance
          options {
              label
              value
              image
          }
      }
  }
  
`;

    fetchAPI(query)
      .then((data) => {
        const formattedData: any = _.setWith(
          {},
          "data.diamondFilter",
          _.keyBy(data?.data?.diamondFilter, "attribute_code"),
          Object
        );
        const newObj = {
          label: "",
          value: "",
        };
        formattedData?.data?.diamondFilter?.color?.options.push(newObj);
        formattedData?.data?.diamondFilter?.fancy_color?.options.push(newObj);
        formattedData?.data?.diamondFilter?.clarity?.options.push(newObj);
        formattedData?.data?.diamondFilter?.polish?.options.push(newObj);
        formattedData?.data?.diamondFilter?.symmetry?.options.push(newObj);
        formattedData?.data?.diamondFilter?.[
          FLUORESCENCE_INTENSITY
        ]?.options.push(newObj);
        setDiamondFilterData(formattedData?.data?.diamondFilter);

        const allData = getFilteredObjFromDiamondFilterData(
          formattedData?.data?.diamondFilter
        );

        if (allData.data) {
          setFilteredData((fd) => ({
            ...fd,
            ...allData.data,
          }));

          setFilteredDataBackUp((fd) => ({
            ...fd,
            ...allData.data,
          }));

          setIsAvailData(true);
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }, []);

  return (
    <>
      {isAvailData && (
        <>
          <FilterListSection
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
            setApplyFilter={setApplyFilter}
            filteredDataBackUp={filteredDataBackUp}
            globalFilterData={globalFilterData}
            setGlobalFilterData={setGlobalFilterData}
          />
          <ProductListSection
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            isModelOpen={isModelOpen}
            applyFilter={applyFilter}
            setApplyFilter={setApplyFilter}
            globalFilterData={globalFilterData}
          />
        </>
      )}
    </>
  );
};

export default Home;
