import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div
      className="
        flex flex-wrap items-center justify-between p-4 sticky top-0 
        bg-zinc-900/75 backdrop-blur-md z-10 sm:p-3
      "
    >
      {/* Left Section: Logo and Title */}
      <div className="flex items-center gap-2">
        <img
          src="/spotify.png"
          className="h-8 w-8 sm:h-6 sm:w-6"
          alt="Spotify logo"
        />
        <span className="text-xl font-semibold sm:text-lg text-white">
          SkyCarly
        </span>
      </div>

      {/* Right Section: Admin, Sign-in, and UserButton */}
      <div className="flex items-center gap-4 sm:gap-2 flex-wrap justify-end sm:flex-col sm:items-end">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2 px-3 py-2 text-sm sm:px-2 sm:py-1"
            )}
          >
            <LayoutDashboardIcon className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-sm">Admin Dashboard</span>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
