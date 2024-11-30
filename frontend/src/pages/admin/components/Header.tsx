import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-6 p-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 sm:mb-0">
        <Link to="/" className="rounded-lg">
          <img
            src="/spotify.png"
            alt="Spotify Logo"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </Link>
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1 text-sm sm:text-base">
            Manage your music catalog
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
