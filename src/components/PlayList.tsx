import { usePlayerContext } from "../context/PlayerContext";
import PlayListListItem from "./PlayListListItem";

const PlayList = () => {
  const { urlList, setUrlList, setCurrentIndex, isPlaying } = usePlayerContext();

  if (urlList.length === 0) {
    return (
      <div className="text-center text-sm text-text-muted dark:text-dark-text-muted mt-6">
        Your Playlist is empty. Please add some YouTube video URLs to start.
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mt-7 mx-auto relative">
      <h4 className="text-xl font-semibold mb-5 text-center">
        Playlist - ({urlList.length} items)
      </h4>
      <ul className="flex flex-col gap-3 w-full md:max-h-[370px] overflow-y-auto scrollbar-thin md:px-2">
        {urlList.map(
          ({ title, ytVideoId, isPlaying: thisIsPlaying, isFavourite }, index) => (
            <PlayListListItem
              key={index}
              ytVideoId={ytVideoId}
              title={title}
              isPlaying={isPlaying}
              thisIsPlaying={thisIsPlaying}
              index={index}
              playIndex={() => setCurrentIndex(index)}
              isFavourite={isFavourite}
            />
          )
        )}
      </ul>
      <div className="flex justify-center my-5">
        <button
          onClick={() => setUrlList([])}
          className="inline-flex btn btn-primary mr-7 md:hidden items-center gap-2"
        >
          <span>Clear list</span>
        </button>
      </div>
    </div>
  );
};

export default PlayList;
