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
    <div className="max-w-sm bg-white shadow-md dark:bg-gray-800 dark:border-gray-700 relative group rounded-lg overflow-hidden">
      {/* Card Container */}
      <div className="border-2 border-[#1a3b54] bg-[#0A2733] group-hover:scale-105 transition-all duration-300 ">
        {/* Image */}
        <div className="relative aspect-[5/6] w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-[300px] object-cover"
            width={0}
            height={0}
            sizes="100vw"
          />

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button
              onClick={() => handleNavigate(id)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label={`View ${title}`}
            >
              <Eye className="w-6 h-6" />
            </button>
            <button
              onClick={() => onEdit(id)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label={`Edit ${title}`}
            >
              <Edit className="w-6 h-6" />
            </button>
            <button
              onClick={() => onDelete(id, title)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label={`Delete ${title}`}
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-gray-300">{publishingYear}</p>
        </div>
      </div>
    </div>
  );
}
