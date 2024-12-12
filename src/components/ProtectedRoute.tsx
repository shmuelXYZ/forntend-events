import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useLoginModal } from "../context/ModalProvider";
import { toast } from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["admin"],
}) => {
  const { user, isLoading } = useAuth();
  const { setShowLoginModal } = useLoginModal();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please log in to access the admin panel");
      setShowLoginModal(true);
    }
  }, [user, isLoading, setShowLoginModal]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error("You don't have permission to access the admin panel");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
