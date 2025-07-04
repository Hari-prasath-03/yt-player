import PlayerSection from "../components/PlayerSection";
import PlayListSection from "../components/PlayListSection";
import { usePlayerContext } from "../context/PlayerContext";

const IndexPlayer = () => {
  const { urlList } = usePlayerContext();

  return (
    <div className="flex flex-1 flex-col md:flex-row font-delius">
      {urlList.length > 0 ? (
        <PlayerSection />
      ) : (
        <div className="flex-1 hidden md:flex justify-center py-7">
          <h2 className="text-2xl">
            Add URL and create your playlist to continue
          </h2>
        </div>
      )}
      <PlayListSection />
    </div>
  );
};

export default IndexPlayer;
