import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
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

  const priceNumber = extractMoney(event.price);
  const amount = priceNumber?.amount ?? 0;
  const currency = priceNumber?.currency ?? 0;

  const totalPrice = amount * ticketCount;

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      toast.error("Please login to purchase tickets", {
        position: "bottom-right",
      });
      setShowLoginModal(true);
      onClose();
    }
  }, [isOpen, isAuthenticated]);

  // New PayPal handling functions
  const createOrder = (data: any, actions: any) => {
    const itemTotal = (amount * ticketCount).toFixed(2);

    return actions.order.create({
      purchase_units: [
        {
          description: `Tickets for ${event.name}`,
          amount: {
            currency_code: "USD",
            value: itemTotal,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemTotal,
              },
            },
          },
          items: [
            {
              name: event.name,
              unit_amount: {
                currency_code: "USD",
                value: amount.toFixed(2),
              },
              quantity: ticketCount.toString(),
            },
          ],
        },
      ],
    });
  };
  const handlePayPalApprove = async (data: any, actions: any) => {
    if (!user || !event.id) return;

    setIsLoading(true);
    try {
      // First capture the PayPal order
      const orderDetails = await actions.order.capture();

      // Then send to your backend
      const response = await api.post(
        `event-purchas/${event.id}/${user.id}/${ticketCount}`,
        {
          paypalOrderId: data.orderID,
          paypalOrderDetails: orderDetails,
          totalAmount: totalPrice,
        }
      );

      toast.success(
        `Purchase successful! ${user.firstName}, you have ${ticketCount} tickets to ${event.name}`,
        {
          duration: 5000,
          position: "top-center",
          style: {
            zIndex: 100000,
          },
        }
      );

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
          <div className="fixed inset-0 flex items-center justify-center z-40">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/30" // Changed to absolute
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-[95%] sm:w-[90%] md:w-[400px] 
                   bg-white/90 rounded-xl shadow-lg z-50"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-500 to-pink-500">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {event.name}
                </h2>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Ticket Counter */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Number of Tickets:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setTicketCount(Math.max(1, ticketCount - 1))
                      }
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
                      onClick={() =>
                        setTicketCount(Math.min(6, ticketCount + 1))
                      }
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
                <div className="w-full">
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    disabled={isLoading}
                    createOrder={createOrder}
                    onApprove={handlePayPalApprove}
                    onError={(err) => {
                      toast.error(
                        "PayPal encountered an error. Please try again."
                      );
                      console.error("PayPal error:", err);
                    }}
                  />
                </div>

                {/* Cancel Button */}
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg
                         hover:bg-gray-50 transition-colors text-base"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;
