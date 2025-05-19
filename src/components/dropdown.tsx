import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  value,
  dataList,
  handleClickItem,
  isDisabled,
}: {
  value: string;
  dataList: any;
  handleClickItem: (value: any) => void;
  isDisabled?: any;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[var(--dark-theme-color)] px-3 py-2 text-sm font-semibold text-[var(--theme-alter-color)] shadow-sm hover:bg-[var(--funnel-theme-color)]">
          {value}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-[var(--theme-alter-color)]"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-[var(--theme-color)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {dataList?.map((item: any, i: string) => (
              <Menu.Item key={i}>
                {({ active }) => {
                  const isItemDisabled = isDisabled ? isDisabled(i) : false;
                  return (
                    <button
                      className={classNames(
                        active
                          ? "bg-[var(--theme-filter-color)]"
                          : item.value === value
                          ? "bg-[var(--theme-filter-color)]"
                          : "",
                        isItemDisabled
                          ? "text-grayscale-700"
                          : "text-[var(--theme-alter-color)]",
                        "block px-4 py-2 text-sm w-full"
                      )}
                      aria-label="drop button"
                      onClick={() => handleClickItem(item)}
                      disabled={isItemDisabled}
                    >
                      {item.value}
                    </button>
                  );
                }}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
