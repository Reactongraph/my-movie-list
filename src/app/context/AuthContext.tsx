"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import toast from "react-hot-toast";

interface AuthContextType {
  user: object | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
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
    } catch (error) {
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
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
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
