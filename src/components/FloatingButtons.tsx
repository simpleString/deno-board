import { Button } from "Y/components/ui/button";
import { useClientStore } from "Y/store";
import { Settings } from "lucide-react";
import { RefreshCcw, RefreshCwOff } from "lucide-react";

const FloatingButtons = () => {
  const setHelpDialogOpen = useClientStore((store) => store.setHelpDialogOpen);
  const isSync = useClientStore((store) => store.isSync);

  return (
    <div className="absolute bottom-4 right-4 flex flex-row-reverse gap-4">
      <Button
        onClick={() => setHelpDialogOpen(true)}
        variant="outline"
        size="icon"
      >
        <Settings />
      </Button>
      {isSync ? (
        <Button variant="ghost" size="icon">
          <RefreshCcw />
        </Button>
      ) : (
        <Button variant="ghost" size="icon">
          <RefreshCwOff />
        </Button>
      )}
    </div>
  );
};

export default FloatingButtons;
