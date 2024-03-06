import ThemeToggle from "Y/components/ThemeToggle";
import { Button } from "Y/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "Y/components/ui/dialog";
import { useClientStore } from "Y/store";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const getCtrlKey = () => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const platform = navigator.platform ?? navigator.userAgentData.platform;

  if (/IPHONE|IPAD|IPOD|MAC/.test(platform.toUpperCase())) {
    return "⌘";
  }
  return "Ctrl";
};

const HelpDialog = () => {
  const { data: sessionData } = useSession();
  const isHelpDialogOpen = useClientStore((store) => store.isHelpDialogOpen);
  const setIsHelpDialogOpen = useClientStore(
    (store) => store.setHelpDialogOpen,
  );

  const [isOnboarding, setIsOnboarding] = useState(
    typeof localStorage.getItem("isNotOnboarding") !== "string",
  );

  const handleDialogClose = (open: boolean) => {
    if (isOnboarding) {
      localStorage.setItem("isNotOnboarding", "true");
      setIsOnboarding(false);
    }

    setIsHelpDialogOpen(open);
  };

  const commandKey = getCtrlKey();

  return (
    <Dialog open={isHelpDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent
        className="max-h-screen overflow-y-scroll"
        shouldShowCloseButton={!isOnboarding}
        onEscapeKeyDown={(e) => {
          if (isOnboarding) {
            e.preventDefault();
          }
        }}
        onPointerDownOutside={(e) => {
          if (isOnboarding) {
            e.preventDefault();
          }
        }}
      >
        <div>
          <div className="relative h-44 w-full">
            <Image
              className="object-cover"
              src="/assets/dino_with_text.png"
              alt="Deno"
              fill
            />
          </div>

          {isOnboarding && (
            <div>
              <h1 className="py-4 text-2xl font-bold">Deno board</h1>
              <p>
                Deno board it&apos;s markdown editor. All data saved locally in
                local storage.
              </p>
              <p>
                If you want, you can download it as text or markdown. Also, you
                can enable sync through Google acc.
              </p>
            </div>
          )}

          <DialogTitle className="py-4">Hotkeys</DialogTitle>
          <DialogDescription className="grid gap-6">
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">+</kbd> - Increase font size
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">-</kbd> - Dicrease font size
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">S</kbd> - Download file
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">M</kbd> - Download file in markdown
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">Y</kbd> - Force sync with server
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">Y</kbd> - Force sync with server
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">B</kbd> - Toggle editor section
            </div>
            <div>
              <kbd className="kdb">{commandKey}</kbd> +{" "}
              <kbd className="kdb">V</kbd> - Toggle view section
            </div>
            <ThemeToggle />
            {sessionData?.user ? (
              <div>
                <Button
                  onClick={async () => {
                    await signOut();
                    handleDialogClose(false);
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={async () => {
                  await signIn("google");
                  handleDialogClose(false);
                }}
                variant="outline"
                size="icon"
                className="w-full"
              >
                <svg
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
                </svg>
                <span className="text-3xl">Google</span>
              </Button>
            )}
            {isOnboarding && (
              <Button onClick={() => handleDialogClose(false)}>
                Ok show me editor!
              </Button>
            )}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
