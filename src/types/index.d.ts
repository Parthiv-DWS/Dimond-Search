export type FilterGlobalType = {
  shape?: string[];
  price?: {
    minPrice?: number;
    maxPrice?: number;
  };
  carat?: {
    minCarat?: number;
    maxCarat?: number;
  };
  color?: number[];
  fancy_color?: number[];
  polish?: number[];
  symmetry?: number[];
  clarity?: number[];
  cut?: number[];
  depth_percentage?: {
    minDepth?: number;
    maxDepth?: number;
  };
  fluorescence?: number[];
  table_percentage?: {
    minTable?: number;
    maxTable?: number;
  };
  certificate?: string;
};

export type ObjectType = { [key: string]: string };

export type ModelFilteredValueType = {
  shape?: string[];
  price?: {
    minPrice?: number;
    maxPrice?: number;
  };
  carat?: {
    minCarat?: number;
    maxCarat?: number;
  };
  depth_percentage?: {
    minDepth?: number;
    maxDepth?: number;
  };
  table_percentage?: {
    minTable?: number;
    maxTable?: number;
  };
  color?: {
    min?: any;
    max?: any;
  };
  fancy_color?: {
    min?: any;
    max?: any;
  };
  clarity?: {
    min?: any;
    max?: any;
  };
  fluorescence?: {
    min?: any;
    max?: any;
  };
  polish?: {
    min?: any;
    max?: any;
  };
  symmetry?: {
    min?: any;
    max?: any;
  };
};

export type FilteredValueType = {
  price?: FilterGlobalType["price"];
  sliderPriceValue?: number[];
  carat?: FilterGlobalType["carat"];
  sliderCaratValue?: number[];
  depth_percentage?: FilterGlobalType["depth_percentage"];
  sliderDepthValue?: number[];
  table_percentage?: FilterGlobalType["table_percentage"];
  sliderTableValue?: number[];
  sliderColorValue?: number[];
  sliderFancyColorValue?: number[];
  sliderClarityValue?: number[];
  sliderFluorescenceValue?: number[];
  sliderPolishValue?: number[];
  sliderSymmetryValue?: number[];
};

export type GlobalFilterType = {
  colorType: string;
  dimondCreatedBy: string;
};
