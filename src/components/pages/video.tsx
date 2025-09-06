"use client";
import VideoItem from "@/components/pattern/video-item";
import { useVideoContext } from "@/contextApi/VideoContext";
import React, { useState } from "react";
import AddVideoForm from "../pattern/add-video-form";
import VideoPlayerModal from "../pattern/video-player-modal";
import { getAutoplayUrl } from "@/lib/utils";

const VideoPage = () => {
  //   const [videos, setVideos] = useState([
  //     {
  //       name: "React Crash Course",
  //       description: "Learn the basics of React in one video",
  //       url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
  //     },
  //   ]);
  const { videos, setVideos } = useVideoContext();
  const [currentVideo, setCurrentVideo] = useState(
    videos[0].url || videos[0].file
  );
  const [playerOpen, setPlayerOpen] = useState<boolean>(false);

  const handleDelete = (url: string) => {
    const updated = videos.filter((v) => v.url !== url);
    setVideos(updated);
    if (currentVideo === url && updated.length > 0) {
      setCurrentVideo(updated[0].url);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 fle flex-col items-center">
      <div className="w-full flex justify-end mb-6">
        <AddVideoForm
          videos={videos}
          setVideos={setVideos}
          setCurrentVideo={setCurrentVideo}
        />
      </div>

      {/* Video Player */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-3xl mb-6 aspect-video bg-black rounded-2xl shadow-lg overflow-hidden">
          {/* <iframe
            src={currentVideo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe> */}

          {currentVideo?.startsWith("blob:") ? (
            <video
              src={currentVideo}
              controls
              autoPlay={false} // prevent autoplay
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={currentVideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Add Video Form */}
      {/* <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 mb-6 w-full max-w-2xl"
      >
        <h2 className="text-xl font-semibold mb-4">Add a New Video</h2>
        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Video Name"
            className="p-2 border rounded-lg w-full"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Video Description"
            className="p-2 border rounded-lg w-full"
          />
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="YouTube Embed URL (https://www.youtube.com/embed/...)"
            className="p-2 border rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Video
          </button>
        </div>
      </form> */}

      <div className="w-full">
        {videos.length === 0 && (
          <p className="text-gray-500">No videos added yet.</p>
        )}

        {videos.length > 0 && (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(327px,1fr))]">
            {videos.map((video, i) => (
              <VideoItem
                key={i}
                description={video.description}
                title={video.name}
                url={video.url}
                file={video.file}
                handleDelete={handleDelete}
                setCurrentVideo={setCurrentVideo}
                setVideoPlayer={setPlayerOpen}
              />
            ))}
          </div>
        )}
      </div>

      <VideoPlayerModal
        open={playerOpen}
        setOpen={setPlayerOpen}
        currentVideo={currentVideo!}
      />

      {/* Video List */}
      {/* <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(327px,1fr))]">
        <h2 className="text-xl font-semibold mb-4">Video List</h2>
        {videos.length === 0 ? (
          <p className="text-gray-500">No videos added yet.</p>
        ) : (
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-bold">{video.name}</p>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setCurrentVideo(video.url)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                  >
                    Watch
                  </button>
                  <button
                    onClick={() => handleDelete(video.url)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default VideoPage;
