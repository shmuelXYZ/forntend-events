import React, { useState, FormEvent } from "react";
import { Plus, X } from "lucide-react";
import Input from "./Input";
import { motion } from "framer-motion";

interface CreateModalProps {
  columns: string[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

const CreateModal: React.FC<CreateModalProps> = ({ columns, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Omit id field when sending to server
      const { id, ...dataToSubmit } = formData;
      await onSubmit(dataToSubmit);
      setFormData({});
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create
      </button>

      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Create New Record
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable form area */}
            <div className="flex-1 overflow-y-auto p-6">
              <form id="createForm" onSubmit={handleSubmit}>
                {columns
                  .filter((col) => col !== "id") // Remove ID field
                  .map((column) => (
                    <div key={column} className="mb-4">
                      <Input
                        label={column.replace("_", " ").toUpperCase()}
                        value={formData[column] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [column]: e.target.value,
                          }))
                        }
                        placeholder={`Enter ${column.toLowerCase()}`}
                      />
                    </div>
                  ))}
              </form>
            </div>

            {/* Fixed footer with buttons */}
            <div className="border-t p-6">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="createForm"
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                    flex items-center disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateModal;

// flex items-center px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors
