import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
import { Logo } from "./Logo";
import Search from "./Search";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { LoginModal } from "../pages/LoginModal";
import { RegisterModal } from "../pages/RgisterModal";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { showLoginModal, showRgisterModal } = useLoginModal();

  return (
    <nav className="bg-slate-950 px-6 py-4 shadow-lg h-[72px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <Search />

        <div className="flex items-center space-x-8">
          {isAuthenticated ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>

      {showLoginModal && <LoginModal />}

      {showRgisterModal && <RegisterModal />}
    </nav>
  );
};

export default Navbar;
