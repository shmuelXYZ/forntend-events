import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useLoginModal } from "../context/ModalProvider";
import { Logo } from "./Logo";

import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { LoginModal } from "../pages/LoginModal";
import { RegisterModal } from "../pages/RgisterModal";
import SearchDropDown from "./SearchDropDown";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { showLoginModal, showRgisterModal } = useLoginModal();
  const [isSearchDropOpen, setIsSearchDropOpen] = useState<boolean>(false);

  return (
    <nav className="bg-slate-950 px-6 py-4 shadow-lg h-[72px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <SearchDropDown
          isOpen={isSearchDropOpen}
          setIsOpen={setIsSearchDropOpen}
        />

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
