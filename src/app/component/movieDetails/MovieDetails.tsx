"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import useCustomAuth from "@/app/hooks/useCustomAuth";
import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { ScreenLoader } from "../common/ScreenLoader";
import { Header } from "../header/header";

interface MovieProps {
  title: string;
  publishingYear: string;
  poster: string;
  videoUrl?: string | undefined | "undefined";
}

function MovieDetailsContent() {
  const searchParams = useSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const { getMovieById } = useAuth();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getMovieById(id as string).then((data) => {
        if (data ?? []) {
          setMovie(data ?? null);
        }
      });
    }
  }, [id]);

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white relative">
      <Header />

      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 py-8">
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={movie?.poster ?? "/images/dummy.jpeg"}
                alt={`${movie?.title} Poster`}
                className="w-full h-auto"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-emerald-400 hover:bg-emerald-500 text-black p-4 rounded-full transition-colors"
                    aria-label="Play video"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    movie?.videoUrl ?? ""
                  )}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-black py-3 rounded-md font-medium transition-colors"
              >
                {isPlaying ? "Pause" : "Play Movie"}
              </button>
              <button
                className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-md font-medium transition-colors"
                onClick={() => setIsPlaying(false)}
              >
                Stop
              </button>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{movie?.title}</h1>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-lg">{movie?.publishingYear}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-48">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] opacity-50 transform -skew-y-2"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] transform skew-y-3"></div>
        </div>
      </div>
    </div>
  );
}

export default function MovieDetails() {
  useCustomAuth()
  return (
    <Suspense fallback={<ScreenLoader />}>
      <MovieDetailsContent />
    </Suspense>
  );
}
