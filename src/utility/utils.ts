import { CONTACT_US, HELP, SERVICES } from "../constants";
import MapLightIcon from "../assets/icons/social/light/Map_Pin.svg";
import MailLightIcon from "../assets/icons/social/light/Mail.svg";
import PhoneLightIcon from "../assets/icons/social/light/Phone.svg";
import MapDarkIcon from "../assets/icons/social/dark/Map_Pin.svg";
import MailDarkIcon from "../assets/icons/social/dark/Mail.svg";
import PhoneDarkIcon from "../assets/icons/social/dark/Phone.svg";
import FacebookLightIcon from "../assets/icons/social/light/Facebook - Negative.svg";
import TwitterLightIcon from "../assets/icons/social/light/Twitter - Negative.svg";
import InstagramLightIcon from "../assets/icons/social/light/Instagram - Negative.svg";
import LinkedInLightIcon from "../assets/icons/social/light/LinkedIn - Negative.svg";
import FacebookDarkIcon from "../assets/icons/social/dark/Facebook - Negative.svg";
import TwitterDarkIcon from "../assets/icons/social/dark/Twitter - Negative.svg";
import InstagramDarkIcon from "../assets/icons/social/dark/Instagram - Negative.svg";
import LinkedInDarkIcon from "../assets/icons/social/dark/LinkedIn - Negative.svg";
import DiamondSvgIcon from "../assets/icons/image 19 (traced).svg";
import RingOneSvgIcon from "../assets/icons/ring 1 (traced).svg";
import RingSecSvgIcon from "../assets/icons/ring 2 (traced).svg";
import { useModeStore } from "../store/theme-mode/store";
import Bhover3 from "../assets/diamond-shapes/b-hover3";
import Ashover5 from "../assets/diamond-shapes/as-hover5";
import Prhover3 from "../assets/diamond-shapes/pr-hover3";
import Phover3 from "../assets/diamond-shapes/p-hover3";
import Ohover3 from "../assets/diamond-shapes/o-hover3";
import Mhover3 from "../assets/diamond-shapes/m-hover3";
import Hhover3 from "../assets/diamond-shapes/h-hover3";
import Ehover3 from "../assets/diamond-shapes/e-hover3";
import Chover3 from "../assets/diamond-shapes/c-hover3";
import Ashover6 from "../assets/diamond-shapes/as-hover6";
import { FilterGlobalType } from "../types";
import { map } from "lodash";

export const SocialList: any = () => {
  const { isDarkMode } = useModeStore((state) => state);
  return [
    {
      label: "facebook-icon",
      iconUrl: isDarkMode ? FacebookDarkIcon : FacebookLightIcon,
      url: "#",
    },
    {
      label: "twitter-icon",
      iconUrl: isDarkMode ? TwitterDarkIcon : TwitterLightIcon,
      url: "#",
    },
    {
      label: "instagram-icon",
      iconUrl: isDarkMode ? InstagramDarkIcon : InstagramLightIcon,
      url: "#",
    },
    {
      label: "linkedin-icon",
      iconUrl: isDarkMode ? LinkedInDarkIcon : LinkedInLightIcon,
      url: "#",
    },
  ];
};

export const NavbarHeaderList = () => {
  return [
    {
      id: "1",
      url: "/diamonds",
      label: "Diamonds",
      value: "diamonds",
    },
    {
      id: "2",
      url: "/engagement_rings",
      label: "Engagement Rings",
      value: "engagement rings",
    },
    {
      id: "3",
      url: "/jewelry",
      label: "Jewelry",
      value: "jewelry",
    },
    {
      id: "4",
      url: "/education",
      label: "Education",
      value: "education",
    },
    {
      id: "5",
      url: "/about",
      label: "About",
      value: "about",
    },
  ];
};

export const TopFooters: any = () => {
  const { isDarkMode } = useModeStore((state) => state);
  return [
    {
      label: SERVICES,
      list: [
        {
          url: "#",
          title: "Cash for Diamonds",
        },
        {
          url: "#",
          title: "Diamond Finder",
        },
        {
          url: "#",
          title: "Education",
        },
        {
          url: "#",
          title: "Blog",
        },
      ],
    },
    {
      label: HELP,
      list: [
        {
          url: "#",
          title: "About Us",
        },
        {
          url: "#",
          title: "Media",
        },
        {
          url: "#",
          title: "FAQ",
        },
        {
          url: "#",
          title: "Contact Us",
        },
      ],
    },
    {
      label: CONTACT_US,
      list: [
        {
          label: "map-icon",
          imgUrl: isDarkMode ? MapDarkIcon : MapLightIcon,
          description:
            "Unit 1101-2, Winfield Commercial Building6-8 Prat Avenue, Tsim Sha Tsui, Hong Kong",
        },
        {
          label: "mail-icon",
          imgUrl: isDarkMode ? MailDarkIcon : MailLightIcon,
          description: "contact@diamondicq.com",
        },
        {
          label: "phone-icon",
          imgUrl: isDarkMode ? PhoneDarkIcon : PhoneLightIcon,
          description: "+852 3956 5577",
        },
      ],
    },
  ];
};

export const FunnelDataList: any = () => {
  return [
    {
      id: 1,
      label: "Choose Diamond",
      image: DiamondSvgIcon,
      imageLabel: "diamond icon",
    },
    {
      id: 2,
      label: "Choose Setting",
      image: RingOneSvgIcon,
      imageLabel: "diamond icon",
    },
    {
      id: 3,
      label: "Completed Ring",
      image: RingSecSvgIcon,
      imageLabel: "diamond icon",
    },
  ];
};

