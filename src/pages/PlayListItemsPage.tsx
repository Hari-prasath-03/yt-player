import { useParams } from "react-router-dom";
import usePlayListContext from "../context/PlayListContext";
import { usePlayerContext, type UrlElement } from "../context/PlayerContext";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

const PlayListItemsPage = () => {
  const { playlist } = useParams<{ playlist: string }>();
  const { recentlyAdded, favourites } = usePlayListContext();

  return (
    <div className="flex flex-col md:w-full">
      <h2 className="text-center text-2xl mb-5">
        {playlist === "recently-added" ? "Recently Added" : "Favourites"}
      </h2>

      {playlist === "recently-added" && (
        <div className="flex px-2 flex-col h-full md:h-[500px] md:overflow-y-scroll scrollbar-thin">
          {recentlyAdded.length > 0 ? (
            recentlyAdded.map((item) => (
              <PlayListItems Icon={Trash2} key={item.ytVideoId} item={item} />
            ))
          ) : (
            <p>No recently added items.</p>
          )}
        </div>
      )}

      {playlist === "favourites" && (
        <div className="flex flex-col w-full">
          {favourites.length > 0 ? (
            favourites.map((item) => (
              <PlayListItems key={item.ytVideoId} item={item} />
            ))
          ) : (
            <p>No favourite items.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayListItemsPage;

const PlayListItems: React.FC<{
  item: UrlElement;
  Icon?: React.ElementType;
}> = ({ item, Icon }) => {
  const { urlList, setUrlList } = usePlayerContext();
  const { removeFromRecentlyAdded } = usePlayListContext();

  const handleAddUrl = async (curr: UrlElement) => {
    const alreadyExists = urlList.some(
      (item) => item.ytVideoId === curr.ytVideoId
    );

    if (alreadyExists) {
      toast.error("This video is already in the playlist.");
      return;
    } else {
      toast.success("Added succesfully");
      setUrlList((prev) => [
        ...prev,
        {
          ytVideoId: curr.ytVideoId,
          title: curr.title,
          isPlaying: false,
          isFavourite: curr.isFavourite,
        },
      ]);
    }
  };

  return (
    <div className="mb-4 inline-flex items-center justify-between gap-0.5 shadow rounded-lg bg-neutral-200/70 dark:bg-neutral-800 transition-colors duration-200 wrap-break-word">
      <div className="flex items-center gap-1 cursor-pointer">
        <img
          src={`https://img.youtube.com/vi/${item.ytVideoId}/hqdefault.jpg`}
          alt={item.title}
          className="size-14 md:size-12 object-cover mr-2 rounded-md cursor-pointer"
        />
        <span>{item.title}</span>
      </div>
      <div className="inline-flex items-center gap-2 mr-2">
        <Plus
          onClick={() => handleAddUrl(item)}
          className="cursor-pointer opacity-70 hover:opacity-80"
        />
        {Icon ? (
          <Icon
            className="cursor-pointer opacity-70 hover:opacity-80"
            onClick={() => removeFromRecentlyAdded(item)}
          />
        ) : null}
      </div>
    </div>
  );
};
