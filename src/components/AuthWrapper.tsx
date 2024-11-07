import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import { User } from "../types/userTypes";
import api from "../api/api";

const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  //verifyUser is called to check if the user is authenticated.
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const res = await api.get("/login");
  //       // user information store in the user state using setUser.
  //       setUser(res.data.user);
  //     } catch (err) {
  //       console.log("not a valid user");
  //     }
  //   };
  //   verifyUser();
  // }, []);

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
