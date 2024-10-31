import React from "react";
// import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
// import LoginForm from "./LoginForm";

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
    <nav className="grid grid-cols-3 bg-slate-400 rounded-md my-1.5 mx-1">
      <Logo />
      <Search />
      <div className="justify-self-center items-center my-auto  text-purple-500">
        {user ? (
          <span>welcome {user.name}</span>
        ) : (
          <>
            <button
              onClick={onToggleLoginForm}
              className="mx-3 font-semibold bg-slate-600 py-1 px-1.5 rounded-md"
            >
              Login
            </button>
            <button
              onClick={onToggleRegisterForm}
              className="mx-3 font-semibold  bg-slate-600 py-1 px-1.5 rounded-md"
            >
              Rgister
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
