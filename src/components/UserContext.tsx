// UserContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { User, AxiosUserResponse } from "../types/userTypes";
import api from "../api/api";
import { AxiosResponse } from "axios";

// Create the UserContext
export const UserContext = createContext<{ user: User | null }>({ user: null });

// User Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data }: AxiosResponse<AxiosUserResponse> = await api.get(
          "/user"
        );
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
