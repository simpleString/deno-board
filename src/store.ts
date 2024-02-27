import { create } from "zustand";
import { type PersistStorage, persist } from "zustand/middleware";
import superjson from "superjson";

interface ClientState {
  isSync: boolean;
  setIsSync: (isSync: boolean) => void;
}

const useClientStore = create<ClientState>()((set) => ({
  isSync: false,

  setIsSync: (isSync) => set({ isSync }),
}));

interface BoardState {
  boardText: string;
}

const useBoardStore = create<BoardState, ["zustand/persist", BoardState]>(
  persist(
    () => ({
      boardText: "",
    }),
    { name: "board-settings" },
  ),
);

export default useClientStore;

const storage: PersistStorage<unknown> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};
