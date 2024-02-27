import { Button } from "Y/components/ui/button";
import { useClientStore } from "Y/store";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession();

  const isSync = useClientStore((store) => store.isSync);

  const handleSignIn = async () => {
    const signResult = await signIn("google");
    if (signResult?.ok) {
      // Погнали писать ебаную логику синхронизации
    }
  };

  return (
    <header>
      <nav className="absolute right-0 top-0 flex items-center gap-2">
        <h1>{isSync ? "Synced" : "Not Sync"}</h1>
        {sessionData?.user ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={handleSignIn}>SignIn with google</Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
