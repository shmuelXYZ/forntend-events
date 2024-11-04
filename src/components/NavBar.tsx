import React from "react";
import Logo from "./Logo";
import Search from "./Search";

// move to types folder
interface NavBarProps {
  user: { name: string } | null;
  onToggleLoginForm: () => void;
  onToggleRegisterForm: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  user,
  onToggleLoginForm,
  onToggleRegisterForm,
}) => {
  return (
    <nav className="grid grid-cols-3 bg-slate-950 rounded-md my-1.5 mx-1">
      <Logo />
      <Search />
      <div className="justify-self-center items-center my-auto  text-purple-500">
        {user ? (
          <span>welcome {user.name}</span>
        ) : (
          <>
            <button
              // change the css like the rgister button
              onClick={onToggleLoginForm}
              className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 mr-6 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-1 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login
              </span>
            </button>
            <button
              onClick={onToggleRegisterForm}
              className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-1 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Rgister
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
