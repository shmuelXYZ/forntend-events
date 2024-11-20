import React, { createContext, useContext, useState } from "react";

interface LoginModalContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showRgisterModal: boolean;
  setShowRegisterModal: (show: boolean) => void;
  switchToLogin: () => void;
  switchToRegister: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export const LoginModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRgisterModal, setShowRegisterModal] = useState(false);

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };
  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };
  // Both modals for login and register are managed through one context, and option to
  // switch between them, and accessable in the entire app.
  return (
    <LoginModalContext.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
        showRgisterModal,
        setShowRegisterModal,
        switchToLogin,
        switchToRegister,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};
export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
};
