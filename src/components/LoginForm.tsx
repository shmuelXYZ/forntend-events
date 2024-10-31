import React, { useState } from "react";
import axios from "axios";

// move to types
interface LoginFormProps {
  setUser: (user: { name: string; id: string }) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    try {
      const response = await axios.post("api/login", { email, password });
      setUser(response.data);
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

export default LoginForm;
