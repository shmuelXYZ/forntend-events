import React, { useState, FormEvent } from "react";
import { Filter, Search, X } from "lucide-react";
import Input from "./Input";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface FilterModalProps {
  columns: string[];
  onFilter: (filters: Record<string, string>) => void;
  onReset: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  columns,
  onFilter,
  onReset,
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  // Create a ref to call form submit programmatically
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value.trim() !== "")
    );
    if (Object.keys(activeFilters).length > 0) {
      onFilter(activeFilters);
      setIsOpen(false);
    } else {
      toast.error("Please enter at least one filter criteria");
    }
  };

  const handleReset = () => {
    setFilterValues({});
    onReset();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter
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
                Filter Records
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
              <form id="filterForm" onSubmit={handleSearch}>
                {columns
                  // .filter((col) => col !== "id")
                  .map((column) => (
                    <div key={column} className="mb-4">
                      <Input
                        label={column.replace("_", " ").toUpperCase()}
                        value={filterValues[column] || ""}
                        onChange={(e) =>
                          setFilterValues((prev) => ({
                            ...prev,
                            [column]: e.target.value,
                          }))
                        }
                        placeholder={`Filter by ${column.toLowerCase()}`}
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
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-slate-300 text- hover:text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  form="filterForm" // Connect to form by id
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                      flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterModal;
