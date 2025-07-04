import { EllipsisVertical } from "lucide-react";
import { usePlayerContext, type UrlElement } from "../context/PlayerContext";
import FadeEdges from "./FadeEdges";
import usePlayListContext from "../context/PlayListContext";

interface PlayListListItemProps extends UrlElement {
  playIndex: () => void;
  thisIsPlaying: boolean;
  index: number;
}

const PlayListListItem: React.FC<PlayListListItemProps> = ({
  playIndex,
  ytVideoId,
  title,
  thisIsPlaying,
  isPlaying,
  index,
}) => {
  const { favourites } = usePlayListContext();
  const { setColapseMenuId } = usePlayerContext();

  return (
    <div className="flex relative flex-1 items-center shadow bg-neutral-200/50 dark:bg-neutral-800 rounded-md">
      <img
        src={`https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`}
        alt={title}
        className="size-14 md:size-12 object-cover mr-2 rounded-md cursor-pointer"
        onClick={playIndex}
      />
      <FadeEdges left={thisIsPlaying && isPlaying}>
        <div
          className={`whitespace-nowrap cursor-pointer ${
            thisIsPlaying && isPlaying ? "animate-marquee" : ""
          } flex-1`}
          onClick={playIndex}
        >
          <h3 className="inline-block text-nowrap">
            {title}{" "}
            {thisIsPlaying && isPlaying && (
              <span className="text-sm text-gray-500"> (Now Playing)</span>
            )}
            {thisIsPlaying && !isPlaying && (
              <span className="text-sm text-gray-500"> (Paused)</span>
            )}
          </h3>
        </div>
      </FadeEdges>
      <button
        onClick={() =>
          setColapseMenuId({
            ytVideoId,
            title,
            isPlaying: thisIsPlaying,
            index,
            isFavourite: favourites.some(
              (fav: UrlElement) => fav.ytVideoId === ytVideoId
            ),
          })
        }
        className="mr-1.5 cursor-pointer "
      >
        <EllipsisVertical />
      </button>
    </div>
  );
};

export default PlayListListItem;
