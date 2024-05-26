import { historyField } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { xcodeDarkInit, xcodeLightInit } from "@uiw/codemirror-theme-xcode";
import CodeMirror, { EditorView, type ViewUpdate } from "@uiw/react-codemirror";
import useBoard from "Y/hooks/useBoard";
import { jetBrains } from "Y/pages/_app";
import { useBoardStore, useClientStore } from "Y/store";
import { api } from "Y/utils/api";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const stateFields = { history: historyField };

const Editor = () => {
  const { resolvedTheme } = useTheme();
  const { data: sessionData } = useSession();
  const { boardState, boardText, updateBoardState } = useBoard();

  const boardScale = useBoardStore((store) => store.boardScale);
  const textId = useBoardStore((store) => store.textId);

  const setIsSync = useClientStore((store) => store.setIsSync);
  const forceSync = useClientStore((store) => store.forceSync);
  const isSync = useClientStore((store) => store.isSync);
  const setForceSync = useClientStore((store) => store.setForceSync);

  const updateBoardStateMutation = api.board.update.useMutation();
  const { data: serverBoard } = api.board.get.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });

  const syncData = useCallback(
    async (text: string) => {
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
    },
    [
      serverBoard?.id,
      sessionData?.user,
      setIsSync,
      textId,
      updateBoardStateMutation,
    ],
  );

  const debounceBoardText = useDebouncedCallback(async (text: string) => {
    if (!isSync) await syncData(text);
  }, 2000);

  const onChange = useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      setIsSync(false);
      void debounceBoardText(val);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      updateBoardState(viewUpdate.state.toJSON(), val);
    },
    [debounceBoardText, setIsSync, updateBoardState],
  );

  useEffect(() => {
    if (forceSync && !isSync) {
      void syncData(boardText ?? "");
      setForceSync(false);
      setIsSync(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceSync, isSync, setForceSync, setIsSync, syncData]);

  return (
    <CodeMirror
      value={boardText}
      theme={
        resolvedTheme === "light"
          ? xcodeLightInit({
              settings: {
                background: "bg-background",
                fontFamily: jetBrains.style.fontFamily,
              },
            })
          : xcodeDarkInit({ settings: { background: "bg-background" } })
      }
      style={{
        fontSize: `${16 * boardScale}px`,
        // height: "100vh",
      }}
      height="100vh"
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
