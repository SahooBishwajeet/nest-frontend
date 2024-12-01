import React from "react";

interface VideoPlayerProps {
  selectedContent: {
    contentId: string;
    type: string; // "video" or "pdf"
    title: string;
    url: string;
  } | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, type }) => {
  if (!url || !title || !type) {
    return <p>Please select a content to view.</p>;
  }

  return (
    <div className="video-player-section">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {type === "video" ? (
        <video
          className="w-full rounded-md shadow-lg"
          controls
          preload="metadata"
          src={url}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <iframe
        className="w-full h-[75vh] rounded-md shadow-lg"
        src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          title={title}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
