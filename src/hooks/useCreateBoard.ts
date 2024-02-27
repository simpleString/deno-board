import { api } from "Y/utils/api";
import { useSession } from "next-auth/react";
import { useId } from "react";

type CreateBoardClientType = {
  name: string;
  updatedAt: Date;
  userId: string;
};

const useCreateBoard = () => {
  const { data: sessionData } = useSession();
  const createBoardMutation = api.board.create.useMutation();
  const newBoardId = useId();

  const createBoard = (newBoard: CreateBoardClientType) => {
    if (sessionData?.user) {
      createBoardMutation.mutate({
        id: newBoardId,
        ...newBoard,
      });
    }
  };

  return createBoard;
};

export default useCreateBoard;
