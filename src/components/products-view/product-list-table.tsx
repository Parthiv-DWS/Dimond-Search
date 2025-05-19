import { FC } from "react";
import {
  SIZE,
  CERTIFICATES_TITLE,
  CLARITY,
  COLOR,
  DEPTH_PERCENTAGE,
  POLISH,
  RAPNET_PRICE,
  SHAPE,
  LAB,
  PRICE_TITLE,
  POLISH_TITLE,
  DEPTH_TITLE,
  CLARITY_TITLE,
  COLOUR_TITLE,
  CARAT_TITLE,
  SHAPE_TITLE,
} from "../../constants";

const NODATA = "No Data";

const ProductListTable: FC<{
  filteredProducts: any;
  handleSelectedDiamond: (id: string) => void;
}> = ({ filteredProducts, handleSelectedDiamond }) => {
  return (
    <div className="overflow-x-scroll lg:overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-table-header-color">
          <tr className="p-2">
            {[
              "",
              SHAPE_TITLE,
              CARAT_TITLE,
              COLOUR_TITLE,
              CLARITY_TITLE,
              DEPTH_TITLE,
              POLISH_TITLE,
              CERTIFICATES_TITLE,
              PRICE_TITLE,
            ]?.map((item: any, i: number) => (
              <th
                key={i}
                className="p-2 text-center w-0 [font-family:var(--paregraph-p1-medium-font-family)] font-[number:var(--paregraph-p3-medium-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-medium-font-size)] tracking-[var(--paregraph-p3-medium-letter-spacing)] leading-[var(--paregraph-p3-medium-line-height)] [font-style:var(--paregraph-p3-medium-font-style)]"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredProducts.map((_item: any, index: number) => (
            <tr
              key={_item?.diamond_search_id}
              className={`py-2 ${
                index % 2 === 0
                  ? "bg-[var(--theme-color)] text-[var(--theme-alter-color)]"
                  : "bg-[#FAFAFA] text-black"
              } font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-grayscale-900 text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]`}
            >
              {[
                "",
                SHAPE,
                SIZE,
                COLOR,
                CLARITY,
                DEPTH_PERCENTAGE,
                POLISH,
                LAB,
                RAPNET_PRICE,
              ]?.map((item: any, i: number) => {
                if (i === 0) {
                  return (
                    <td key={i} className="p-2 whitespace-nowrap">
                      <input type="checkbox" name="" id="" />
                    </td>
                  );
                }
                if (item === RAPNET_PRICE) {
                  return (
                    <td
                      key={i}
                      className="p-2 whitespace-nowrap text-center cursor-pointer"
                      onClick={() => handleSelectedDiamond(_item?.diamond_search_id)}
                    >
                      {_item?.rapnet_price ||
                        (_item?.rapnet_price === 0 ? 0 : NODATA)}
                    </td>
                  );
                }
                return (
                  <td
                    key={i}
                    className="p-2 whitespace-nowrap text-center cursor-pointer"
                    onClick={() => handleSelectedDiamond(_item?.diamond_search_id)}
                  >
                    {_item?.[item] || NODATA}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListTable;
