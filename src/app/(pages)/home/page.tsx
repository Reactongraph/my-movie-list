"use client";

import { useState, useEffect } from "react";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import { useAuth } from "@/app/context/AuthContext";
import useCustomAuth from "@/app/hooks/useCustomAuth";
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
  useCustomAuth();
  const { getMoviesList, deleteMovieById } = useAuth();
  const { navigate } = useCustomNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 6;

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

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

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
    setShowConfirmModal(false);
    // navigate("/");
    location.reload();
  };

  const closeModal = () => {
    setShowConfirmModal(false);
  };

  const handleNavigate = (id: string) => {
    navigate(`/movie/?id=${id}`);
  };

  // Pagination controls
  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className=" max-w-[1200px] m-auto">
      <ScreenLoader isLoading={isLoading} />
      <DeleteConfirmationModal
        isOpen={showConfirmModal}
        onClose={closeModal}
        onConfirm={deleteMovie}
        movieTitle={movieTitle}
      />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="text-left z-10 my-[70px]">
          <h1 className="text-white text-4xl font-medium mb-8">My Movies</h1>
          {movies.length === 0 ? (
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
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {currentMovies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    id={movie._id}
                    title={movie.title}
                    publishingYear={movie.publishingYear}
                    imageUrl={movie.poster}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    handleNavigate={handleNavigate}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        <button
          className={`px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of {Math.ceil(movies.length / moviesPerPage)}
        </span>
        <button
          className={`px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors ${
            currentPage === Math.ceil(movies.length / moviesPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          } `}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
