import { EditorState } from "@codemirror/state";
import { xcodeDarkInit, xcodeLightInit } from "@uiw/codemirror-theme-xcode";
import { Button } from "Y/components/ui/button";
import { jetBrains } from "Y/pages/_app";
import { useBoardStore } from "Y/store";
import { api } from "Y/utils/api";
import { EditorView } from "codemirror";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import CodeMirrorMerge from "react-codemirror-merge";

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

const MergeViewer = () => {
  const { resolvedTheme } = useTheme();
  const utils = api.useUtils();
  const router = useRouter();
  const { data: sessionData } = useSession({ required: true });
  const { data: serverBoard, isLoading } = api.board.get.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });
  const updateBoardStateMutation = api.board.update.useMutation({
    async onMutate() {
      await utils.board.get.cancel();
    },
    async onSuccess() {
      await utils.board.get.invalidate();
    },
  });

  const clientBoardText = useBoardStore((store) => store.boardText);
  const textId = useBoardStore((store) => store.textId);
  const boardScale = useBoardStore((store) => store.boardScale);

  const setClientBoardText = useBoardStore((store) => store.setBoardText);
  const handleAcceptIncomeChanges = () => {
    setClientBoardText(serverBoard!.text, serverBoard?.updatedAt);
    void router.push("/");
  };

  const handleAcceptCurrentChanges = async () => {
    await updateBoardStateMutation.mutateAsync({
      id: serverBoard?.id ?? textId,
      text: clientBoardText!,
      updatedAt: new Date(),
      userId: sessionData!.user.id,
    });
    await router.push("/");
  };

  if (isLoading) return;

  return (
    <div>
      <CodeMirrorMerge
        orientation="b-a"
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
        }}
      >
        <Original value={clientBoardText} />
        <Modified
          value={serverBoard?.text}
          extensions={[
            EditorView.editable.of(false),
            EditorState.readOnly.of(true),
          ]}
        />
      </CodeMirrorMerge>
      <div className="grid grid-cols-2">
        <div>
          <h1>Income changes</h1>
          <Button onClick={handleAcceptIncomeChanges}>
            Accept income changes
          </Button>
        </div>
        <div>
          <h1>Current state</h1>
          <Button onClick={handleAcceptCurrentChanges}>
            Accept current state
          </Button>
          <h1>
            Or, you can update current state yourself and accept updated state😎
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MergeViewer;
