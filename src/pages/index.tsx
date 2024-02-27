import Editor from "Y/components/Editor";
import FloatingButton from "Y/components/FloatingButton";
import HelpDialog from "Y/components/HelpDialog";
import Navbar from "Y/components/Navbar";
import Viewer from "Y/components/Viewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "Y/components/ui/resizable";
import { useBoardStore } from "Y/store";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
      <FloatingWindows />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={20}>
          <Viewer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

const FloatingWindows = () => (
  <>
    <FloatingButton />
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
