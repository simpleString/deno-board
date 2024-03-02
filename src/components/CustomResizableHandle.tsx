import { cn } from "Y/lib/utils";
import * as ResizablePrimitive from "react-resizable-panels";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const CustomResizableHandle = ({
  handleLeftPanel,
  handleRightPanel,
  isRightPanelOpen,
  isLeftPanelOpen,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  handleLeftPanel?: () => void;
  handleRightPanel?: () => void;
  isRightPanelOpen: boolean;
  isLeftPanelOpen: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px flex-col items-center justify-start gap-2 bg-border pt-4 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {isLeftPanelOpen && (
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full border bg-border",
          !isRightPanelOpen && "right-6",
        )}
      >
        <ChevronsLeft
          size={22}
          className="cursor-pointer"
          onClick={handleLeftPanel}
        />
      </div>
    )}
    {isRightPanelOpen && (
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full border bg-border",
          !isLeftPanelOpen && "left-6",
        )}
        onClick={handleRightPanel}
      >
        <ChevronsRight size={22} className="cursor-pointer" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export default CustomResizableHandle;
