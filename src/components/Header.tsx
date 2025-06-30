import useThemes from "../hooks/useThemes";
import Toggle from "./Toggle";

const Header = () => {
  const [isDark, toggleTheme] = useThemes();
  return (
    <div className="flex relative flex-col items-center justify-center pt-10 pb-5 gap-2 font-surfer border-b border-neutral-300 dark:border-neutral-700">
      <h1 className="text-2xl md:text-4xl">Yt Audio Player</h1>
      <h3 className="text-base md:text-xl">
        Create your own Playlist of audio tracks
      </h3>

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
