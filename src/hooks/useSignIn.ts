import { signIn, signOut, useSession } from "next-auth/react";

const useSignIn = () => {
  const signInPipeline = async () => {
    const signResult = await signIn("google");
    if (signResult?.ok) {
    }
  };

  return signInPipeline;
};

export default useSignIn;
