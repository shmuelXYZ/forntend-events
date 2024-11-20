import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // auth context
import api from "../api/api";
import { Event } from "../types/eventTypes";
import extractMoney from "../utils/PriceUtiles";
import { useLoginModal } from "../context/LoginModalContext";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { setShowLoginModal } = useLoginModal();

  const priceNumber = extractMoney(event.price); //from "utils/PriceUtiles"
  const amount = priceNumber?.amount ?? 0;
  const currency = priceNumber?.currency ?? 0;

  const totalPrice = amount * ticketCount;

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      toast.error("Please login to purchase tickets", {
        position: "bottom-right",
      });
      console.log("iii");
      setShowLoginModal(true);
      onClose();
    }
  }, [isOpen, isAuthenticated]);

  const handlePurchase = async () => {
    if (!user || !event.id) return;

    setIsLoading(true);
    try {
      const response = await api.post(
        `event-purchas/${event.id}/${user.id}/${ticketCount}`
      );

      toast.success(
        `Purchase successful! ${user.firstName},you have ${ticketCount} to the ${event.name}`,
        {
          duration: 10000,
          position: "top-center",
          style: {
            zIndex: 100000, // Ensure it's above modal
          },
        }
      );

      if (response.status === 201) {
        console.log(response.status);
      }
      onClose();
    } catch (error) {
      toast.error("Failed to complete purchase. Please try again.");
      console.error("Purchase error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/3 top-1/4 -translate-x-1/2 -translate-y-1/2 
                       w-full max-w-md bg-white rounded-xl shadow-2xl z-50 
                       overflow-hidden bg-opacity-60"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500">
              <h2 className="text-2xl font-bold text-white">{event.name}</h2>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Ticket Counter */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Number of Tickets:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 
                             flex items-center justify-center text-purple-600 
                             transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {ticketCount}
                  </span>
                  <button
                    onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                    className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 
                             flex items-center justify-center text-purple-600 
                             transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Price per ticket:</span>
                  <span>${event.price}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                           hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500
                           text-white rounded-lg hover:opacity-90 transition-opacity
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;
