import { useBoardStore } from "Y/store";
import { api } from "Y/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useBoard = () => {
  const { data: sessionData } = useSession();
  const { data: serverBoard, isLoading } = api.board.get.useQuery();

  const clientBoardState = useBoardStore((store) => store.boardState);
  const setClientBoardState = useBoardStore((store) => store.setBoardState);
  const setClientBoardText = useBoardStore((store) => store.setBoardText);
  const clientBoardText = useBoardStore((store) => store.boardText);

  useEffect(() => {
    if (!isLoading && serverBoard) {
      // Синхронизируем данные клиента и сервера
    }
  }, [isLoading]);

  const getBoardState = () => {
    if (sessionData?.user) {
    }

    return { clientBoardState, clientBoardText };
  };

  const updateBoardState = (boardState: object, boardText: string) => {
    setClientBoardState(boardState);
    setClientBoardText(boardText);
  };

  return { getBoardState, updateBoardState };
};

export default useBoard;
