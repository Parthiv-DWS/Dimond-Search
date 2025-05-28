export {};

declare global {
  interface Window {
    diamondSearch?: {
      formKey?: string;
      urls?: {
        addDiamond?: string;
      };
      settings?: {
        "grid_per_page": string, 
        "list_per_page": string, 
        "list_mode": string, 
        "default_sort_option": string, 
        "sort_options": string[], 
        "enable_buy_now": string, 
        "enable_compare": string, 
        "enable_infinity_scroll": string, 
        "primary_color": string, 
        "secondary_color": string};
    };
  }
}
