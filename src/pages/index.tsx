import CustomResizableHandle from "Y/components/CustomResizableHandle";
import Editor from "Y/components/Editor";
import FloatingButtons from "Y/components/FloatingButtons";
import HelpDialog from "Y/components/HelpDialog";
import Viewer from "Y/components/Viewer";
import { ResizablePanel, ResizablePanelGroup } from "Y/components/ui/resizable";
import { useBoardStore } from "Y/store";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

const Home = () => {
  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanelRef = useRef<ImperativePanelHandle>(null);

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const handleLeftPanel = () => {
    if (!isRightPanelOpen) {
      rightPanelRef.current?.expand();
    } else {
      leftPanelRef.current?.isExpanded()
        ? leftPanelRef.current?.collapse()
        : leftPanelRef.current?.expand();
    }
  };

  const handleRightPanel = () => {
    if (!isLeftPanelOpen) {
      leftPanelRef.current?.expand();
    } else {
      rightPanelRef.current?.isExpanded()
        ? rightPanelRef.current?.collapse()
        : rightPanelRef.current?.expand();
    }
  };

  return (
    <main className="h-screen">
      <FloatingWindows />
      <ResizablePanelGroup direction="horizontal" autoSaveId="resize-panel">
        <ResizablePanel
          ref={leftPanelRef}
          collapsedSize={0}
          minSize={10}
          collapsible
          onCollapse={() => setIsLeftPanelOpen(false)}
          onExpand={() => setIsLeftPanelOpen(true)}
        >
          <Editor />
        </ResizablePanel>
        <CustomResizableHandle
          handleLeftPanel={handleLeftPanel}
          handleRightPanel={handleRightPanel}
          isLeftPanelOpen={isLeftPanelOpen}
          isRightPanelOpen={isRightPanelOpen}
        />
        <ResizablePanel
          collapsedSize={0}
          minSize={10}
          collapsible
          ref={rightPanelRef}
          onCollapse={() => setIsRightPanelOpen(false)}
          onExpand={() => setIsRightPanelOpen(true)}
        >
          <Viewer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

const FloatingWindows = () => (
  <div>
    <FloatingButtons />
    <HelpDialog />
    <KeyboardHandler />
  </div>
);

const KeyboardHandler = () => {
  const increaseBoardScale = useBoardStore((store) => store.increaseBoardScale);
  const decreaseBoardScale = useBoardStore((store) => store.decreaseBoardScale);

  const boardText = useBoardStore((store) => store.boardText);

  const downloadFile = useCallback(
    (fileExtension: "txt" | "md") => {
      const url = window.URL.createObjectURL(new Blob([boardText ?? ""]));

      const link = document.createElement("a");

      link.setAttribute("download", `deno-board.${fileExtension}`);

      link.href = url;

      link.click();
    },
    [boardText],
  );

  useEffect(() => {
    window.onkeydown = (e) => {
      const isCrlKey = e.metaKey || e.ctrlKey;

      // Increase font size
      if (isCrlKey && e.code === "Equal") {
        e.preventDefault();
        increaseBoardScale();
      }

      // Decrease font size
      if (isCrlKey && e.code === "Minus") {
        e.preventDefault();
        decreaseBoardScale();
      }

      // Download file
      if (isCrlKey && e.code === "KeyS") {
        e.preventDefault();
        downloadFile("txt");
      }

      // Download file md
      if (isCrlKey && e.code === "KeyM") {
        e.preventDefault();
        downloadFile("md");
      }
    };
  }, [decreaseBoardScale, downloadFile, increaseBoardScale]);

  return undefined;
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
