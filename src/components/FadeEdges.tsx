const FadeEdges = ({
  children,
  left = true,
  right = true,
  className = "",
}: {
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
  className?: string;
}) => {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {left && (
        <div className="absolute left-0 top-0 h-full w-8 z-10 bg-gradient-to-r from-neutral-200/50 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {right && (
        <div className="absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-neutral-200/50 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  );
};

export default FadeEdges;
