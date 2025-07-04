import React from "react";
import { usePlayerContext } from "../context/PlayerContext";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import usePlayListContext from "../context/PlayListContext";

interface InputUrlAdderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputUrlAdder: React.FC<InputUrlAdderProps> = () => {
  const { currentUrl, setCurrentUrl, setUrlList, urlList } = usePlayerContext();
  const { recentlyAdded, setRecentlyAdded } = usePlayListContext();

  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoTitle = async (videoUrl: string) => {
    const res = await fetch(`https://noembed.com/embed?url=${videoUrl}`);
    const data = await res.json();
    return data.title;
  };

  const handleAddUrl = async () => {
    const videoId = getYouTubeVideoId(currentUrl);
    if (!videoId) {
      toast.error("Invalid YouTube URL. Enter a valid URL.");
      return;
    }

    const alreadyExists = urlList.some((item) => item.ytVideoId === videoId);
    if (alreadyExists) {
      toast.error("This video is already in the playlist.");
      return;
    }

    const videoTitle = await fetchVideoTitle(currentUrl);
    setUrlList((prev) => [
      ...prev,
      { ytVideoId: videoId, title: videoTitle, isPlaying: false, isFavourite: false },
    ]);

    const alreadyInRecentlyAdded = recentlyAdded.some(
      (item) => item.ytVideoId === videoId
    );
    
    if (!alreadyInRecentlyAdded) {
      setRecentlyAdded((prev) => [
        ...prev,
        { ytVideoId: videoId, title: videoTitle, isPlaying: false, isFavourite: false },
      ]);
    }

    setCurrentUrl("");
  };

  const handleAddUrlOnEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && currentUrl.trim()) {
      await handleAddUrl();
    }
  };

  const handleAddUrlOnClick = async () => {
    if (!currentUrl.trim()) return;
    await handleAddUrl();
  };


  return (
    <div className="flex justify-center items-center px-4">
      <input
        placeholder="Add YouTube video URL"
        className="border border-r-0 outline-none border-text-muted/60 dark:text-dark-text-muted placeholder:text-text-muted/60 dark:placeholder:text-dark-text-muted w-full max-w-md px-4 py-2 rounded-l-3xl"
        value={currentUrl}
        onChange={(e) => setCurrentUrl(e.target.value)}
        onKeyDown={handleAddUrlOnEnter}
        autoFocus
      />
      <button
        className="rounded-r-3xl btn-primary py-[7px] pr-2.5 pl-1 cursor-pointer"
        onClick={handleAddUrlOnClick}
      >
        <Plus className="size-7 text-neutral-50" />
      </button>
    </div>
  );
};

export default InputUrlAdder;
