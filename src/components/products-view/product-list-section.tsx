import { FC, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FilterGlobalType, GlobalFilterType, ObjectType } from "../../types";
import NoDataFoundImage from "../../assets/no-data-found.png";
import GridIcon from "../../assets/custom-icons/gridIcon";
import ListIcon from "../../assets/custom-icons/listIcon";
import ArrowDownUp from "../../assets/custom-icons/ArrowDownUp";
import Pagination from "../pagination/pagination";
import ProductListTable from "./product-list-table";
import DiamondImage from "../../assets/Diamond.svg";
import HeartIcon from "../../assets/custom-icons/HeartIcon";
import { useModeStore } from "../../store/theme-mode/store";
import SearchIcon from "../../assets/custom-icons/SearchIcon";
import ModalOverlay from "../model-overlay";
import ProductDetailsModel from "./product-details-model";
import Dropdown from "../dropdown";
import { fetchAPI } from "../../services/fetchAPI";
import {
  CLARITY,
  COLOR,
  COLOR_TITLE,
  CUT,
  FANCY_COLOR,
  LAB,
  MINED,
  POLISH,
  POLISH_TITLE,
  PRICE_TITLE,
  RAPNET_PRICE,
  SHAPE,
  SHAPE_TITLE,
  SYMMETRY,
} from "../../constants";

export const CompareItemCount = () => (
  <span className="whitespace-nowrap [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-semibold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
    Compare Items (0)
  </span>
);

export const ProductViewIcons: FC<{
  productListView: string;
  setProductListView: (value: string) => void;
  isDarkMode: boolean;
}> = ({ productListView, setProductListView, isDarkMode }) => (
  <>
    <button
      className={`p-2 border w-10 h-10 md:w-auto md:h-auto flex items-center md:block ${
        productListView === "list"
          ? "border-[var(--theme-alter-color)]"
          : "border-grayscale-2900 cursor-default"
      }`}
      onClick={() => setProductListView("grid")}
      aria-label="grid-button"
    >
      <ListIcon
        fill={
          productListView === "list"
            ? !isDarkMode
              ? "black"
              : "white"
            : "#828387"
        }
      />
    </button>
    <button
      className={`p-2 border w-10 h-10 md:w-auto md:h-auto flex items-center md:block ${
        productListView === "grid"
          ? "border-[var(--theme-alter-color)]"
          : "border-grayscale-2900 cursor-default"
      }`}
      onClick={() => setProductListView("list")}
      aria-label="list-button"
    >
      <GridIcon
        fill={
          productListView === "grid"
            ? !isDarkMode
              ? "black"
              : "white"
            : "#828387"
        }
      />
    </button>
  </>
);

const SHOW_ITEMS_PER_PAGE = 6;
const INITIAL_CURRENT_PAGE = 1;

const shortByList = [
  { label: SHAPE, value: SHAPE_TITLE },
  { label: COLOR, value: COLOR_TITLE },
  { label: RAPNET_PRICE, value: PRICE_TITLE },
  { label: POLISH, value: POLISH_TITLE },
];

