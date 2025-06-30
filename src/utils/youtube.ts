/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).YT && (window as any).YT.Player) return resolve();

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => reject("YouTube API script failed to load");
    document.body.appendChild(script);

    (window as any).onYouTubeIframeAPIReady = () => resolve();
  });
};

