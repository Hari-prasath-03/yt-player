/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { UrlElement } from "./PlayerContext";
import toast from "react-hot-toast";

export type PlayListContextType = {
  recentlyAdded: UrlElement[];
  setRecentlyAdded: React.Dispatch<React.SetStateAction<UrlElement[]>>;
  favourites: UrlElement[];
  setFavourites: React.Dispatch<React.SetStateAction<UrlElement[]>>;
  playLists: PlayListType[];
  setPlayLists: React.Dispatch<React.SetStateAction<PlayListType[]>>;
  syncRecentlyAdded: () => void;
  addAndRemoveFormFavourites: (urlElement: UrlElement) => void;
  removeFromRecentlyAdded: (urlElement: UrlElement) => void;
};

type PlayListType = {
  name: string;
  urlList: UrlElement[];
};

const PlayListContext = createContext<PlayListContextType>(
  {} as PlayListContextType
);

export const PlayListContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [recentlyAdded, setRecentlyAdded] = useState<UrlElement[]>(() => {
    const savedRecentlyAdded = localStorage.getItem("recently-added");
    return savedRecentlyAdded ? JSON.parse(savedRecentlyAdded) : [];
  });

  const [favourites, setFavourites] = useState<UrlElement[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const [playLists, setPlayLists] = useState<PlayListType[]>([]);

  const syncRecentlyAdded = () => {
    localStorage.setItem("recently-added", JSON.stringify(recentlyAdded));
  };

  const addAndRemoveFormFavourites = (urlElement: UrlElement) => {
    setFavourites((prev) => {
      const isFavourite = prev.some(
        (item) => item.ytVideoId === urlElement.ytVideoId
      );
      
      if (isFavourite) {
        toast.success("Removed from favourites");
        return prev.filter((item) => item.ytVideoId !== urlElement.ytVideoId);
      } else {
        toast.success("Added to favourites");
        return [...prev, urlElement];
      }
    });
  };

  const removeFromRecentlyAdded = (urlElement: UrlElement) => {
    setRecentlyAdded((prev) => {
      const isInRecentlyAdded = prev.some(
        (item) => item.ytVideoId === urlElement.ytVideoId
      );
      
      if (isInRecentlyAdded) {
        toast.success("Removed from recently added");
        return prev.filter((item) => item.ytVideoId !== urlElement.ytVideoId);
      }
      return prev;
    });
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("recently-added", JSON.stringify(recentlyAdded));
  }, [recentlyAdded]);

  const contextValue = {
    recentlyAdded,
    setRecentlyAdded,
    favourites,
    setFavourites,
    playLists,
    setPlayLists,
    syncRecentlyAdded,
    addAndRemoveFormFavourites,
    removeFromRecentlyAdded
  };

  return (
    <PlayListContext.Provider value={contextValue}>
      {children}
    </PlayListContext.Provider>
  );
};

const usePlayListContext = () => {
  const context = useContext(PlayListContext);
  if (context === null) {
    throw new Error(
      "usePlayListContext must be used within a PlayListContextProvider"
    );
  }
  return context;
};

export default usePlayListContext;
