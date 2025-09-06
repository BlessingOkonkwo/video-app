import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAutoplayUrl } from "@/lib/utils";

interface IProps {
  currentVideo: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const VideoPlayerModal = ({ currentVideo, open, setOpen }: IProps) => {
  const isYouTube = !!currentVideo && currentVideo.includes("youtube.com");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Play Video</Button>
      </DialogTrigger> */}
      <DialogContent
        showCloseButton={false}
        className="p-0 border-none !max-w-5xl w-full"
      >
        <div className="sr-only">
          <DialogHeader>
            <DialogTitle>Video</DialogTitle>
          </DialogHeader>
        </div>

        <div className="w-full max-w-3x mb-">
          <div className="aspect-w-16 aspect-h-9 aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
            {!currentVideo ? (
              <p className="text-white flex items-center justify-center h-full">
                No video selected
              </p>
            ) : isYouTube ? (
              <iframe
                src={getAutoplayUrl(currentVideo)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <iframe
                src={currentVideo}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              //   <video
              //     src={currentVideo}
              //     controls
              //     autoPlay
              //     className="w-full h-full"
              //   />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
