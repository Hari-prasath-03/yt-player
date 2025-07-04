import { Toaster } from "react-hot-toast";
import PlayerContextProvider from "./context/PlayerContext";
import Routers from "./routes/Routers";
import { PlayListContextProvider } from "./context/PlayListContext";

const App = () => {
  return (
    <PlayListContextProvider>
      <PlayerContextProvider>
        <Toaster />
        <Routers />
      </PlayerContextProvider>
    </PlayListContextProvider>
  );
};

export default App;
