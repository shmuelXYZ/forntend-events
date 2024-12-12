import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "./Input";
import { X } from "lucide-react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  rowData: any;
  columns: string[];
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  rowData,
  columns,
}) => {
  const [formData, setFormData] = useState(rowData);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasChanges = () => {
    return Object.keys(formData).some((key) => formData[key] !== rowData[key]);
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    setIsDirty(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasChanges()) {
      setIsLoading(true);
      try {
        const changedData = Object.keys(formData).reduce((acc: any, key) => {
          if (
            formData[key] !== rowData[key] &&
            !["password", "updatedAt", "createdAt"].includes(key)
          ) {
            acc[key] = formData[key];
          }
          return acc;
        }, {});

        changedData.id = rowData.id;
        await onSave(changedData);
        onClose();
      } catch (err) {
        setError("Failed to save changes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header - now with better spacing and alignment */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Edit Record
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {columns
              .filter((col) => col !== "id")
              .map((column) => (
                <Input
                  key={column}
                  label={column.replace("_", " ").toUpperCase()}
                  value={formData[column] || ""}
                  onChange={(e) => handleChange(column, e.target.value)}
                  placeholder={`Enter ${column
                    .replace("_", " ")
                    .toLowerCase()}`}
                  type={column.includes("date") ? "date" : "text"}
                />
              ))}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </form>
        </div>

        {/* Footer with actions - fixed at bottom */}
        <div className="border-t p-6">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isDirty || !hasChanges() || isLoading}
              className={`px-6 py-2 rounded-lg font-medium flex items-center justify-center min-w-[100px]
                ${
                  isDirty && hasChanges() && !isLoading
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-200 text-gray-400"
                }
                transition-all duration-200 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Saving...
                </motion.div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditModal;
