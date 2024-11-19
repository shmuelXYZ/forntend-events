import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

// move to types
interface LoginFormProps {
  onClose: () => void;
}

const LoginPage: React.FC<LoginFormProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Login submitted:", { email, password });
    try {
      await login({ email, password });
      onClose();
    } catch (err) {
      setError("plese try again, somthing went wrong");
      setEmail("");
      setPassword("");
    }
    // Make a login request here, or call a prop function if needed
  };

  return (
    <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
