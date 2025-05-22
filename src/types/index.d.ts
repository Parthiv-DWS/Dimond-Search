export type FilterGlobalType = {
  shape?: string[];
  price?: {
    minPrice?: number;
    maxPrice?: number;
  };
  weight?: {
    minWeight?: number;
    maxWeight?: number;
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
  cut_grade?: number[];
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
  lab?: number[];
};

export type ObjectType = { [key: string]: string };

export type ModelFilteredValueType = {
  shape?: string[];
  price?: {
    minPrice?: number;
    maxPrice?: number;
  };
  weight?: {
    minWeight?: number;
    maxWeight?: number;
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
  lab?: {
    min?: any;
    max?: any;
  };
  cut_grade?: {
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
  weight?: number[];
  rapnet_price?: number[];
  carat?: FilterGlobalType["carat"];
  sliderCaratValue?: number[];
  depth_percentage?: number[];
  table_percentage?: number[];
  sliderTableValue?: number[];
  color?: number[];
  lab?: number[];
  fancy_color?: number[];
  clarity?: number[];
  fluorescence?: number[];
  polish?: number[];
  cut_grade?: number[];
  symmetry?: number[];
};

export type GlobalFilterType = {
  colorType: string;
  dimondCreatedBy: string;
};
