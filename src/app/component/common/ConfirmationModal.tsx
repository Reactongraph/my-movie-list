interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieTitle: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#0a192f] border border-gray-800 rounded-xl p-6 w-full max-w-md m-4 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">
          Delete Confirmation
        </h2>
        <p className="text-gray-300 mb-6">
         {` Are you sure you want to delete ${movieTitle}? This action cannot be
          undone.`}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
