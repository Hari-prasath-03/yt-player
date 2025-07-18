/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "../context/PlayerContext";
import { loadYouTubeAPI } from "../utils/youtube";
import toast from "react-hot-toast";

const usePlayer = () => {
  const {
    isPlaying,
    setIsPlaying,
    urlList,
    setUrlList,
    currentIndex,
    setCurrentIndex,
  } = usePlayerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState(urlList[currentIndex]);
  const [isCurrentLooped, setIsCurrentLooped] = useState(urlList.length === 1);
  const [currentSongTiming, setCurrentSongTiming] = useState({
    current: 0,
    duration: 0,
  });
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    setUrlList((prev) => {
      const updated = prev.map((item, index) => ({
        ...item,
        isPlaying: index === currentIndex,
      }));
      return updated;
    });
    setCurrentSong(urlList[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    if (!currentSong || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: "YouTube",
      artwork: [
        {
          src: `https://i.ytimg.com/vi/${currentSong.ytVideoId}/hqdefault.jpg`,
          sizes: "512x512",
          type: "image/jpg",
        },
      ],
    });
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("nexttrack", playNext);
  }, [currentSong]);

  useEffect(() => {
    setIsCurrentLooped(() => {
      if (urlList.length === 1) return true;
      return false;
    });
  }, [urlList]);

  useEffect(() => {
    const setupPlayer = async () => {
      if (urlList.length === 0) return;
      try {
        setIsLoading(true);
        await loadYouTubeAPI();

        if (playerRef.current) playerRef.current.destroy();

        playerRef.current = new (window as any).YT.Player("yt-player", {
          host: "https://www.youtube.com",
          videoId: urlList[currentIndex].ytVideoId,
          events: {
            onReady: (e: any) => {
              if (isPlaying) e.target.playVideo();
            },
            onStateChange: (e: any) => {
              if (e.data === 0) {
                if (isCurrentLooped) {
                  e.target.seekTo(0);
                  e.target.playVideo();
                } else {
                  playNext();
                }
              }
            },
          },
          playerVars: {
            origin: window.location.origin,
            autoplay: 0,
            controls: 0,
            loop: isCurrentLooped ? 1 : 0,
            playlist: isCurrentLooped
              ? urlList[currentIndex].ytVideoId
              : undefined,
          },
        });
      } catch (error: any) {
        toast.error("Failed to load YouTube player. Please try again.");
        console.error("YouTube Player Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setupPlayer();
  }, [currentIndex, isCurrentLooped]);

  useEffect(() => {
    if (isPlaying && playerRef.current) {
      intervalRef.current = window.setInterval(() => {
        const current = playerRef.current.getCurrentTime?.();
        const duration = playerRef.current.getDuration?.();
        setCurrentSongTiming({ current, duration });
        if (
          typeof current === "number" &&
          typeof duration === "number" &&
          duration > 0
        ) {
          const percentage = (current / duration) * 100;
          setProgress((pv) =>
            Math.abs(pv - percentage) > 0.1 ? percentage : pv
          );
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentIndex]);

  const play = () => {
    playerRef.current?.playVideo();
    setIsPlaying(true);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();

    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const rewind = () => {
    if (currentSongTiming.current < 5) {
      playPrev();
    } else {
      playerRef.current?.seekTo(0);
      playerRef.current?.playVideo();
    }
    setIsPlaying(true);
  };

  const playNext = () => {
    setUrlList((prevList) => {
      const currentIndex = prevList.findIndex((item) => item.isPlaying);
      const nextIndex = (currentIndex + 1) % prevList.length;
      setCurrentIndex(nextIndex);
      return prevList.map((item, i) => ({
        ...item,
        isPlaying: i === nextIndex,
      }));
    });
  };

  const playPrev = () => {
    setUrlList((prevList) => {
      const currentIndex = prevList.findIndex((item) => item.isPlaying);
      const nextIndex = (currentIndex - 1 + prevList.length) % prevList.length;
      setCurrentIndex(nextIndex);
      return prevList.map((item, i) => ({
        ...item,
        isPlaying: i === nextIndex,
      }));
    });
  };

  return {
    currentSong,
    player: playerRef.current,
    isPlaying,
    listLength: urlList.length,
    play,
    pause,
    togglePlay,
    playNext,
    rewind,
    playPrev,
    setIsCurrentLooped,
    progress,
    isCurrentLooped,
    currentSongTiming,
    isLoading,
  } as const;
};

export default usePlayer;
