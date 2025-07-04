import { Link } from "react-router-dom";
import useThemes from "../hooks/useThemes";
import Toggle from "./Toggle";
import { Library } from "lucide-react";

const Header = () => {
  const [isDark, toggleTheme] = useThemes();
  return (
    <div className="flex relative flex-col items-center justify-center pt-14 md:pt-10 pb-5 gap-0.5 md:gap-2 font-surfer border-b border-neutral-300 dark:border-neutral-700">
      <Link to="/" className="text-2xl md:text-4xl">Yt Audio Playeer</Link>
      <h3 className="text-base md:text-xl">
        Create your own Playlist of audio tracks
      </h3>

      <div className="absolute cursor-pointer top-5 left-3 md:top-12 md:left-8 inline-flex items-center gap-2 group">
        <Library className="transition-colors duration-200 group-hover:text-blue-600" />
        <Link
          to="/your-library"
          className="transition-colors duration-200 group-hover:text-blue-600 group-hover:underline"
        >
          Your Library
        </Link>
      </div>

      <Toggle
        isOn={isDark}
        onToggle={toggleTheme}
        label="Theme"
        className="absolute top-5 right-3 md:top-12 md:right-8"
      />
    </div>
  );
};

export default Header;
