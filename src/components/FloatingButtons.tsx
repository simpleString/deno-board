import { Button } from "Y/components/ui/button";
import { useClientStore } from "Y/store";
import { getCtrlKey } from "Y/utils/platformUtils";
import { Cloud, CloudOff, RefreshCcw, Settings } from "lucide-react";
import { useSession } from "next-auth/react";

const FloatingButtons = () => {
  const { data: sessionData } = useSession();

  const setHelpDialogOpen = useClientStore((store) => store.setHelpDialogOpen);
  const isSync = useClientStore((store) => store.isSync);

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-row-reverse gap-4">
      <Button
        onClick={() => setHelpDialogOpen(true)}
        variant="outline"
        size="icon"
        tooltipContent={
          <>
            Settings <kbd className="kbd">{getCtrlKey()}</kbd> +
            <kbd className="kbd">O</kbd>
          </>
        }
      >
        <Settings />
      </Button>
      {!sessionData ? (
        <Button
          variant="ghost"
          size="icon"
          tooltipContent="Not connected to server"
        >
          <CloudOff />
        </Button>
      ) : isSync ? (
        <Button
          variant="ghost"
          size="icon"
          tooltipContent="
        Data sync"
        >
          <Cloud />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" tooltipContent="Data sincing">
          <RefreshCcw className="animate-spin" />
        </Button>
      )}
    </div>
  );
};

export default FloatingButtons;
