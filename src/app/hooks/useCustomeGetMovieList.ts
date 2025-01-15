"use client"

import { useAuth } from "../context/AuthContext"

export function useCustomGetMovieList(){
    const { getMoviesList}= useAuth()
    return getMoviesList
}