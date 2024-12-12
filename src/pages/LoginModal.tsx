import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider"; // your existing auth context
import { useLoginModal } from "../context/ModalProvider";
import Input from "../components/Input";

export const LoginModal = () => {
  const { login } = useAuth();
  const { showLoginModal, setShowLoginModal, switchToRegister } =
    useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
      setShowLoginModal(false);
      // Clear form
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showLoginModal) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <button
            onClick={() => setShowLoginModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
          />

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
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={switchToRegister}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </motion.div>
  );
};
