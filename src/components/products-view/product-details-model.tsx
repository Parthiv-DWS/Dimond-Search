import { FC, useState } from "react";
import CloseIcon from "../../assets/custom-icons/CloseIcon";
import Rectangle1Image from "../../assets/rectangleIcon/Rectangle 43.png";
import Rectangle2Image from "../../assets/rectangleIcon/Rectangle 47.png";
import Rectangle3Image from "../../assets/rectangleIcon/Rectangle 48.png";
import Rectangle4Image from "../../assets/rectangleIcon/Rectangle 49.png";
import MainRectangleImage from "../../assets/rectangleIcon/image 18.png";
import { ProductDetailList } from "../../utility/utils";
import { useModeStore } from "../../store/theme-mode/store";

const ProductDetailsModel: FC<{ setOpen: (value: boolean) => void, selectedDiamond: any, setSelectedDiamond: React.Dispatch<React.SetStateAction<any>> }> = ({
  setOpen,selectedDiamond,setSelectedDiamond
}) => {
  const { isDarkMode } = useModeStore((state) => state);
  const productDetailList = ProductDetailList();
  const [selectedImage, setSelectedImage] = useState(MainRectangleImage);
  const handleClick = async (action: string) => {
    const isDev = import.meta.env.VITE_APP_TYPE === "development";
      if (isDev) {
        window.diamondSearch = window?.diamondSearch || {};
        window.diamondSearch.urls = window?.diamondSearch.urls || {};
        window.diamondSearch.formKey = 'dev-form-key'; // You can also mock this
        window.diamondSearch.urls.addDiamond = '/api/mock-add-diamond';
      }
      try {
      /*const formData = new URLSearchParams();
      formData.append('form_key', window.diamondSearch.formKey || '');
      formData.append('action', 'addToCart');*/
      const response = await fetch(window?.diamondSearch?.urls?.addDiamond + 'form_key='+window?.diamondSearch?.formKey, {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ action: action}),
        //body:formData,
      });
      const data = await response.json();
      console.log('Data received:', data);
      (window as any).require(['Magento_Customer/js/customer-data'], (customerData: any) => {
        customerData.reload(['customer', 'cart', 'wishlist','messages'], true);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }
  return (
    <div className="relative bg-[var(--theme-color)] text-[var(--theme-alter-color)] h-full lg:pr-[240px] overflow-scroll">
      <div className="py-10 pr-6 md:pr-3 pl-6 flex flex-col gap-y-6">
        <div className="w-full flex justify-between">
          <p>Diamond View</p>
          <button
            onClick={() => {
              setOpen(false);
              setSelectedDiamond({});
              document.body.style.overflowY = "";
            }}
          >
            <CloseIcon isDarkMode={isDarkMode} />
          </button>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-6">
          <div className="flex flex-row md:flex-col flex-wrap gap-4 justify-center items-center">
            <div
              className="w-24 h-24"
              onClick={() => setSelectedImage(MainRectangleImage)}
            >
              <img
                src={Rectangle1Image}
                alt="rectangle image1"
                width="100%"
                height="100%"
              />
            </div>
            <div
              className="w-24 h-24"
              onClick={() => setSelectedImage(Rectangle2Image)}
            >
              <img
                src={Rectangle2Image}
                alt="rectangle image1"
                width="100%"
                height="100%"
              />
            </div>
            <div
              className="w-24 h-24"
              onClick={() => setSelectedImage(Rectangle3Image)}
            >
              <img
                src={Rectangle3Image}
                alt="rectangle image1"
                width="100%"
                height="100%"
              />
            </div>
            <div
              className="w-24 h-24"
              onClick={() => setSelectedImage(Rectangle4Image)}
            >
              <img
                src={Rectangle4Image}
                alt="rectangle image1"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="md:w-full h-[282px] sm:h-[332px] md:h-[432px] xl:px-[72px] border-2 border-[var(--theme-alter-color)] flex justify-center items-center">
            <img
              src={selectedImage}
              alt="main rectangle image"
              className="sm:w-1/2 md:w-full h-[278px] sm:h-[228px] md:h-[428px]"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="w-full flex items-start justify-start">
          <span className="font-paregraph-p2-semibold font-[number:var(--paregraph-p2-semibold-font-weight)] text-[var(--theme-alter-color)] text-[length:var(--paregraph-p3-semibold-font-size)] md:text-[length:var(--paregraph-p2-semibold-font-size)] tracking-[var(--paregraph-p2-semibold-letter-spacing)] leading-[var(--paregraph-p2-semibold-line-height)] [font-style:var(--paregraph-p2-semibold-font-style)]">
            {`${selectedDiamond?.shape} ${[
                              selectedDiamond?.size ? `${selectedDiamond?.size} carat` : "",
                              selectedDiamond?.color,
                              selectedDiamond?.clarity,
                            ].filter(Boolean)}`}
          </span>
        </div>
        {productDetailList?.map((item, i) => (
          <div
            className="flex justify-between py-2 px-4 bg-[var(--theme-search-color)]"
            key={i}
          >
            <span>{item?.label}</span>
            <span>{item?.value === 'depth_percentage' || item?.value === 'table_percentage' ? `${selectedDiamond?.[item?.value]} %` : item?.value === 'rapnet_price' ? `$ ${selectedDiamond?.[item?.value]}` : selectedDiamond?.[item?.value]}</span>
          </div>
        ))}
        <div className="flex gap-x-6 gap-y-4 flex-col md:flex-row justify-between whitespace-nowrap">
          <button onClick={() => handleClick('chooseSetting')} className="bg-black py-4 px-6 border rounded-lg text-white w-full">
            Choose Setting
          </button>
          <button onClick={() => handleClick('addCart')} className="border py-4 px-6 rounded-lg border-[var(--theme-alter-color)] text-[var(--theme-alter-color)] w-full">
            Add to Cart
          </button>
          <button onClick={() => handleClick('buyNow')} className="bg-black py-4 px-6 border rounded-lg text-white w-full">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModel;
