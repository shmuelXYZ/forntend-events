import React, { useState } from "react";
import { useLoginModal } from "../context/LoginModalContext";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";

export const RegisterModal = () => {
  const { register } = useAuth();
  const { showRgisterModal, setShowRegisterModal, switchToLogin } =
    useLoginModal();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await register({ firstName, lastName, email, password, role });
      setShowRegisterModal(false);
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showRgisterModal) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <button
            onClick={() => setShowRegisterModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="first name"
          />
          <Input
            label="Last Name"
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="last name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={showPassword ? Eye : EyeOff}
            onIconClick={() => setShowPassword(!showPassword)}
            required
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <label className="font-semibold text-gray-700">Role:</label>
          <select
            className="border border-gray-300 p-2 rounded w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">user</option>
            <option value="Producer">producer</option>
          </select>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};
