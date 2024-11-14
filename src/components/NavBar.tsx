import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";
import Search from "./Search";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => {
      if (!prevState) setShowRegisterForm(false);
      return !prevState;
    });
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm((prevState) => {
      if (!prevState) setShowLoginForm(false);
      return !prevState;
    });
  };

  return (
    <nav className="bg-slate-950 px-6 py-4 shadow-lg h-[72px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <Search />

        <div className="flex items-center space-x-8">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <AuthButtons
              onToggleLoginForm={() => toggleLoginForm()}
              onToggleRegisterForm={() => toggleRegisterForm()}
            />
          )}
        </div>
      </div>

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}

      {showRegisterForm && (
        <RegisterForm onClose={() => setShowRegisterForm(false)} />
      )}
    </nav>
  );
};

export default Navbar;
