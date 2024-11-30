import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-[50px] sm:w-[60px]"></TableHead>
            <TableHead className="text-sm sm:text-base">Title</TableHead>
            <TableHead className="text-sm sm:text-base">Artist</TableHead>
            <TableHead className="text-sm sm:text-base">Release Date</TableHead>
            <TableHead className="text-right text-sm sm:text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id} className="hover:bg-zinc-800/50">
              <TableCell className="w-[50px] sm:w-[60px]">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-xs sm:text-sm">
                {song.title}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                {song.artist}
              </TableCell>
              <TableCell className="text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>

              <TableCell className="text-right sm:text-left">
                <div className="flex gap-2 justify-end sm:justify-start">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteSong(song._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongsTable;
