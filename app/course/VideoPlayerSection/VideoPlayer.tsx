import React from "react";
import api from "../../api/axios";

interface VideoPlayerProps {
  selectedContent: {
    contentId: string;
    type: string; // "video" or "pdf"
    title: string;
    url: string;
    parentTopic: string; // Added parent topic for API compatibility
  } | null;
  userId: string;
  courseId: string;
  refreshSidebar: () => void; // Callback to refresh the Sidebar after marking complete
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  selectedContent,
  userId,
  courseId,
  refreshSidebar,
}) => {
  if (!selectedContent) {
    return <p>Please select a content to view.</p>;
  }

  const { url, title, type, contentId, parentTopic } = selectedContent;

  const handleMarkComplete = async () => {
    console.log(`Marking content ${contentId} with parent ${parentTopic} as completed`);
    try {
      await api.put(`/user-courses/${userId}/${courseId}/content-status`, {
        parentTopicId: parentTopic,
        contentId,
        status: "Completed",
      });
      // refreshSidebar(); // Refresh the Sidebar to show the updated status
      alert("Content marked as completed!");
    } catch (error) {
      console.error("Error updating content status:", error);
      alert("Failed to mark content as completed. Please try again.");
    }
  };

  return (
    <div className="video-player-section">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleMarkComplete}
        >
          Mark as Complete
        </button>
      </div>
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
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            url
          )}&embedded=true`}
          title={title}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
