import { Header } from "@/app/component/header/header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A2733]">
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center z-10">
          <h1 className="text-white text-4xl font-medium mb-8">
            Your movie list is empty
          </h1>

          <Link
            href="/create-movie"
            className="inline-block bg-[#40F99B] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-opacity"
          >
            Add a new movie
          </Link>
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
