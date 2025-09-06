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
  const [open, setOpen] = useState<boolean>(false);

  const [form, setForm] = useState<Video>({
    name: "",
    description: "",
    url: "",
    file: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when user types
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setForm({ ...form, file: objectUrl, url: "" }); // clear url if uploading
      setErrors({ ...errors, file: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Video name is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.url?.trim() && !form.file) {
      newErrors.url = "Provide either a YouTube URL or upload a video file.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setVideos([form, ...videos]);
    setCurrentVideo(form.url || form.file!);
    setForm({ name: "", description: "", url: "", file: "" });
    setErrors({});
    setOpen(false);
  };

  const handleCloseModal = () => {
    setForm({ name: "", description: "", url: "", file: "" });
    setErrors({});
    // setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleCloseModal}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white w-64 h-16 text-2xl hover:bg-blue-800 hover:cursor-pointer hover:text-white"
        >
          + Add New Video
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Video</AlertDialogTitle>

            <AlertDialogDescription>
              Fill in the details of a video to add it.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 mb-4">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Video Name"
                className="p-2 border rounded-lg w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Video Description"
                className="p-2 border rounded-lg w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="YouTube Embed URL (https://www.youtube.com/embed/...)"
                className="p-2 border rounded-lg w-full"
              />
              {errors.url && (
                <p className="text-red-500 text-sm">{errors.url}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-s">Or upload file:</label>
              <input
                type="file"
                accept="video/*"
                className="border rounded-lg p-2 shadow cursor-pointer hover:bg-accent"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>

            <Button type="submit">Add Video</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddVideoForm;
