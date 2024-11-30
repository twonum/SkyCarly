import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else playAlbum(currentAlbum.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum.songs, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
                        to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-48 sm:w-[240px] h-48 sm:h-[240px] shadow-xl rounded mb-4 sm:mb-0"
              />
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm font-medium text-zinc-300">Album</p>
                <h1 className="text-3xl sm:text-5xl font-bold my-2 text-center sm:text-left">
                  {currentAlbum?.title}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:justify-start mt-4">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-400 
                                hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="h-6 w-6 sm:h-7 sm:w-7 text-black" />
                ) : (
                  <Play className="h-6 w-6 sm:h-7 sm:w-7 text-black" />
                )}
              </Button>
            </div>
            <div className="bg-black/20 backdrop-blur-sm mt-6 rounded-md">
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 sm:px-10 py-2 text-sm 
                                text-zinc-400 border-b border-white/5"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="px-4 sm:px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
													text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="text-green-500">♫</div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="w-10 h-10 sm:w-12 sm:h-12"
                          />
                          <div>
                            <div className="font-medium text-white">
                              {song.title}
                            </div>
                            <div className="text-xs">{song.artist}</div>
                          </div>
                        </div>
                        <div>{song.createdAt.split("T")[0]}</div>
                        <div>{formatDuration(song.duration)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
