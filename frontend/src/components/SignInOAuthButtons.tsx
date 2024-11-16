import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // Function to handle Google OAuth
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  // Function to handle Apple OAuth
  const signInWithApple = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_apple",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-full text-white border-zinc-200 h-11 flex items-center justify-between"
        >
          <span className="hidden sm:inline-flex items-center">
            <img
              src="/google.png"
              alt="Google"
              className="w-5 h-5 mr-2" // Ensuring image size consistency
            />
            Sign in SkyCarly
          </span>
          <span className="sm:hidden">Sign In</span>{" "}
          {/* Visible only on small devices */}
          <ChevronDown className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-800 text-white">
        <DropdownMenuItem
          onClick={signInWithGoogle}
          className="flex items-center space-x-2"
        >
          <img
            src="/google.png"
            alt="Google"
            className="w-5 h-5" // Matching the size of the Google image
          />
          <span>Continue with Google</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signInWithApple}
          className="flex items-center space-x-2"
        >
          <img
            src="/apple.png"
            alt="Apple"
            className="w-5 h-5" // Matching the size of the Apple image
          />
          <span>Continue with Apple</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignInOAuthButtons;