export const tableHeader = () => {
  return [
    {
      label: "",
      value: "checkbox",
    },
    {
      label: "Shape",
      value: "shape",
    },
    {
      label: "Carat",
      value: "carat",
    },
    {
      label: "Colour",
      value: "colour",
    },
    {
      label: "Clarity",
      value: "clarity",
    },
    {
      label: "Depth",
      value: "depth",
    },
    {
      label: "Table",
      value: "table",
    },
    {
      label: "Polish",
      value: "polish",
    },
    {
      label: "Symmetry",
      value: "symmetry",
    },
    {
      label: "Measurement",
      value: "measurement",
    },
    {
      label: "Certificates",
      value: "certificates",
    },
    {
      label: "Price",
      value: "price",
    },
  ];
};

export const getFilters = () => {
  return {
    shapes: [
      {
        image: Bhover3,
        label: "Round",
        value: "round",
      },
      {
        image: Ashover5,
        label: "Radiant",
        value: "radiant",
      },
      {
        image: Prhover3,
        label: "Pear",
        value: "pear",
      },
      {
        image: Phover3,
        label: "Princess",
        value: "princess",
      },
      {
        image: Ohover3,
        label: "Oval",
        value: "oval",
      },
      {
        image: Mhover3,
        label: "Marquise",
        value: "marquise",
      },
      {
        image: Hhover3,
        label: "Heart",
        value: "heart",
      },
      {
        image: Ehover3,
        label: "Emerald",
        value: "emerald",
      },
      {
        image: Chover3,
        label: "Cushion",
        value: "cushion",
      },
      {
        image: Ashover6,
        label: "Asscher",
        value: "asscher",
      },
    ],
    price: {
      min: 30,
      max: 1000,
    },
    carat: {
      min: 0.05,
      max: 30.0,
    },
    color: {
      min: 5,
      max: 7,
      data: {
        0: "K",
        1: "J",
        2: "I",
        3: "H",
        4: "G",
        5: "F",
        6: "E",
        7: "D",
        8: "",
      },
    },
    fancy_color: {
      min: 2,
      max: 4,
      data: {
        0: "F",
        1: "VL",
        2: "L",
        3: "FCL",
        4: "FC",
        5: "",
      },
    },
    clarity: {
      min: 1,
      max: 7,
      data: {
        0: "S12",
        1: "SI1",
        2: "VS2",
        3: "VS1",
        4: "VVS2",
        5: "VVS1",
        6: "IF",
        7: "FL",
        8: "",
      },
    },
    cut: {
      min: 1,
      max: 3,
      data: {
        0: "Good",
        1: "Very Good",
        2: "Ideal",
        3: "Astor Ideal",
        4: "",
      },
    },
    depth: {
      min: 0,
      max: 100,
    },
    table_percentage: {
      min: 0,
      max: 100,
    },
  };
};

export const CertificateList = () => {
  return [
    {
      label: "AGS",
      value: "ags",
    },
    {
      label: "EGL",
      value: "egl",
    },
    {
      label: "GIA",
      value: "gia",
    },
    {
      label: "IGI",
      value: "igi",
    },
    {
      label: "HRD",
      value: "hrd",
    },
    {
      label: "GCAL",
      value: "gcal",
    },
  ];
};

export const ProductDetailList = () => {
  return [
    {
      label: "Carat",
      value: "size",
    },
    {
      label: "Colour",
      value: "color",
    },
    {
      label: "Clarity",
      value: "clarity",
    },
    {
      label: "Depth",
      value: "depth_percentage",
    },
    {
      label: "Table",
      value: "table_percentage",
    },
    {
      label: "Polish",
      value: "polish",
    },
    {
      label: "Symmetry",
      value: "symmetry",
    },
    {
      label: "Measurement",
      value: "measurements",
    },
    {
      label: "Certificates",
      value: "lab",
    },
    {
      label: "Price",
      value: "rapnet_price",
    },
  ];
};

export const GetFormatedValue = (value: string) => {
  if (!value) {
    return "";
  }

  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));

  if (!isNaN(numericValue)) {
    const formattedValue = numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formattedValue;
  }

  return "";
};

export const GetFormatedAdvancedValue = (value: string) => {
  const numericValue = parseFloat(value);

  if (!isNaN(numericValue)) {
    const formattedValue =
      numericValue % 1 === 0
        ? numericValue.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + "%"
        : numericValue.toFixed(1) + "%";

    return formattedValue;
  }

  return "";
};

export const FloatingFormattedValue = (value?: number) => {
  if (value) {
    if (Number(value) > 30) {
      return 30.0;
    }

    return value;
  }
};

export const getInitialFilteredData = (): FilterGlobalType => {
  const allFilters = getFilters();

  return {
    shape: [],
    certificate: "GIA",
    price: {
      minPrice: 0,
      maxPrice: 100,
    },
    carat: {
      minCarat: 1,
      maxCarat: 30,
    },
    color: [allFilters?.color?.min, allFilters?.color?.max],
    fancy_color: [allFilters?.fancy_color?.min, allFilters?.fancy_color?.max],
    polish: [0, 0],
    clarity: [allFilters?.clarity?.min, allFilters?.clarity?.max],
    cut: [allFilters?.cut?.min, allFilters?.cut?.max],
    depth_percentage: {
      minDepth: 0,
      maxDepth: 100,
    },
    table_percentage: {
      minTable: 0,
      maxTable: 100,
    },
    symmetry: [0, 0],
    fluorescence: [0, 0],
  };
};
export const FilterSliderData = (data, left): any =>
  map(data, (item) => {
    return {
      style: {
        transform: "translateX(-50%)",
        marginLeft: left,
      },
      label: item.label,
    };
  });
