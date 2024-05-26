import CustomResizableHandle from "Y/components/CustomResizableHandle";
import Editor from "Y/components/Editor";
import FloatingButtons from "Y/components/FloatingButtons";
import HelpDialog from "Y/components/HelpDialog";
import Viewer from "Y/components/Viewer";
import { ResizablePanel, ResizablePanelGroup } from "Y/components/ui/resizable";
import useMobile from "Y/hooks/useMobile";
import { useBoardStore, useClientStore } from "Y/store";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

const Home = () => {
  const isMobile = useMobile();

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
    <main className="overflow-y-hidden">
      <FloatingWindows
        leftPanelRef={leftPanelRef}
        rightPanelRef={rightPanelRef}
      />
      <ResizablePanelGroup direction="horizontal" autoSaveId="resize-panel">
        <ResizablePanel
          // className="!overflow-auto"
          ref={leftPanelRef}
          collapsedSize={0}
          minSize={isMobile ? 100 : 10}
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
          className="!overflow-y-auto"
          collapsedSize={0}
          minSize={isMobile ? 100 : 10}
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

const FloatingWindows = ({
  leftPanelRef,
  rightPanelRef,
}: {
  leftPanelRef: RefObject<ImperativePanelHandle>;
  rightPanelRef: RefObject<ImperativePanelHandle>;
}) => (
  <div>
    <FloatingButtons />
    <HelpDialog />
    <KeyboardHandler
      leftPanelRef={leftPanelRef}
      rightPanelRef={rightPanelRef}
    />
  </div>
);

const KeyboardHandler = ({
  leftPanelRef,
  rightPanelRef,
}: {
  leftPanelRef: RefObject<ImperativePanelHandle>;
  rightPanelRef: RefObject<ImperativePanelHandle>;
}) => {
  const increaseBoardScale = useBoardStore((store) => store.increaseBoardScale);
  const decreaseBoardScale = useBoardStore((store) => store.decreaseBoardScale);

  const setForceSync = useClientStore((store) => store.setForceSync);
  const setIsHelpDialogOpen = useClientStore(
    (store) => store.setHelpDialogOpen,
  );

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
      const isShiftKey = e.shiftKey;

      // Increase font size
      if (isCrlKey && isShiftKey && e.code === "Equal") {
        e.preventDefault();
        increaseBoardScale();
      }

      // Decrease font size
      if (isCrlKey && isShiftKey && e.code === "Minus") {
        e.preventDefault();
        decreaseBoardScale();
      }

      // Force sync
      if (isCrlKey && e.code === "KeyS") {
        e.preventDefault();
        setForceSync(true);
      }

      // Download file md
      if (isCrlKey && e.code === "KeyM") {
        e.preventDefault();
        downloadFile("md");
      }

      // Download file
      if (isCrlKey && isShiftKey && e.code === "KeyS") {
        console.log("here we go!!");
        e.preventDefault();
        downloadFile("txt");
      }

      // Toggle editor section
      if (isCrlKey && e.code === "KeyB") {
        e.preventDefault();
        leftPanelRef.current?.isCollapsed()
          ? leftPanelRef.current?.expand()
          : leftPanelRef.current?.collapse();
      }

      // Toggle view section
      if (isCrlKey && e.code === "KeyL") {
        e.preventDefault();
        rightPanelRef.current?.isCollapsed()
          ? rightPanelRef.current?.expand()
          : rightPanelRef.current?.collapse();
      }

      // Open setting section
      if (isCrlKey && e.code === "KeyO") {
        e.preventDefault();
        setIsHelpDialogOpen(true);
      }
    };
  }, [
    decreaseBoardScale,
    downloadFile,
    increaseBoardScale,
    leftPanelRef,
    rightPanelRef,
    setForceSync,
    setIsHelpDialogOpen,
  ]);

  return undefined;
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
