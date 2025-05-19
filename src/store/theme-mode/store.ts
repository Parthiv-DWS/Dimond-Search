import { create } from "zustand";

type ServerState = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  diamondFilterData: any;
  setDiamondFilterData: (diamondFilterData: any) => void;
};

export const useModeStore = create<ServerState>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (isDarkMode): void => set({ isDarkMode }, false),
  diamondFilterData: {},
  setDiamondFilterData: (diamondFilterData): void =>
    set({ diamondFilterData }, false),
}));
