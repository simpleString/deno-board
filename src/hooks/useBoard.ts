import { useBoardStore, useClientStore } from "Y/store";
import { api } from "Y/utils/api";
import { isDifferentTexts } from "Y/utils/textUtils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useBoard = () => {
  const { data: sessionData } = useSession();
  const { data: serverBoard, isLoading } = api.board.get.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });

  const clientBoardState = useBoardStore((store) => store.boardState);
  const clientBoardText = useBoardStore((store) => store.boardText);
  const textId = useBoardStore((store) => store.textId);
  const updatedAtClientBoardText = useBoardStore((store) => store.updatedAt);

  const setClientBoardState = useBoardStore((store) => store.setBoardState);
  const setClientBoardText = useBoardStore((store) => store.setBoardText);
  const setTextId = useBoardStore((store) => store.setTextId);

  const setIsSync = useClientStore((store) => store.setIsSync);

  const router = useRouter();

  const updateBoardStateMutation = api.board.update.useMutation();

  useEffect(() => {
    if (!sessionData?.user) return;

    if (!isLoading && serverBoard) {
      // If client state didn't exists, write only server state
      if (!clientBoardText) {
        setClientBoardText(serverBoard.text, serverBoard.updatedAt);
        setTextId(serverBoard.id);
        setIsSync(true);
      }

      if (
        serverBoard.updatedAt !== updatedAtClientBoardText &&
        isDifferentTexts(serverBoard.text, clientBoardText!)
      ) {
        void router.push("/merge");
      } else {
        setIsSync(true);
      }
    }
    // If server state didn't exists
    else if (!isLoading && !serverBoard) {
      // If client state exists - sync it in server
      if (clientBoardText && sessionData.user) {
        updateBoardStateMutation.mutate({
          id: textId,
          text: clientBoardText,
          updatedAt: new Date(),
          userId: sessionData.user.id,
        });
      }
      setIsSync(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const updateBoardState = (boardState: object, boardText: string) => {
    setClientBoardState(boardState);
    setClientBoardText(boardText);
  };

  return {
    boardState: clientBoardState,
    boardText: clientBoardText,
    updateBoardState,
  };
};

export default useBoard;
