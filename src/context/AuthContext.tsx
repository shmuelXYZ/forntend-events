import React, { useEffect, createContext, useState, useContext } from "react";
import api from "../api/api";
import { User } from "../types/userTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const { data } = await api.get<{ user: User }>("/auth");
  //       console.log(data);
  //       setUser(data.user);
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //       console.log("error verify:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   verifyUser();
  // }, []);

  // v.2 useEffect
  useEffect(() => {
    let isMounted = true;

    const verifyUser = async () => {
      try {
        const response = await api.get("/auth");
        if (isMounted && response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isMounted) {
          // Only update state if we're currently authenticated
          // This prevents unnecessary re-renders
          if (isAuthenticated) {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Only run verification if we're not already know we're unauthenticated
    if (isLoading) {
      verifyUser();
    }

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await api.post<{ data: User }>("/login", credentials);

      console.log(user);
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred during login"
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await api.post<{ data: User }>(
        "/register/users",
        credentials
      );

      setUser(response.data.data);
      console.log("user:", user);
      setIsAuthenticated(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred during registration"
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setIsLoading(true);

      await api.get("/logout");

      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred during logout"
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Optional: You can create a loading wrapper component
// do not use before learn it
export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return <>{children}</>;
};
