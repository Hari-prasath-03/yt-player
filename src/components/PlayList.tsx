import { usePlayerContext } from "../context/PlayerContext";
import usePlayer from "../hooks/usePlayer";

const PlayList = () => {
  const { urlList, setUrlList, isPlaying } = usePlayerContext();
  const { setCurrentIndex } = usePlayer();

  const handleRemove = (index: number) => {
    setUrlList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  if (urlList.length === 0) {
    return (
      <div className="text-center text-sm text-text-muted dark:text-dark-text-muted mt-6">
        Your Playlist is empty. Please add some YouTube video URLs to start.
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mt-7 mx-auto px-2">
      <h4 className="text-xl font-semibold mb-5 text-center">
        Playlist - ({urlList.length} items)
      </h4>
      <ul className="flex flex-col gap-3 w-full md:max-h-[370px] overflow-y-auto scrollbar-thin">
        {urlList.map(({ title, isPlaying: thisIsPlaying }, index) => (
          <li
            key={index}
            className="flex-1 flex justify-between items-center bg-neutral-200/50 dark:bg-neutral-800 pl-3 md:pl-5 rounded-md shadow-sm break-all md:mr-5"
          >
            <span
              onClick={() => setCurrentIndex(index)}
              className="hidden md:block"
            >
              {title.length > 40 ? title.substring(0, 40) + "..." : title}
            </span>
            <span
              onClick={() => setCurrentIndex(index)}
              className="block md:hidden text-sm py-2"
            >
              {title.length > 22 ? title.substring(0, 22) + "..." : title}
            </span>
            <button
              disabled={thisIsPlaying}
              onClick={() => handleRemove(index)}
              className={`text-xs md:text-sm rounded text-white font-bold btn-primary py-2.5 px-4 ${
                thisIsPlaying
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {thisIsPlaying
                ? isPlaying
                  ? "Playing..."
                  : "Paused..."
                : "Remove"}
            </button>
          </li>
        ))}
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
