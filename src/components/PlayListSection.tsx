import React from "react";
import { ChevronLeft } from "lucide-react";
import { usePlayerContext } from "../context/PlayerContext";
import PlayList from "./PlayList";
import InputUrlAdder from "./InputUrlAdder";
import Steps from "./Steps";

const PlayListSection = React.memo(() => {
  const { isStepsReaded, setIsStepsReaded, setUrlList, urlList } =
    usePlayerContext();

  const handleSetPlayListType = () => {
    setIsStepsReaded(true);
    localStorage.setItem("stepsReaded", JSON.stringify(true));
  };

  return (
    <section className="flex-1 border-l border-neutral-300 dark:border-neutral-700 px-3">
      {!isStepsReaded ? (
        <>
          <h3 className="text-center text-base md:text-lg py-5 flex flex-col items-center gap-2">
            Add the Youtube video url in order to create your own Playlist.
          </h3>
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={() => handleSetPlayListType()}
              className="btn btn-primary"
            >
              Create Playlist
            </button>
          </div>
          <Steps />
        </>
      ) : (
        <>
          <div className="flex items-center md:justify-between md:pl-3">
            <button
              onClick={() => {
                localStorage.removeItem("stepsReaded");
                setIsStepsReaded(false);
              }}
              className="p-2 cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <h3 className="text-base md:text-2xl py-7">
              Let's create the playlist and play it.
            </h3>
            {urlList.length > 0 ? (
              <button
                onClick={() => setUrlList([])}
                className="hidden btn btn-primary mr-7 md:inline-flex items-center gap-2"
              >
                <span>Clear list</span>
              </button>
            ) : (
              <span className="mr-5"/>
            )}
          </div>
          <InputUrlAdder />
          <PlayList />
        </>
      )}
    </section>
  );
});

export default PlayListSection;
