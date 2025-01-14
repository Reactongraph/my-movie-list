"use client";

import { Header } from "@/app/component/header/header";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function CreateMovie() {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-[#0A2733] flex flex-col items-center pt-16 relative overflow-hidden">
      {/* Main content */}
      <Header />

      <div className="w-full max-w-4xl px-6 py-10 z-10">
        <h1 className="text-white text-3xl font-medium mb-8">
          Create a new movie
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
            {image ? (
              <img
                src={image}
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
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-[#1E3A47] bg-opacity-50 rounded px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#40F99B]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Video Url"
                className="w-full bg-[#1E3A47] bg-opacity-50 rounded px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#40F99B]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Publishing year"
                className="w-full bg-[#1E3A47] bg-opacity-50 rounded px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#40F99B]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="flex-1 bg-[#1E3A47] bg-opacity-50 text-white rounded py-3 font-medium hover:bg-opacity-75 transition-opacity"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#40F99B] text-white rounded py-3 font-medium hover:bg-opacity-90 transition-opacity"
              >
                Submit
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
