import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:gap-6 p-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <Music className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-zinc-400 mt-2 sm:mt-1">
              Manage your music tracks
            </CardDescription>
          </div>
          <AddSongDialog className="mt-4 sm:mt-0" />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
