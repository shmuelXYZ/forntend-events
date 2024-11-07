import React, { useState } from "react";
import api from "../api/api";

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rgister submitted:", { firstName, lastName, email, password });
    try {
      const response = await api.post("/register/users", {
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response);
      onClose();
    } catch (err) {
      setError("plese try again, somthing went wrong");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
      <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
        <label className="font-semibold text-gray-700">
          First Name:
          <input
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </label>
        <label className="font-semibold text-gray-700">
          Last Name:
          <input
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </label>
        <label className="font-semibold text-gray-700">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </label>
        <label className="font-semibold text-gray-700">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </label>
        {error && <p className="text-red-600 mt-1 font-bold">{error}</p>}
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
