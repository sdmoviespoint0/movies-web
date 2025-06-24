import { useState } from "react";

export default function YouTubeData() {
  const [video, setVideo] = useState(null);
  const VIDEO_ID = "ltkunl0kTps";

  const fetchYouTubeData = async () => {
    const API_KEY = "AIzaSyD8lxJ9wfapbp_UMkzhVwMGUcBAoPgRsTw";

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${VIDEO_ID}&key=${API_KEY}`
      );
      console.log("Response",res);
      
      const data = await res.json();
      setVideo(data.items[0]);
    } catch (error) {
      console.error("YouTube API Error:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchYouTubeData}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Fetch YouTube Video Info
      </button>

      {video && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{video.snippet.title}</h2>
          <p>{video.snippet.description}</p>
          <img
            src={video.snippet.thumbnails.medium.url}
            alt="Thumbnail"
            className="mt-2 rounded"
          />
          <p className="mt-2 text-gray-700">
            Views: {video.statistics.viewCount}
          </p>
        </div>
      )}
      <div className="aspect-video w-full max-w-3xl mx-auto">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${VIDEO_ID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
}