const ProductListSection: FC<{
  filteredData: FilterGlobalType;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterGlobalType>>;
  isModelOpen: boolean;
  applyFilter: boolean;
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  globalFilterData: GlobalFilterType;
  newFilteredValue: any;
  newFilterData: any;
}> = ({
  filteredData,
  setFilteredData,
  isModelOpen,
  applyFilter,
  setApplyFilter,
  globalFilterData,
  newFilteredValue,
  newFilterData,
}) => {
  const { isDarkMode, diamondFilterData } = useModeStore((state) => state);
  const [products, setProducts] = useState<ObjectType[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<ObjectType[]>([]);
  const [productListView, setProductListView] = useState("grid");
  const [isUp, setIsUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState({});
  const [favProduct, setFavProduct] = useState<string[]>([]);
  const [selectedShortBy, setSelectedShortBy] = useState(shortByList[0]);
  const [isPagination] = useState(false);
  const [showProductsPerPage, setShowProductsPerPage] = useState<ObjectType[]>(
    []
  );
  const [totalProducts, setTotalProducts] = useState<ObjectType[]>([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const pageRef = useRef(1);

  const getQueryOptions = () => {
    const color = (
      diamondFilterData?.color?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.color?.length) {
          const min = filteredData?.color?.[0];
          const max = filteredData?.color?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    color.length = color.length - 1;

    const fancyColor = (
      diamondFilterData?.fancy_color?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.fancy_color?.length) {
          const min = filteredData?.fancy_color?.[0];
          const max = filteredData?.fancy_color?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    fancyColor.length = fancyColor.length - 1;

    const clarity = (
      diamondFilterData?.clarity?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.clarity?.length) {
          const min = filteredData?.clarity?.[0];
          const max = filteredData?.clarity?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    clarity.length = clarity.length - 1;

    const fluorescence = (
      diamondFilterData?.fluorescence?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.fluorescence?.length) {
          const min = filteredData?.fluorescence?.[0];
          const max = filteredData?.fluorescence?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    fluorescence.length = fluorescence.length - 1;

    const polish = (
      diamondFilterData?.polish?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.polish?.length) {
          const min = filteredData?.polish?.[0];
          const max = filteredData?.polish?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    polish.length = polish.length - 1;

    const symmetry = (
      diamondFilterData?.symmetry?.options as Array<{
        label: string;
        value: string;
      }>
    )
      .filter((_, index) => {
        if (filteredData?.symmetry?.length) {
          const min = filteredData?.symmetry?.[0];
          const max = filteredData?.symmetry?.[1];

          if (index >= min && index <= max) {
            return true;
          } else {
            return false;
          }
        }
      })
      .map((clr) => clr.value);

    symmetry.length = symmetry.length - 1;

    return {
      color,
      fancyColor,
      clarity,
      fluorescence,
      polish,
      symmetry,
    };
  };

  const GetProductsList = useCallback(
    (queryOptions?: {
      currentPageNumber?: number;
      sortBy?: string;
      order?: string;
      isInfiniteScroll?: boolean;
    }) => {
      setLoading(true);
      console.log("newFilteredValue :>> ", newFilteredValue);

      if (!newFilterData || !newFilteredValue) return "";

      const filters: string[] = [];
      const ranges: string[] = [];

      Object.entries(newFilteredValue).forEach(([key, value]) => {
        const meta = newFilterData.find((item) => item.attribute_code === key);
        const hasOptions =
          Array.isArray(meta?.options) && meta.options.length > 0;

        // Skip if value is empty
        if (!value || (Array.isArray(value) && value.length === 0)) return;

        if (hasOptions) {
          filters.push(
            `{ field: "${key}", value: "${value}", operator: "in" }`
          );
        } else if (Array.isArray(value) && value.length === 2) {
          const [from, to] = value;
          ranges.push(`{ field: "${key}", from: "${from}", to: "${to}" }`);
        }
      });
      // console.log('filters :>> ', filters);
      // console.log('ranges :>> ', ranges);
      const query = `
        query {
          diamondSearch(
            filters: [${filters.join(",")}]
            range: [${ranges.join(",")}]
            pageSize: ${SHOW_ITEMS_PER_PAGE}
            currentPage: ${
              queryOptions?.currentPageNumber || INITIAL_CURRENT_PAGE
            }
            sort: { field: ${
              queryOptions?.sortBy || selectedShortBy.label || "shape"
            }, direction: ${queryOptions?.order || (!isUp ? "ASC" : "DESC")} }
          ) {
            total_count
            items {
              diamond_search_id
              stock_number
              shape
              color
              rapnet_price
              polish
              clarity
              depth_percentage
              table_percentage
              symmetry
              measurements
            }
          }
        }
    `;

      // console.log("__ query}}}}==", query);

      fetchAPI(query)
        .then((res) => {
          if (res?.data?.diamondSearch?.items) {
            setTotalProductsCount(res?.data?.diamondSearch?.total_count);
            setProducts(res?.data?.diamondSearch?.items);
            if (queryOptions?.isInfiniteScroll) {
              setTotalProducts((prev) => [
                ...prev,
                ...res?.data?.diamondSearch?.items,
              ]);
            } else {
              setTotalProducts(res?.data?.diamondSearch?.items);
            }
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("__ err", err);
        });

      // --------------------------------------- demo product start --------------------------------------------
      // setProducts([
      //   {
      //     diamond_search_id: "23",
      //     stock_number: "A6800123",
      //     description: "",
      //     image: "https://loremflickr.com/640/480/city",
      //     rapnet_price: 75,
      //     shape: "Princess",
      //     color: "A",
      //     polish: "VG",
      //   },
      // ]);
      // setLoading(false);
      // --------------------------------------- demo product end --------------------------------------------
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      newFilteredValue,
      diamondFilterData,
      selectedShortBy,
      isUp,
      globalFilterData,
    ]
  );

  const handleClickMinShortByItem = (item: {
    label: string;
    value: string;
  }) => {
    if (selectedShortBy !== item) {
      GetProductsList({ currentPageNumber: currentPage, sortBy: item?.label });
      setSelectedShortBy(item);
    }
  };

  const handleClickOrder = () => {
    GetProductsList({
      currentPageNumber: currentPage,
      order: isUp ? "ASC" : "DESC",
    });
    setIsUp(!isUp);
  };

  const handleClickedHeart = (id: string) => {
    const notAvailProduct = favProduct?.filter((item) => item === id);
    const removedProduct = favProduct?.filter((item) => item !== id);
    if (notAvailProduct.length !== 0) {
      setFavProduct(removedProduct);
    } else {
      setFavProduct([...favProduct, id]);
    }
  };

  const isLikedProduct = (id: string) => {
    const getProduct = favProduct?.filter((item) => item === id);
    if (getProduct[0]) {
      return Number(id);
    } else {
      return;
    }
  };

  const handleSelectedDiamond = (id: string) => {
    setOpen(true);
    const selectedProduct = totalProducts?.filter(
      (product) => product?.diamond_search_id === id
    );
    setSelectedDiamond(selectedProduct[0]);
  };

  const fetchNextPage = () => {
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    setCurrentPage(nextPage); // This is optional if you're showing current page
    GetProductsList({ currentPageNumber: nextPage, isInfiniteScroll: true });
  };

  useEffect(() => {
    const data = products.filter(
      (product) =>
        typeof filteredData?.price?.minPrice === "number" &&
        typeof filteredData?.price?.maxPrice === "number" &&
        Number(product?.rapnet_price) >= filteredData?.price?.minPrice &&
        Number(product?.rapnet_price) <= filteredData?.price?.maxPrice
    );

    setFilteredProducts(data);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // --------------------------------------- for when filter applied through filter model --------------------------------------------
  useEffect(() => {
    if (!isModelOpen) {
      if (applyFilter) {
        GetProductsList();
        setApplyFilter(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModelOpen, applyFilter]);

  // --------------------------------------- for when filter applied normally --------------------------------------------
  useEffect(() => {
    if (!isModelOpen && !applyFilter) {
      GetProductsList();
      if (currentPage > 1) setCurrentPage(INITIAL_CURRENT_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFilteredValue, globalFilterData]);

  return (
    <>
      <div className="py-4 md:py-8 flex flex-col px-3 gap-y-6">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col sm:flex-row gap-x-6 lg:gap-x-[60px] justify-center xl:justify-between gap-y-6">
            <div className="w-full lg:w-1/2 xl:w-full flex gap-x-6">
              <div className="relative w-full xl:w-full">
                <input
                  type="text"
                  className="h-full pl-12 pr-4 p-4 w-full xl:w-full bg-[var(--theme-search-color)] rounded-lg focus:outline-none font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-grayscale-700 text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]"
                  placeholder="Search Diamonds"
                />
                <div className="absolute inset-y-0 left-0 pl-4  flex items-center pointer-events-none">
                  <SearchIcon isDarkMode={isDarkMode} />
                </div>
              </div>
              <div className="hidden xl:flex items-center justify-center py-4 px-6">
                <CompareItemCount />
              </div>
            </div>
            <div className="lg:w-1/2 w-full inline-flex items-center justify-between gap-2 md:gap-6 p-2 relative bg-[var(--theme-filter-color)] rounded-lg">
              <div className="items-center gap-2 inline-flex relative flex-[0_0_auto]">
                <div className="items-center justify-center gap-2 p-2 rounded-lg inline-flex relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]">
                    Short by
                  </div>
                </div>
                <div className="w-[154px] bg-[var(--dark-theme-color)] rounded-[8px] relative">
                  <Dropdown
                    value={selectedShortBy.value}
                    dataList={shortByList}
                    handleClickItem={handleClickMinShortByItem}
                  />
                </div>
              </div>
              <button
                className="items-start gap-[8px] p-[8px] inline-flex relative flex-[0_0_auto]"
                onClick={handleClickOrder}
                aria-label="arrow-up-down-butto"
              >
                <ArrowDownUp isUp={isUp} isDarkMode={isDarkMode} />
              </button>
            </div>
            <div className="hidden xl:flex gap-x-2">
              <ProductViewIcons
                setProductListView={setProductListView}
                productListView={productListView}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          <div className="flex items-center xl:hidden gap-x-2">
            <ProductViewIcons
              setProductListView={setProductListView}
              productListView={productListView}
              isDarkMode={isDarkMode}
            />
            <div className="items-center justify-center py-4 px-6">
              <CompareItemCount />
            </div>
          </div>
        </div>
        {isPagination && (
          <div className="relative font-paregraph-p2-medium font-[number:var(--paregraph-p2-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p2-medium-font-size)] tracking-[var(--paregraph-p2-medium-letter-spacing)] leading-[var(--paregraph-p2-medium-line-height)] [font-style:var(--paregraph-p2-medium-font-style)]">
            {productListView === "grid" ? (
              <>
                {showProductsPerPage?.length !== 0 && (
                  <div className="w-full grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-3 gap-4">
                    {showProductsPerPage?.map((product: ObjectType, i) => {
                      return (
                        <div
                          key={`${product.diamond_search_id}-${i}`}
                          className="relative"
                        >
                          <div className="cursor-pointer">
                            <img
                              src={DiamondImage}
                              alt={product?.shape}
                              className="object-cover flex-shrink-0 w-full h-[164px] sm:h-[168px] xl:h-[456px]"
                              onClick={() =>
                                handleSelectedDiamond(product.diamond_search_id)
                              }
                            />
                            {/* <iframe
                          width="100%"
                          title="diamond"
                          style={{ borderStyle: "none" }}
                          className="object-cover flex-shrink-0 w-full h-[164px] sm:h-[168px] lg:h-[456px]"
                          src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https%3A//pannellum.org/images/alma.jpg&autoLoad=true"
                        ></iframe> */}
                            <button
                              className={`absolute top-0 right-0 m-2 xl:m-4 inline-flex items-start gap-2 p-2 bg-[var(--theme-search-color)] rounded-[50px] cursor-pointer`}
                              aria-label="heart-button"
                              onClick={() => handleClickedHeart(String(i))}
                            >
                              <HeartIcon
                                isDarkMode={isDarkMode}
                                isLiked={
                                  !isDarkMode
                                    ? isLikedProduct(String(i)) === i
                                    : isLikedProduct(String(i)) !== i
                                }
                              />
                            </button>
                          </div>
                          <div className="p-4">
                            <div className="w-full flex justify-between">
                              <span
                                onClick={() =>
                                  handleSelectedDiamond(
                                    product.diamond_search_id
                                  )
                                }
                                className="text-lg cursor-pointer font-paregraph-p2-medium font-[number:var(--paregraph-p2-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p2-medium-font-size)] tracking-[var(--paregraph-p2-medium-letter-spacing)] leading-[var(--paregraph-p2-medium-line-height)] [font-style:var(--paregraph-p2-medium-font-style)]"
                              >
                                {`${product?.shape} ${[
                                  product?.size ? `${product?.size} carat` : "",
                                  product?.color,
                                  product?.clarity,
                                ].filter(Boolean)}`}
                              </span>
                              <input
                                type="checkbox"
                                name="Vector"
                                aria-label="vector"
                                className="h-[18px] w-[18px] flex-shrink-0 "
                              />
                            </div>
                            <p
                              onClick={() =>
                                handleSelectedDiamond(product.diamond_search_id)
                              }
                              className="pt-2 cursor-pointer font-paregraph-p2-semibold font-[number:var(--paregraph-p2-semibold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-semibold-font-size)] md:text-[length:var(--paregraph-p2-semibold-font-size)] tracking-[var(--paregraph-p2-semibold-letter-spacing)] leading-[var(--paregraph-p2-semibold-line-height)] [font-style:var(--paregraph-p2-semibold-font-style)]"
                            >
                              ${product.rapnet_price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
                <ProductListTable
                  filteredProducts={showProductsPerPage}
                  handleSelectedDiamond={handleSelectedDiamond}
                />
              </>
            )}
            {filteredProducts?.length === 0 && (
              <div className="flex justify-center text-center mt-4 w-full ">
                <img src={NoDataFoundImage} alt="no data found" />
              </div>
            )}
            {loading && (
              <div className="absolute top-0 flex justify-center text-center w-full h-full items-center bg-[var(--theme-color)]">
                <div className="loader"></div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-y-6 sm:flex-row justify-start sm:justify-between">
          <div>
            <button className="flex items-center justify-center bg-[var(--theme-alter-color)] py-4 px-6 rounded-lg [font-family:var(--paregraph-p3-semibold-font-family)] font-[number:var(--paregraph-p3-semibold-font-weight)] text-[var(--theme-color)] text-[length:var(--paregraph-p3-semibold-font-size)] tracking-[var(--paregraph-p3-semibold-letter-spacing)] leading-[var(--paregraph-p3-semibold-line-height)] [font-style:var(--paregraph-p3-semibold-font-style)]">
              Compare Items
            </button>
          </div>
          {isPagination && (
            <Pagination
              dataList={filteredProducts}
              totalItems={totalProductsCount}
              itemsPerPage={SHOW_ITEMS_PER_PAGE}
              currentPage={currentPage}
              setShowProductsPerPage={setShowProductsPerPage}
              setCurrentPage={setCurrentPage}
              GetProductsList={GetProductsList}
            />
          )}
        </div>
        {open && (
          <ModalOverlay
            setOpen={setOpen}
            open={open}
            setFilteredData={setFilteredData}
            setSelectedDiamond={setSelectedDiamond}
          >
            <ProductDetailsModel
              setOpen={setOpen}
              selectedDiamond={selectedDiamond}
              setSelectedDiamond={setSelectedDiamond}
            />
          </ModalOverlay>
        )}
      </div>
      {!isPagination && (
        <InfiniteScroll
          dataLength={totalProducts?.length}
          next={fetchNextPage}
          hasMore={totalProducts?.length < totalProductsCount}
          loader={
            <div className="top-0 flex justify-center text-center w-full h-full items-center bg-[var(--theme-color)]">
              <div className="loader"></div>
            </div>
          }
          style={{ overflow: "hidden" }}
        >
          {productListView === "grid" ? (
            totalProducts?.length !== 0 && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-3 gap-4">
                {totalProducts?.map((product: ObjectType, i) => {
                  return (
                    <div
                      key={`${product.diamond_search_id}-${i}`}
                      className="relative"
                    >
                      <div className="cursor-pointer">
                        <img
                          src={DiamondImage}
                          alt={product?.shape}
                          className="object-cover flex-shrink-0 w-full h-[164px] sm:h-[168px] xl:h-[456px]"
                          onClick={() =>
                            handleSelectedDiamond(product.diamond_search_id)
                          }
                        />
                        {/* <iframe
                          width="100%"
                          title="diamond"
                          style={{ borderStyle: "none" }}
                          className="object-cover flex-shrink-0 w-full h-[164px] sm:h-[168px] lg:h-[456px]"
                          src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https%3A//pannellum.org/images/alma.jpg&autoLoad=true"
                        ></iframe> */}
                        <button
                          className={`absolute top-0 right-0 m-2 xl:m-4 inline-flex items-start gap-2 p-2 bg-[var(--theme-search-color)] rounded-[50px] cursor-pointer`}
                          aria-label="heart-button"
                          onClick={() => handleClickedHeart(String(i))}
                        >
                          <HeartIcon
                            isDarkMode={isDarkMode}
                            isLiked={
                              !isDarkMode
                                ? isLikedProduct(String(i)) === i
                                : isLikedProduct(String(i)) !== i
                            }
                          />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="w-full flex justify-between">
                          <span
                            onClick={() =>
                              handleSelectedDiamond(product.diamond_search_id)
                            }
                            className="text-lg cursor-pointer font-paregraph-p2-medium font-[number:var(--paregraph-p2-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p2-medium-font-size)] tracking-[var(--paregraph-p2-medium-letter-spacing)] leading-[var(--paregraph-p2-medium-line-height)] [font-style:var(--paregraph-p2-medium-font-style)]"
                          >
                            {`${product?.shape} ${[
                              product?.size ? `${product?.size} carat` : "",
                              product?.color,
                              product?.clarity,
                            ].filter(Boolean)}`}
                          </span>
                          <input
                            type="checkbox"
                            name="Vector"
                            aria-label="vector"
                            className="h-[18px] w-[18px] flex-shrink-0 "
                          />
                        </div>
                        <p
                          onClick={() =>
                            handleSelectedDiamond(product.diamond_search_id)
                          }
                          className="pt-2 cursor-pointer font-paregraph-p2-semibold font-[number:var(--paregraph-p2-semibold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-semibold-font-size)] md:text-[length:var(--paregraph-p2-semibold-font-size)] tracking-[var(--paregraph-p2-semibold-letter-spacing)] leading-[var(--paregraph-p2-semibold-line-height)] [font-style:var(--paregraph-p2-semibold-font-style)]"
                        >
                          ${product.rapnet_price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <ProductListTable
              filteredProducts={totalProducts}
              handleSelectedDiamond={handleSelectedDiamond}
            />
          )}
        </InfiniteScroll>
      )}
      {totalProducts?.length === 0 && (
        <div className="flex justify-center text-center mt-4 w-full ">
          <img src={NoDataFoundImage} alt="no data found" />
        </div>
      )}
    </>
  );
};

export default ProductListSection;
