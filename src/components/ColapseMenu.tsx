import { CircleMinus, Heart } from "lucide-react";
import {
  usePlayerContext,
  type PlayerContextType,
} from "../context/PlayerContext";
import usePlayListContext from "../context/PlayListContext";

const ColapseMenu: React.FC<
  Pick<PlayerContextType, "colapseMenuId" | "setColapseMenuId">
> = ({ colapseMenuId, setColapseMenuId }) => {
  const { setUrlList } = usePlayerContext();
  const { addAndRemoveFormFavourites } = usePlayListContext();

  const handleRemove = (index: number) => {
    setUrlList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <>
      <div
        onClick={() => setColapseMenuId(null)}
        className="absolute z-30 inset-0 bg-neutral-900/35 animate-opacity cursor-pointer overflow-y-hidden"
      />
      <div className="absolute z-40 w-full right-0 left-0 bottom-0 bg-neutral-100 dark:bg-neutral-800 rounded-t-md shadow-lg p-5 flex flex-col gap-5 animate-fromBottom pb-10">
        <div className="text-lg md:text-xl py-3 border-b border-dark-text-muted">
          {colapseMenuId?.title}
        </div>
        <button
          className={`w-full text-left inline-flex items-center gap-3 ${
            colapseMenuId?.isPlaying
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (colapseMenuId?.index) handleRemove(colapseMenuId.index);
            setColapseMenuId(null);
          }}
        >
          <CircleMinus /> <span>Remove from this playlist</span>
        </button>
        <button
          onClick={() => {
            if (colapseMenuId) {
              addAndRemoveFormFavourites(colapseMenuId);
              setColapseMenuId(null);
            }
          }}
          className="w-full text-left inline-flex items-center gap-3 cursor-pointer"
        >
          {colapseMenuId?.isFavourite ? (
            <Heart className="text-red-500" />
          ) : (
            <Heart />
          )}
          <span>
            {colapseMenuId?.isFavourite
              ? "Remove from favorites"
              : "Add to favorites"}
          </span>
        </button>
      </div>
    </>
  );
};
export default ColapseMenu;
