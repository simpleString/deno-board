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
      "relative flex w-px flex-col items-center justify-start gap-2 bg-border pt-4 before:absolute before:inset-y-0 before:left-1/2 before:w-1 before:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:before:left-0 data-[panel-group-direction=vertical]:before:h-1 data-[panel-group-direction=vertical]:before:w-full data-[panel-group-direction=vertical]:before:-translate-y-1/2 data-[panel-group-direction=vertical]:before:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {isLeftPanelOpen && (
      <div
        className={cn(
          "relative z-50 flex cursor-pointer items-center justify-center rounded-full border bg-border",
          !isRightPanelOpen && "right-6",
        )}
      >
        <ChevronsLeft
          size={22}
          className="z-50 cursor-pointer"
          onClick={handleLeftPanel}
        />
      </div>
    )}
    {isRightPanelOpen && (
      <div
        className={cn(
          "relative z-50 flex cursor-pointer items-center justify-center rounded-full border bg-border",
          !isLeftPanelOpen && "left-6",
        )}
        onClick={handleRightPanel}
      >
        <ChevronsRight size={22} className="z-50 cursor-pointer" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export default CustomResizableHandle;
