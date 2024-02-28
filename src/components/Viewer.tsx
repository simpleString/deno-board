import useBoard from "Y/hooks/useBoard";
import { useBoardStore } from "Y/store";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false },
);

const Viewer = () => {
  const { getBoardState } = useBoard();
  const { clientBoardText: boardText } = getBoardState();

  const boardScale = useBoardStore((store) => store.boardScale);

  return (
    <MarkdownPreview
      source={boardText}
      style={{ fontSize: `${16 * boardScale}px` }}
      className="prose w-full break-words p-2"
      rehypeRewrite={(node, _index, parent) => {
        if (
          // @ts-ignore
          node.tagName === "a" &&
          parent &&
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          /^h(1|2|3|4|5|6)/.test(parent.tagName)
        ) {
          parent.children = parent.children.slice(1);
        }
      }}
    />
  );
};

export default Viewer;
