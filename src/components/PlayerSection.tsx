import { Pause, Play, RotateCw, SkipBack, SkipForward } from "lucide-react";
import usePlayer from "../hooks/usePlayer";
import React from "react";
import { formatTime } from "../utils/formatTime";

const PlayerSection = React.memo(() => {
  const {
    currentSong,
    isPlaying,
    playNext,
    rewind,
    togglePlay,
    progress,
    player,
    isCurrentLooped,
    setIsCurrentLooped,
    currentSongTiming: { current: currentTime, duration: totalDuration },
    isLoading,
  } = usePlayer();

  const handleOnClickProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const clickPercent = offsetX / rect.width;
    const duration = player?.getDuration?.();

    if (typeof duration === "number") {
      player.seekTo(clickPercent * duration, true);
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center py-7 px-3">
      <h2 className="text-2xl mb-2">{isLoading ? "Loading..." : "Music Player"}</h2>

      <div className="flex-1 flex flex-col items-center gap-5">
        <img
          src={`https://img.youtube.com/vi/${currentSong.ytVideoId}/hqdefault.jpg`}
          alt={currentSong.title}
          className="size-64 md:size-72 rounded-full object-cover border-4 border-dark-text-muted/50 dark:border-text-muted my-3"
        />
        <div id="yt-player" style={{ display: "none" }}></div>
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-sm md:text-lg w-full max-w-lg text-center">{currentSong.title}</h3>

          {/* controls */}
          <div className="flex items-center gap-2 tabular-nums">
            <span className="text-xs md:text-sm tabular-nums">{formatTime(currentTime)}</span>
            <div
              onClick={handleOnClickProgress}
              className="flex items-center min-w-60 md:min-w-72 h-2 rounded-full bg-neutral-300 dark:bg-text-muted px-0.5 cursor-pointer"
            >
              <span
                style={{ width: `${progress}%` }}
                className="h-1 btn-primary rounded-full relative"
              >
                <span className="absolute -top-[3px] -right-1 rounded-full bg-neutral-100/95 dark:bg-neutral-600 border-2 border-neutral-500/60 dark:border-neutral-300/70 size-2.5" />
              </span>
            </div>
            <span className="text-xs md:text-sm tabular-nums">{formatTime(totalDuration)}</span>
          </div>
          <div className="flex items-center gap-3 text-white relative">
            <button
              onClick={() => setIsCurrentLooped((prev) => !prev)}
              className={`${
                isCurrentLooped ? "btn-primary" : "bg-neutral-500/60"
              } p-1 rounded-full cursor-pointer absolute -left-10`}
            >
              <RotateCw className="size-3" />
            </button>
            <button
              onClick={rewind}
              className="btn-primary p-2 rounded-full cursor-pointer mr-2"
            >
              <SkipBack className="size-7" />
            </button>
            <button
              onClick={togglePlay}
              className="btn-primary p-3 rounded-full cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="size-9" />
              ) : (
                <Play className="size-9" />
              )}
            </button>
            <button
              onClick={playNext}
              className="btn-primary p-2 rounded-full cursor-pointer ml-2"
            >
              <SkipForward className="size-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PlayerSection;
