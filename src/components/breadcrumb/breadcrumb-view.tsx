import { FC, Fragment, useCallback, useEffect, useState } from "react";
import SwitcherMode from "../switcher-mode";
import { To, useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";

const BreadcrumbView: FC = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [splitRoutes, setSplitRoutes] = useState<any[]>([]);

  useEffect(() => {
    if (loc?.pathname) {
      const currentRoute = loc?.pathname.substring(1);
      const splitRoute = currentRoute?.split("/");
      const _storeTempRoute: any[] = [];

      splitRoute.forEach((item: any, index: number) => {
        if (index === 0) {
          _storeTempRoute.push({
            label: "Home",
            path: `/`,
            homePath: `/`,
          });
          if (item !== "") {
            _storeTempRoute.push({
              label: _.startCase(item),
              path: `/${item}`,
              homePath: `/`,
            });
          }
        } else {
          const path = _storeTempRoute.map((i) => i?.path);
          _storeTempRoute.push({
            label: _.startCase(item),
            path: `${path[index]}/${item}`,
            homePath: `/`,
          });
        }
      });
      setSplitRoutes(_storeTempRoute);
    }
  }, [loc]);

  const navigationClick = useCallback(
    (item: { path: To; }, index: number) => {
      if (index === 0) {
        navigate("/");
      } else {
        navigate(item?.path);
      }
    },
    [navigate]
  );

  return (
    <div className="w-full flex justify-between font-paregraph-p3-regular font-[number:var(--paregraph-p3-regular-font-weight)] text-grayscale-700 text-[length:var(--paregraph-p3-regular-font-size)] tracking-[var(--paregraph-p3-regular-letter-spacing)] leading-[var(--paregraph-p3-regular-line-height)] [font-style:var(--paregraph-p3-regular-font-style)]">
      <div className="py-4 px-3">
        {splitRoutes?.map((item, index) => (
          <Fragment key={index}>
            <span
              className={`cursor-pointer ${
                index === splitRoutes.length - 1 && "text-[var(--theme-alter-color)]"
              }`}
              onClick={() => navigationClick(item, index)}
            >
              {item?.label}
            </span>
            {index !== splitRoutes.length - 1 && <>&nbsp;/&nbsp;</>}
          </Fragment>
        ))}
      </div>
      <SwitcherMode />
    </div>
  );
};

export default BreadcrumbView;
