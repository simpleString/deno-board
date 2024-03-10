import { Button } from "Y/components/ui/button";
import { cn } from "Y/lib/utils";
import { getCtrlKey } from "Y/utils/platformUtils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

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
}) => {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "relative flex w-px flex-col items-center justify-center gap-2 bg-border pt-4 before:absolute before:inset-y-0 before:left-1/2 before:w-1 before:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:before:left-0 data-[panel-group-direction=vertical]:before:h-1 data-[panel-group-direction=vertical]:before:w-full data-[panel-group-direction=vertical]:before:-translate-y-1/2 data-[panel-group-direction=vertical]:before:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {isLeftPanelOpen && (
        <Button
          onContextMenu={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onMouseLeave={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onMouseOver={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onMouseMove={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            // setIsDisabled(true);
            e.stopPropagation();
          }}
          tooltipContent={
            <>
              Toggle editor section <kbd className="kbd">{getCtrlKey()}</kbd> +{" "}
              <kbd className="kbd">B</kbd>
            </>
          }
          size="sm"
          className={cn(
            "relative z-50 flex h-auto items-center justify-center rounded-full border bg-border px-0",
            !isRightPanelOpen && "right-6",
          )}
        >
          <ChevronsLeft size={22} onClick={handleLeftPanel} />
        </Button>
      )}
      {isRightPanelOpen && (
        <Button
          onContextMenu={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
          onMouseOver={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          tooltipContent={
            <>
              Toggle view section <kbd className="kbd">{getCtrlKey()}</kbd> +{" "}
              <kbd className="kbd">V</kbd>
            </>
          }
          size="sm"
          className={cn(
            "relative z-50 flex h-auto items-center justify-center rounded-full border bg-border px-0",
            !isLeftPanelOpen && "left-6",
          )}
          onClick={handleRightPanel}
        >
          <ChevronsRight size={22} />
        </Button>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
};

export default CustomResizableHandle;
