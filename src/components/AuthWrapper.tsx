import React, { useState } from "react";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { User } from "../types/userTypes";

const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => {
      console.log(prevState);
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
    <>
      <NavBar
        user={user}
        onToggleLoginForm={toggleLoginForm}
        onToggleRegisterForm={toggleRegisterForm}
      />
      {showLoginForm && (
        <LoginForm setUser={setUser} onClose={() => setShowLoginForm(false)} />
      )}
      {showRegisterForm && (
        <RegisterForm onClose={() => setShowRegisterForm(false)} />
      )}
    </>
  );
};
export default AuthWrapper;
