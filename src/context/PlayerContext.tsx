/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

type PlayerContextType = {
  isStepsReaded: boolean;
  urlList: UrlElement[];
  currentUrl: string;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setUrlList: React.Dispatch<React.SetStateAction<UrlElement[]>>;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsStepsReaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UrlElement = {
  ytVideoId: string;
  title: string;
  isPlaying: boolean;
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const contextValue = {
    isStepsReaded,
    urlList,
    currentUrl,
    isPlaying,
    setUrlList,
    setCurrentUrl,
    setIsStepsReaded,
    setIsPlaying,
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
