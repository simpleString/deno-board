import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false },
);

const source = `
# MarkdownPreview

* test1
* test2

# MarkdownPreview
`;

const Viewer = () => {
  return (
    <MarkdownPreview
      source={source}
      className="prose"
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
