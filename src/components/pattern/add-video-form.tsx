import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Video, VideoContextType } from "@/contextApi/VideoContext";
import { useState } from "react";

interface IProps {
  setCurrentVideo: (value: string) => void;
}

const AddVideoForm = ({
  videos,
  setVideos,
  setCurrentVideo,
}: VideoContextType & IProps) => {
  const [form, setForm] = useState<Video>({
    name: "",
    description: "",
    url: "",
    file: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setForm({ ...form, file: objectUrl, url: "" }); // clear url if uploading
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.description || (!form.url && !form.file)) return;
    setVideos([form, ...videos]);
    setCurrentVideo(form.url || form.file!);
    setForm({ name: "", description: "", url: "", file: "" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white w-64 h-16 text-2xl">+ Add New Video</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Video</AlertDialogTitle>

            <AlertDialogDescription>
              Fill in the details of a video to add it.
            </AlertDialogDescription>
          </AlertDialogHeader>

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

            <div className="flex items-center space-x-2">
              <label className="text-s">Or upload file:</label>
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button type="submit">Add Video</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddVideoForm;
