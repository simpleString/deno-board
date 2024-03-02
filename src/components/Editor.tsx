import { historyField } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { xcodeDarkInit, xcodeLightInit } from "@uiw/codemirror-theme-xcode";
import CodeMirror, { EditorView, type ViewUpdate } from "@uiw/react-codemirror";
import useBoard from "Y/hooks/useBoard";
import { useBoardStore, useClientStore } from "Y/store";
import { api } from "Y/utils/api";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const stateFields = { history: historyField };

const Editor = () => {
  const { resolvedTheme } = useTheme();
  const { data: sessionData } = useSession();
  const { boardState, boardText, updateBoardState } = useBoard();

  const boardScale = useBoardStore((store) => store.boardScale);
  const textId = useBoardStore((store) => store.textId);

  const setIsSync = useClientStore((store) => store.setIsSync);

  const updateBoardStateMutation = api.board.update.useMutation();
  const { data: serverBoard } = api.board.get.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });

  const debounceBoardText = useDebouncedCallback(async (text: string) => {
    // if server and client exists - update remote
    if (sessionData?.user) {
      await updateBoardStateMutation.mutateAsync({
        id: serverBoard?.id ?? textId,
        text: text,
        updatedAt: new Date(),
        userId: sessionData.user.id,
      });
      setIsSync(true);
    }
  }, 2000);

  const onChange = React.useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      setIsSync(false);
      void debounceBoardText(val);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      updateBoardState(viewUpdate.state.toJSON(), val);
    },
    [debounceBoardText, setIsSync, updateBoardState],
  );

  return (
    <CodeMirror
      value={boardText}
      theme={
        resolvedTheme === "light"
          ? xcodeLightInit({ settings: { background: "bg-background" } })
          : xcodeDarkInit({ settings: { background: "bg-background" } })
      }
      style={{
        fontSize: `${16 * boardScale}px`,
      }}
      className="h-full"
      height="100%"
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
      initialState={
        boardState ? { json: boardState, fields: stateFields } : undefined
      }
    />
  );
};

export default Editor;
