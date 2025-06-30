import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import PlayerSection from "./components/PlayerSection";
import PlayListSection from "./components/PlayListSection";
import { usePlayerContext } from "./context/PlayerContext";

const App = () => {
  const { urlList } = usePlayerContext();

  return (
    <>
      <Toaster />
      <div className="min-h-screen md:overflow-y-hidden bg-bg text-text dark:bg-dark-bg dark:text-dark-text w-full flex flex-col color-transition">
        <Header />
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
      </div>
    </>
  );
};

export default App;
