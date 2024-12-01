const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => (
  <div className="relative">
      <video controls className="w-full rounded">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
      </video>
  </div>
);

export default VideoPlayer;
