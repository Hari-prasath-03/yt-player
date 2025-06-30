const Steps = () => {
  const steps = [
    {
      title: "Choose a Playlist Type",
      description: 'Click on create playlist button to get started.',
    },
    {
      title: "Add YouTube URLs",
      description: "Open YouTube, find a video you like and copy the URL and add it to the playlist.",
    },
    {
      title: "Start Playing",
      description: "As soon as a video is added, click on the play button and start playing the audio.",
    },
    {
      title: "Control the Playback",
      description: "Add more URLs, playback follows playlist order.",
    },
  ];

  return (
    <div className="p-2 py-7 font-delius md:mx-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-4 text-center">
        🎧 How to Play YouTube Audio
      </h2>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={index}
            className="p-4 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700"
          >
            <h3 className="text-md font-bold mb-2">
              {`Step ${index + 1}: ${step.title}`}
            </h3>
            <p className="text-sm leading-relaxed text-text-muted dark:text-dark-text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Steps;
