import React, { useEffect, useMemo } from "react";
import ArrowLeftIcon from "../../assets/custom-icons/ArrowLeftIcon";
import ArrowRightIcon from "../../assets/custom-icons/ArrowRightIcon";
import { useModeStore } from "../../store/theme-mode/store";
import { ObjectType } from "../../types";

const PAGE_NUM_TO_SHOW = 6;

const Pagination: React.FC<{
  dataList: any;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setShowProductsPerPage: (value: ObjectType[]) => void;
  setCurrentPage: (value: number) => void;
  GetProductsList: (queryOptions?: {
    currentPageNumber?: number;
    sortBy?: string;
    order?: string;
  }) => void;
}> = ({
  dataList,
  totalItems,
  itemsPerPage,
  currentPage,
  setShowProductsPerPage,
  setCurrentPage,
  GetProductsList,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { isDarkMode } = useModeStore((state) => state);

  const onPageChange = (newPage: any) => {
    setCurrentPage(newPage);
    GetProductsList({ currentPageNumber: newPage });
  };

  const generatePageNumbers = useMemo(() => {
    let start = currentPage - Math.floor(PAGE_NUM_TO_SHOW / 2);
    if (start < 1) {
      start = 1;
    }
    let end = start + PAGE_NUM_TO_SHOW - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - PAGE_NUM_TO_SHOW + 1;
      if (start < 1) {
        start = 1;
      }
    }

    const pageNumbers: number[] = [];

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    setShowProductsPerPage(dataList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataList, itemsPerPage]);

  return (
    <div className="flex items-center justify-start md:justify-center space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 md:px-4 py-2 md:py-2 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ margin: "0" }}
        aria-label="arrow-left"
      >
        <ArrowLeftIcon isDisabled={currentPage === 1} isDarkMode={isDarkMode} />
      </button>
      {generatePageNumbers?.map((pageNumber) => (
        <button
          key={pageNumber}
          style={{ margin: "0" }}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 md:px-4 py-2 md:py-2 ${
            pageNumber === currentPage
              ? "border border-[var(--theme-alter-color)] cursor-default"
              : "text-gray-600"
          } transition-colors [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="px-3 md:px-4 py-2 md:py-2 text-gray-600 hover:text-gray-800 transition-colors"
        style={{ margin: "0" }}
        aria-label="arrow-right"
      >
        <ArrowRightIcon
          isDisabled={currentPage === totalPages || totalPages === 0}
          isDarkMode={isDarkMode}
        />
      </button>
    </div>
  );
};

export default Pagination;
