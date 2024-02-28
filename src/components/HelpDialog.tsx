import { Button } from "Y/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "Y/components/ui/dialog";
import { useClientStore } from "Y/store";
import { signOut, useSession } from "next-auth/react";

const HelpDialog = () => {
  const { data: sessionData } = useSession();
  const isHelpDialogOpen = useClientStore((store) => store.isHelpDialogOpen);
  const setIsHelpDialogOpen = useClientStore(
    (store) => store.setHelpDialogOpen,
  );

  return (
    <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-4">Hotkeys</DialogTitle>
          <DialogDescription className="grid gap-6">
            <div>
              <kbd className="kdb">Ctrl</kbd> + <kbd className="kdb">+</kbd> -
              Increase font size
            </div>
            <div>
              <kbd className="kdb">Ctrl</kbd> + <kbd className="kdb">-</kbd> -
              Dicrease font size
            </div>
            {sessionData?.user && (
              <div>
                <Button onClick={() => signOut()} className="w-full">
                  Logout
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
