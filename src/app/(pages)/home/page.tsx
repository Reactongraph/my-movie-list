"use client";

import { useState, useEffect } from "react";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import { useAuth } from "@/app/context/AuthContext";
import { Header } from "@/app/component/header/header";
import { ScreenLoader } from "@/app/component/common/ScreenLoader";
import MovieCard from "@/app/component/movieCard/MovieCard";
import Link from "next/link";
import { DeleteConfirmationModal } from "@/app/component/common/ConfirmationModal";

type Movie = {
  _id: string;
  title: string;
  publishingYear: string;
  poster: string;
};
export default function HomePage() {
  const { getMoviesList, deleteMovieById } = useAuth();
  const { navigate } = useCustomNavigate();
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");
  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const moviesList = await getMoviesList();
        setMovies(moviesList ?? []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [getMoviesList]);

  const handleEdit = (id: string) => {
    navigate(`/create-movie/?id=${id}`);
  };
  const handleDelete = async (id: string, title: string) => {
    setId(id);
    setMovieTitle(title);
    setShowConfirmModal(true);
  };
  const deleteMovie = async () => {
    await deleteMovieById(id);
    setShowConfirmModal(false)
    navigate('/')
  };
  const closeModal = () => {
    setShowConfirmModal(false);
  };
  const handleNavigate = (id: string) => {
    navigate(`/movie/?id=${id}`);
  };
  return (
    <div className="min-h-screen max-w-[1200px] m-auto">
      <Header />
      <ScreenLoader isLoading={isLoading} />
      <DeleteConfirmationModal
        isOpen={showConfirmModal}
        onClose={closeModal}
        onConfirm={deleteMovie}
        movieTitle={movieTitle}
      />
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-left z-10">
          <h1 className="text-white text-4xl font-medium mb-8 ">My Movies</h1>
          {movies?.length === 0 ? (
            <>
              <h1 className="text-white text-4xl font-medium mb-8">
                Your movie list is empty
              </h1>
              <Link
                href="/create-movie"
                className="inline-block bg-[#40F99B] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-opacity"
              >
                Add a new movie
              </Link>
            </>
          ) : (
            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {movies?.map((movie, index) => (
                <MovieCard
                  key={index}
                  id={movie?._id}
                  title={movie.title}
                  publishingYear={movie.publishingYear}
                  imageUrl={movie.poster}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  handleNavigate={handleNavigate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="relative h-48">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] opacity-50 transform -skew-y-2"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] transform skew-y-3"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
