/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export type PlayerContextType = {
  isStepsReaded: boolean;
  urlList: UrlElement[];
  currentUrl: string;
  isPlaying: boolean;
  currentIndex: number;
  colapseMenuId: (UrlElement & { index: number }) | null;
  setColapseMenuId: React.Dispatch<
    React.SetStateAction<(UrlElement & { index: number }) | null>
  >;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setUrlList: React.Dispatch<React.SetStateAction<UrlElement[]>>;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsStepsReaded: React.Dispatch<React.SetStateAction<boolean>>;
  syncUrlList: () => void;
};

export type UrlElement = {
  ytVideoId: string;
  title: string;
  isPlaying: boolean;
  isFavourite: boolean;
};

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStepsReaded, setIsStepsReaded] = useState(() => {
    const stepsReaded = localStorage.getItem("stepsReaded");
    return stepsReaded ? JSON.parse(stepsReaded) : false;
  });
  const [urlList, setUrlList] = useState<UrlElement[]>(() => {
    const savedUrlList = localStorage.getItem("urlList");
    return savedUrlList ? JSON.parse(savedUrlList) : [];
  });
  const [colapseMenuId, setColapseMenuId] = useState<
    (UrlElement & { index: number }) | null
  >(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const syncUrlList = () => {
    localStorage.setItem("urlList", JSON.stringify(urlList));
  };

  useEffect(() => {
    syncUrlList();
  }, [urlList]);

  const contextValue = {
    isStepsReaded,
    urlList,
    currentUrl,
    currentIndex,
    isPlaying,
    colapseMenuId,
    setColapseMenuId,
    setUrlList,
    setCurrentUrl,
    setIsStepsReaded,
    setIsPlaying,
    setCurrentIndex,
    syncUrlList,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    );
  }
  return context;
};
