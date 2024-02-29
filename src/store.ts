import { create } from "zustand";
import { type PersistStorage, persist } from "zustand/middleware";
import superjson from "superjson";
import { v4 as uuid4 } from "uuid";

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

  shoudShowMergeDialog: boolean;
  setShoudShowMergeDialog: (shoudShowMergeDialog: boolean) => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  isSync: false,

  setIsSync: (isSync) => set({ isSync }),

  isHelpDialogOpen: false,

  setHelpDialogOpen(isHelpDialogOpen) {
    set({ isHelpDialogOpen });
  },

  shoudShowMergeDialog: false,

  setShoudShowMergeDialog(shoudShowMergeDialog) {
    set({ shoudShowMergeDialog });
  },
}));

interface BoardState {
  boardState?: object;
  boardText?: string;
  setBoardText: (boardText: string, updatedAt?: Date) => void;
  setBoardState: (boardState: object, updatedAt?: Date) => void;

  boardScale: number;
  increaseBoardScale: () => void;
  decreaseBoardScale: () => void;

  updatedAt?: Date;

  textId: string;
  setTextId: (textId: string) => void;

  userId?: string;

  setUserId: (userId: string) => void;
}

export const useBoardStore = create<
  BoardState,
  [["zustand/persist", BoardState]]
>(
  persist(
    (set) => ({
      setBoardText(boardText, updatedAt = new Date()) {
        set({ boardText, updatedAt });
      },

      setBoardState(boardState, updatedAt = new Date()) {
        set({ boardState, updatedAt });
      },

      boardScale: 1,

      increaseBoardScale() {
        set((state) => ({ boardScale: state.boardScale + 0.5 }));
      },

      decreaseBoardScale() {
        set((state) => ({ boardScale: state.boardScale - 0.5 }));
      },

      textId: uuid4(),

      setTextId(textId) {
        set({ textId });
      },

      setUserId(userId) {
        set({ userId });
      },
    }),
    { name: "board-settings", storage },
  ),
);
