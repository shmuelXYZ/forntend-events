import React from "react";
import { useLoginModal } from "../context/ModalProvider";

// interface AuthButtonsProps {
//   onToggleLoginForm: () => void;
//   onToggleRegisterForm: () => void;
// }

export const AuthButtons: React.FC = ({}) => {
  const { setShowLoginModal, setShowRegisterModal } = useLoginModal();
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setShowLoginModal(true)}
        className="relative inline-flex items-center justify-center overflow-hidden 
                     rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 
                     font-medium text-gray-900 hover:text-white focus:outline-none 
                     focus:ring-2 focus:ring-purple-200 dark:text-white 
                     dark:focus:ring-purple-800"
      >
        <span
          className="relative rounded-md bg-white px-4 py-2 transition-all 
                          duration-75 ease-in dark:bg-gray-900 group-hover:bg-opacity-0"
        >
          Login
        </span>
      </button>

      <button
        onClick={() => setShowRegisterModal(true)}
        className="relative inline-flex items-center justify-center overflow-hidden 
                     rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 
                     font-medium text-gray-900 hover:text-white focus:outline-none 
                     focus:ring-2 focus:ring-purple-200 dark:text-white 
                     dark:focus:ring-purple-800"
      >
        <span
          className="relative rounded-md bg-white px-4 py-2 transition-all 
                          duration-75 ease-in dark:bg-gray-900 group-hover:bg-opacity-0"
        >
          Register
        </span>
      </button>
    </div>
  );
};
