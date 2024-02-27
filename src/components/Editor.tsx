import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror, { type ViewUpdate } from "@uiw/react-codemirror";
import React from "react";
import { historyField } from "@codemirror/commands";
import useBoard from "Y/hooks/useBoard";
import { useBoardStore } from "Y/store";

const stateFields = { history: historyField };

const Editor = () => {
  const { getBoardState, updateBoardState } = useBoard();
  const { clientBoardState: boardState, clientBoardText: boardText } =
    getBoardState();

  const boardScale = useBoardStore((store) => store.boardScale);

  const onChange = React.useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      updateBoardState(viewUpdate.state.toJSON(), val);
    },
    [updateBoardState],
  );

  return (
    <CodeMirror
      value={boardText}
      theme="dark"
      style={{ fontSize: `${16 * boardScale}px` }}
      className="h-full"
      height="100%"
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      onChange={onChange}
      initialState={
        boardState ? { json: boardState, fields: stateFields } : undefined
      }
    />
  );
};

export default Editor;
