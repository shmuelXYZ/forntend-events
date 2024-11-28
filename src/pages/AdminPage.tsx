import React, { useState, useEffect } from "react";
import { Menu, Edit2, Trash2 } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";
import EditModal from "../components/EditModal";
import FilterModal from "../components/FilterModal";
import CreateModal from "../components/CreateModal";

interface TableRow {
  id: string;
  [key: string]: any;
}

const AdminPage = () => {
  const [tables] = useState<string[]>(["users", "events", "sales"]); // List of available tables
  const [tableData, setTableData] = useState<TableRow[]>([]); // Actual data for the selected table
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // side bar state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false); //state for the edit modal.
  const [editingRow, setEditingRow] = useState<TableRow | undefined>(undefined);
  const [originalData, setOriginalData] = useState<TableRow[]>([]); // Store unfiltered data
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when table selection changes.
  useEffect(() => {
    if (selectedTable) {
      fetchTableData(selectedTable);
    }
  }, [selectedTable]);

  const fetchTableData = async (tableName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(tableName);

      const { data } = await api.get(`/admin/${tableName}`);

      if (!data.data) {
        throw new Error(`Failed to fetch ${tableName} data`);
      }
      setOriginalData(data.data);
      setTableData(data.data);
      setIsFiltered(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "somthing went wrong");
      setTableData([]);
      setOriginalData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // set the selcted table when admin clicked the sidebar opteions.
  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    setSelectedRows([]);
  };
  // control on check box for each row on/off.
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((rowId: string) => rowId !== id);
      }
      return [...prev, id];
    });
  };
  // runs the state of the row to edit,allow only one row.
  const handleEdit = () => {
    if (selectedRows.length != 1) {
      console.error("you can only select one row at a time");
      toast.error("select one row at the time");
      return;
    }
    const rowToEdit: TableRow | undefined = tableData.find(
      (row) => row.id === selectedRows[0]
    );
    if (!rowToEdit) {
      toast.error("Row not found");
      return;
    }
    setEditingRow(rowToEdit);
    setEditModalOpen(true);
  };

  // send api call to backend with the update row along with id.
  const handleSaveEdit = async (dataToUpdate: any) => {
    try {
      const response = await api.put(
        `admin/${selectedTable}/${dataToUpdate.id}`,
        dataToUpdate
      );

      if (response.status === 200) {
        fetchTableData(selectedTable);
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("error edit:", error);
      toast.error("edit failed");
    }
  };

  // function to handle creation
  const handleCreate = async (data: Record<string, any>) => {
    try {
      const response = await api.post(`/admin/${selectedTable}`, data);
      if (response.status === 200) {
        toast.success("Created successfully");
        fetchTableData(selectedTable);
      }
    } catch (error) {
      console.error("error creating:", error);
      toast.error("Creation failed");
      throw error; // Rethrow to handle in modal
    }
  };

  // send array of ids to delete from the DB.
  const handleDelete = async () => {
    try {
      console.log("Deleting rows:", selectedRows);
      const response = await api.delete(`/admin/${selectedTable}/`, {
        data: { id: selectedRows },
      });
      if (response.status === 200) {
        toast.success("deleted successfuly");
        fetchTableData(selectedTable);
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("error delete:", error);
      toast.error("somthing went wrong");
    }
  };

  // filter function.
  const handleFilter = (filters: Record<string, string>) => {
    if (Object.keys(filters).length === 0) {
      setTableData(originalData);
      setIsFiltered(false);
      return;
    }

    const filteredRows = originalData.filter((row) => {
      return Object.entries(filters).every(([column, filterValue]) => {
        const cellValue = row[column]?.toString()?.toLowerCase() || "";
        return cellValue.includes(filterValue.toLocaleLowerCase());
      });
    });
    // Check if any results were found
    if (filteredRows.length === 0) {
      toast.error("No matching records found");
      setTableData(originalData); // go back to the original table
      setIsFiltered(false);
    } else {
      setTableData(filteredRows);
      setIsFiltered(true);
    }
  };

  // reset the data on the table to the original schema.
  const handleResetFilter = () => {
    setTableData(originalData);
    setIsFiltered(false);
  };

  //Helper function: Get table columns from the first data item
  const getTableColumns = () => {
    if (tableData.length > 0) {
      console.log(Object.keys(tableData[0]));
      return Object.keys(tableData[0]);
    }
    return [];
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-slate-600 text-white transition-all duration-300`}
        >
          <div className="p-4 flex justify-between items-center">
            <h2 className={`${isSidebarOpen ? "block" : "hidden"} font-bold`}>
              Admin Panel
            </h2>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-4">
            {tables.map((tableName) => (
              <button
                key={tableName}
                onClick={() => handleTableSelect(tableName)}
                className={`w-full text-left p-4 hover:bg-gray-700 transition-colors
                ${selectedTable === tableName ? "bg-gray-700" : ""}
                ${isSidebarOpen ? "px-4" : "px-2 justify-center"}`}
              >
                {isSidebarOpen ? tableName : tableName.charAt(0).toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {isLoading && (
              <div className="flex justify-center items-center h-32">
                <div className="text-gray-500">Loading...</div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {selectedTable && !isLoading && !error && tableData.length > 0 && (
              <>
                {/* Action buttons */}
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={handleEdit}
                    disabled={selectedRows.length === 0}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      selectedRows.length > 0
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={selectedRows.length === 0}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      selectedRows.length > 0
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                  <CreateModal
                    columns={getTableColumns()}
                    onSubmit={handleCreate}
                  />
                  <FilterModal
                    columns={getTableColumns()}
                    onFilter={handleFilter}
                    onReset={handleResetFilter}
                  />
                </div>

                {/* Data table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-12 px-6 py-3">
                          <input
                            type="checkbox"
                            onChange={() => {
                              const allIds = tableData.map((row) => row.id);
                              setSelectedRows(
                                selectedRows.length === allIds.length
                                  ? []
                                  : allIds
                              );
                            }}
                            checked={selectedRows.length === tableData.length}
                            className="h-4 w-4"
                          />
                        </th>
                        {getTableColumns().map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key.replace("_", " ")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(row.id)}
                              onChange={() => handleRowSelect(row.id)}
                              className="h-4 w-4"
                            />
                          </td>
                          {Object.entries(row).map(([key, value]) => (
                            <td
                              key={key}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedTable &&
              !isLoading &&
              !error &&
              tableData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No data found for {selectedTable}
                </div>
              )}

            {/* massage if there wasnt any filtered results */}
            {isFiltered && tableData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No matching records found
              </div>
            )}

            {/* state and props for the edit modal */}
            {editModalOpen && (
              <EditModal
                isOpen={editModalOpen}
                onClose={() => {
                  setEditModalOpen(false);
                  setEditingRow(undefined);
                }}
                onSave={handleSaveEdit}
                rowData={editingRow}
                columns={getTableColumns()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
