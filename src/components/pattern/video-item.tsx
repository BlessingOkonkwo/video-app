import Image from "next/image";
import React from "react";

interface IProps {
  url?: string;
  title: string;
  description: string;
  setCurrentVideo: (val: string) => void;
  handleDelete: (val: string) => void;
  setVideoPlayer: (val: boolean) => void;
  file?: string;
}

const VideoItem = ({
  url,
  title,
  description,
  setCurrentVideo,
  handleDelete,
  setVideoPlayer,
  file,
}: IProps) => {
  const getYouTubeId = (url?: string) => {
    const match = url?.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const getThumbnail = (url?: string, file?: string) => {
    if (file) {
      return "/video-placeholder.png"; // static placeholder for local files
    }
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  };

  return (
    <div className="group relative rounded-lg bg-white shadow-md overflow-hiddden hover:shadow-lg hover:cursor-pointer transition p-2">
      <div className="w-full aspect-video object-cover rounded-md transition-all duration-300 group-hover:rounded-none">
        {file ? (
          <video
            src={file}
            className="w-full h-full object-cover"
            muted
            playsInline
            controls
          />
        ) : (
          <Image
            src={getThumbnail(url)}
            alt={title}
            width={100}
            height={100}
            className="w-full aspect-video object-cover rounded-md transition-all duration-300 group-hover:rounded-none"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      <div className="mt-auto flex space-x-2">
        <button
          onClick={() => {
            setCurrentVideo(url || file!);
            setVideoPlayer(true);
          }}
          className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
        >
          Watch
        </button>
        <button
          onClick={() => handleDelete(url || file!)}
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoItem;
