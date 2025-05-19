export {};

declare global {
  interface Window {
    diamondSearch?: {
      formKey?: string;
      urls?: {
        addDiamond?: string;
      };
    };
  }
}
