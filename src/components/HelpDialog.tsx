import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "Y/components/ui/dialog";
import { useClientStore } from "Y/store";

const HelpDialog = () => {
  const isHelpDialogOpen = useClientStore((store) => store.isHelpDialogOpen);
  const setIsHelpDialogOpen = useClientStore(
    (store) => store.setHelpDialogOpen,
  );

  return (
    <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hotkeys</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
