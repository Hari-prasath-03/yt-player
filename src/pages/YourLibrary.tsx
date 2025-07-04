import { MessageCirclePlus } from "lucide-react";
import usePlayListContext from "../context/PlayListContext";
import { useNavigate } from "react-router-dom";

const YourLibrary = () => {
  const { recentlyAdded, favourites } = usePlayListContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-full min-w-full md:min-w-xl mx-auto py-6 px-3 font-delius">
      {recentlyAdded.length > 0 && (
        <div
          onClick={() => navigate("/playlist/recently-added")}
          className="cursor-pointer text-2xl w-full inline-flex items-center gap-5 p-3 mb-4 shadow dark:shadow-gray-900 rounded-lg bg-neutral-200/70 dark:bg-neutral-800"
        >
          <MessageCirclePlus />
          <span>Recently added</span>
        </div>
      )}
      {favourites.length > 0 && (
        <div
          onClick={() => navigate("/playlist/favourites")}
          className="cursor-pointer text-2xl w-full inline-flex items-center gap-5 p-3 mb-4 shadow dark:shadow-gray-900 rounded-lg bg-neutral-200/70 dark:bg-neutral-800"
        >
          <MessageCirclePlus />
          <span>Favourites</span>
        </div>
      )}
    </div>
  );
};

export default YourLibrary;
