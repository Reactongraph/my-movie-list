"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import { UserCircle, LogOut, ChevronDown } from "lucide-react";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function Header() {
  const { logout } = useAuth();
  const { navigate } = useCustomNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const username = user ? `${user.firstName} ${user.lastName}` : "Guest";
  const email = user ? user.email : "Guest";
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0A2733] bg-opacity-95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">
              MovieList
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Movies
            </Link>
            <button
              className="bg-[#40F99B] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity"
              onClick={() => navigate("/create-movie")}
            >
              Add Movie
            </button>
            <div className="ml-4 relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#40F99B] focus:ring-opacity-50 rounded-full p-1"
              >
                <UserCircle className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p className="font-medium">{username}</p>
                      <p className="text-gray-500">{email}</p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700"
                      role="menuitem"
                      onClick={logout}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
