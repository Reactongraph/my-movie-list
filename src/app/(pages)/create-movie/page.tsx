"use client";

import { Header } from "@/app/component/header/header";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import { useDropzone } from "react-dropzone";
import CommonInput from "@/app/component/common/CommonInput";
import toast from "react-hot-toast";
import { ScreenLoader } from "@/app/component/common/ScreenLoader";

interface MovieProps {
  title: string;
  publishingYear: string;
  poster: string;
  videoUrl?: string;
}

function CreateMovieContent() {
  const { createMovie, editMovieById } = useAuth();
  const { getMovieById } = useAuth();
  const { navigate } = useCustomNavigate();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [poster, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [publishingYear, setPublishingYear] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      getMovieById(id as string).then((data) => {
        if (data ?? []) {
          setMovie(data ?? null);
        }
      });
    }
  }, [id]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(imageUrl);
    }
  }, []);

  useEffect(() => {
    if (movie) {
      setPreview(movie?.poster);
      setTitle(movie?.title);
      // setImage(movie?.poster);
      setVideoUrl(movie?.videoUrl || "");
      setPublishingYear(movie?.publishingYear);
    }
  }, [movie]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });
  const handleCreateMovie = async () => {
    if (!poster) {
      toast.error("Please upload a poster image.");
      return;
    }
    if (id) {
      await editMovieById(
        id,
        title,
        publishingYear,
        poster || preview,
        videoUrl || ""
      );
    } else {
      await createMovie(title, publishingYear, poster, videoUrl || "");
    }
    await createMovie(title, publishingYear, poster, videoUrl || "");
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-[#0A2733] flex flex-col items-center pt-16 relative overflow-hidden">
      {/* Main content */}
      <Header />

      <div className="w-full max-w-4xl px-6 py-10 z-10">
        <h1 className="text-white text-3xl font-medium mb-8">
          {id ? "Edit Movie" : "Create a new movie"}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image upload area */}
          <div
            {...getRootProps()}
            className={`
              aspect-square border-2 border-dashed rounded-lg
              flex items-center justify-center
              cursor-pointer
              transition-colors
              ${isDragActive ? "border-[#40F99B]" : "border-gray-400"}
              hover:border-[#40F99B]
            `}
          >
            <input {...getInputProps()} />
            {preview ? (
              <Image
                src={preview}
                alt="Movie preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-400 text-center">Drop an image here</p>
            )}
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <div>
              <CommonInput
                name="title"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <CommonInput
                name="video"
                type="text"
                placeholder="Video Url"
                onChange={(e) => setVideoUrl(e.target.value)}
                value={videoUrl}
              />
            </div>
            <div>
              <CommonInput
                name="year"
                type="text"
                placeholder="Publishing Year"
                onChange={(e) => setPublishingYear(e.target.value)}
                value={publishingYear}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="flex-1 bg-[#1E3A47] bg-opacity-50 text-white rounded py-3 font-medium hover:bg-opacity-75 transition-opacity"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 bg-[#40F99B] text-white rounded py-3 font-medium hover:bg-opacity-90 transition-opacity"
                onClick={() => handleCreateMovie()}
              >
                {id ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-48">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] opacity-50 transform -skew-y-2"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] transform skew-y-3"></div>
        </div>
      </div>
    </div>
  );
}

export default function CreateMovie() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <CreateMovieContent />
    </Suspense>
  );
}
