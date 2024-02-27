import Editor from "Y/components/Editor";
import Navbar from "Y/components/Navbar";
import Viewer from "Y/components/Viewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "Y/components/ui/resizable";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
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
