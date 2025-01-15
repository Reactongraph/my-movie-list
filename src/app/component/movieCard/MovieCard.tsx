import { Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";
interface MovieCardProps {
  id: string;
  title: string;
  publishingYear: string;
  imageUrl: string;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  handleNavigate: (id: string) => void;
}

export default function MovieCard({
  id,
  title,
  publishingYear,
  imageUrl,
  onEdit,
  onDelete,
  handleNavigate,
}: MovieCardProps) {
  return (
    <div className="max-w-sm bg-white  shadow dark:bg-gray-800 dark:border-gray-700 relative group">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-[#1a3b54] bg-[#0A2733] transition-transform duration-300 group-hover:scale-105  min-h-[550px]">
        {/* Image Container */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg max-h-[400px]"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4  ">
            <button
              onClick={() => handleNavigate(id)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer "
              aria-label={`Edit ${title}`}
            >
              <Eye className="w-6 h-6 cursor-pointer" />
            </button>
            <button
              onClick={() => onEdit(id)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer "
              aria-label={`Edit ${title}`}
            >
              <Edit className="w-6 h-6 cursor-pointer" />
            </button>
            <button
              onClick={() => onDelete(id, title)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              aria-label={`Delete ${title}`}
            >
              <Trash2 className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A2733] z-[-9]"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          <a href="#">
            <h3 className="text-xl font-medium text-white mb-1">{title}</h3>
          </a>
          <p className="text-gray-300">{publishingYear}</p>
        </div>
      </div>
    </div>
  );
}
