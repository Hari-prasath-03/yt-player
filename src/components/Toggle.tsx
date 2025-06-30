import { Moon, Sun } from "lucide-react";
import React from "react";

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
};

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  label,
  className,
}) => {
  
  return (
    <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
      {label && <span className="text-sm hidden md:block">{label}</span>}
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={isOn}
        className={`w-10 h-5.5 md:w-12 md:h-6.5 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer 
          ${isOn ? "theme-dark-grad" : "theme-light-grad"}`}
      >
        <div
          className={`size-4 md:size-5 bg-neutral-50 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
            ${isOn ? "translate-x-4 md:translate-x-5" : "translate-x-0"}`}
        >
          {isOn ? (
            <Moon className="text-neutral-500" size={16} />
          ) : (
            <Sun className="text-neutral-500" size={16} />
          )}
        </div>
      </button>
    </div>
  );
};

export default Toggle;
