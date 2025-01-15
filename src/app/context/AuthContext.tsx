"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import toast from "react-hot-toast";

interface AuthContextType {
  user: object | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  createMovie: (
    title: string,
    publishingYear: string,
    poster: File,
    videoUrl?: string
  ) => Promise<void>;
  getMoviesList: () => void;
  getMovieById: (id: string) => Promise<void>;
  editMovieById: (
    id: string,
    title: string,
    publishingYear: string,
    poster?: File,
    videoUrl?: string
  ) => Promise<void>;
  deleteMovieById: (id: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { navigate } = useCustomNavigate();
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Function to handle signup
  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/auth/auth", {
        method: "POST",
        body: JSON.stringify({
          action: "signup",
          firstName,
          lastName,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        toast.success("User created successfully!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Function to handle login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/auth", {
        method: "POST",
        body: JSON.stringify({ action: "login", email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        sessionStorage.setItem("access_token", data?.token);
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  const createMovie = async (
    title: string,
    publishingYear: string,
    poster: File,
    videoUrl?: string
  ) => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Unauthorized. Please log in first.");
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      formData.append("poster", poster);
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }

      // Send POST request to create movie
      const response = await fetch("/api/auth/movies", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`, // Include token in Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Movie created successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to create movie.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const getMoviesList = async() => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Unauthorized. Please log in first.");
      }
      const response = await fetch("/api/auth/movies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`, // Include token in Authorization header
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data?.data || [];
      } else {
        toast.error(data.message || "Failed to create movie.");
        return [];
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
        return [];
      } else {
        toast.error("Something went wrong. Please try again.");
        return [];
      }
    }
  };

  const getMovieById = async (id: string) => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Unauthorized. Please log in first.");
      }
      const response = await fetch(`/api/auth/movies?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`, // Include token in Authorization header
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data?.data;
      } else {
        toast.error(data.message || "Failed to create movie.");
      }
    }  catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  const editMovieById = async (
    id: string,
    title: string,
    publishingYear: string,
    poster?: File,
    videoUrl?: string
  ) => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Unauthorized. Please log in first.");
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      if (poster) {
        formData.append("poster", poster);
      }
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }

      // Send PUT request to update the movie
      const response = await fetch(`/api/auth/movies?id=${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Movie updated successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to update movie.");
      }
    }  catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  const deleteMovieById = async (id: string) => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("Unauthorized. Please log in first.");
      }

      // Send DELETE request to remove the movie
      const response = await fetch(`/api/auth/movies?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Movie deleted successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to delete movie.");
      }
    }  catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully!");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        createMovie,
        getMoviesList,
        getMovieById,
        deleteMovieById,
        editMovieById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
