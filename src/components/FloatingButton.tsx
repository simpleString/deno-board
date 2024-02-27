import { Button } from "Y/components/ui/button";
import { useClientStore } from "Y/store";
import { Settings } from "lucide-react";

const FloatingButton = () => {
  const setHelpDialogOpen = useClientStore((store) => store.setHelpDialogOpen);

  return (
    <Button
      onClick={() => setHelpDialogOpen(true)}
      variant="outline"
      size="icon"
      className="absolute bottom-4 right-4"
    >
      <Settings />
    </Button>
  );
};

export default FloatingButton;
