import { useBoardStore } from "Y/store";
import { useSession } from "next-auth/react";

const useBoard = () => {
  const { data: sessionData } = useSession();

  const clientBoardState = useBoardStore((store) => store.boardState);
  const setClientBoardState = useBoardStore((store) => store.setBoardState);
  const setClientBoardText = useBoardStore((store) => store.setBoardText);
  const clientBoardText = useBoardStore((store) => store.boardText);

  const getBoardState = () => {
    return { clientBoardState, clientBoardText };
  };

  const updateBoardState = (boardState: object, boardText: string) => {
    setClientBoardState(boardState);
    setClientBoardText(boardText);
  };

  return { getBoardState, updateBoardState };
};

export default useBoard;
