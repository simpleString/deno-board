import { create } from "zustand";
import { type PersistStorage, persist } from "zustand/middleware";
import superjson from "superjson";

const storage: PersistStorage<BoardState> = {
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

interface ClientState {
  isSync: boolean;
  setIsSync: (isSync: boolean) => void;

  isHelpDialogOpen: boolean;
  setHelpDialogOpen: (isHelpDialogOpen: boolean) => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  isSync: false,

  setIsSync: (isSync) => set({ isSync }),

  isHelpDialogOpen: false,

  setHelpDialogOpen(isHelpDialogOpen) {
    set({ isHelpDialogOpen });
  },
}));

interface BoardState {
  boardState?: object;
  boardText?: string;
  setBoardText: (boardText: string) => void;
  setBoardState: (boardState: object) => void;

  boardScale: number;
  increaseBoardScale: () => void;
  decreaseBoardScale: () => void;
}

export const useBoardStore = create<
  BoardState,
  [["zustand/persist", BoardState]]
>(
  persist(
    (set) => ({
      setBoardText(boardText) {
        set({ boardText });
      },

      setBoardState(boardState) {
        set({ boardState });
      },

      boardScale: 1,

      increaseBoardScale() {
        set((state) => ({ boardScale: state.boardScale + 0.5 }));
      },

      decreaseBoardScale() {
        set((state) => ({ boardScale: state.boardScale - 0.5 }));
      },
    }),
    { name: "board-settings", storage },
  ),
);
