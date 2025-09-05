"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Video = {
  name: string;
  description: string;
  url: string;
};

export type VideoContextType = {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([
    {
      name: "React Crash Course",
      description: "Learn the basics of React in one video",
      url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    },
    {
      name: "Next.js Tutorial",
      description: "Introduction to Next.js framework",
      url: "https://www.youtube.com/embed/1WmNXEVia8I",
    },
    {
      name: "Tailwind CSS Tutorial",
      description: "Build modern UIs with Tailwind CSS",
      url: "https://www.youtube.com/embed/dFgzHOX84xQ",
    },
    {
      name: "JavaScript Basics",
      description: "Understand the fundamentals of JavaScript",
      url: "https://www.youtube.com/embed/PkZNo7MFNFg",
    },
    {
      name: "TypeScript Tutorial",
      description: "Learn TypeScript for JavaScript developers",
      url: "https://www.youtube.com/embed/BwuLxPH8IDs",
    },
    {
      name: "Node.js Crash Course",
      description: "Learn backend development with Node.js",
      url: "https://www.youtube.com/embed/fBNz5xF-Kx4",
    },
    {
      name: "Express.js Tutorial",
      description: "Learn how to build APIs with Express.js",
      url: "https://www.youtube.com/embed/L72fhGm1tfE",
    },
    {
      name: "MongoDB Tutorial",
      description: "Get started with MongoDB database",
      url: "https://www.youtube.com/embed/-56x56UppqQ",
    },
    {
      name: "React Hooks Tutorial",
      description: "Understand useState and useEffect hooks",
      url: "https://www.youtube.com/embed/f687hBjwFcM",
    },
    {
      name: "Redux Tutorial",
      description: "State management with Redux",
      url: "https://www.youtube.com/embed/poQXNp9ItL4",
    },
  ]);

  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
