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
        flex items-center justify-between p-3 sticky top-0 
        bg-zinc-900/75 backdrop-blur-md z-10 sm:p-2
      "
    >
      {/* Left Section: Logo and Title */}
      <div className="flex items-center gap-1 sm:gap-2">
        <img
          src="/spotify.png"
          className="h-7 w-7 sm:h-6 sm:w-6"
          alt="Spotify logo"
        />
        <span className="text-lg font-semibold sm:text-base text-white truncate">
          SkyCarly
        </span>
      </div>

      {/* Right Section: Admin, Sign-in, and UserButton */}
      <div className="flex items-center gap-3 sm:gap-2 flex-wrap justify-end">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2 px-3 py-1 text-sm sm:px-2 sm:py-1"
            )}
          >
            <LayoutDashboardIcon className="h-5 w-5" />
            {/* Show short text "Dashboard" on small screens */}
            <span className="text-sm text-white sm:hidden">Dashboard</span>
            {/* Show full text "Admin Dashboard" on larger screens */}
            <span className="text-sm text-white hidden sm:inline lg:inline">
              Admin Dashboard
            </span>
          </Link>
        )}

        {/* Sign In and User Button */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
