import CustomResizableHandle from "Y/components/CustomResizableHandle";
import Editor from "Y/components/Editor";
import FloatingButtons from "Y/components/FloatingButtons";
import HelpDialog from "Y/components/HelpDialog";
import Viewer from "Y/components/Viewer";
import { ResizablePanel, ResizablePanelGroup } from "Y/components/ui/resizable";
import { useBoardStore } from "Y/store";
import { useEffect, useRef, useState } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

export default function Home() {
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
}

const FloatingWindows = () => (
  <>
    <FloatingButtons />
    <HelpDialog />
    <KeyboardHandler />
  </>
);

const KeyboardHandler = () => {
  const increaseBoardScale = useBoardStore((store) => store.increaseBoardScale);
  const decreaseBoardScale = useBoardStore((store) => store.decreaseBoardScale);

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
    };
  }, [decreaseBoardScale, increaseBoardScale]);

  return undefined;
};
