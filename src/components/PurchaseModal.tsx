import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import api from "../api/api";
import { Event } from "../types/eventTypes";
import extractMoney from "../utils/PriceUtiles";
import { useLoginModal } from "../context/ModalProvider";
import PurchaseConfirmationModal from "./PurchaseConfirmModal";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { setShowLoginModal } = useLoginModal();

  useEffect(() => {
    console.log("showConfirmationModal changed:", showConfirmationModal);
  }, [showConfirmationModal]);

  const priceNumber = extractMoney(event.price);
  const amount = priceNumber?.amount ?? 0;
  const currency = priceNumber?.currency ?? 0;
  const totalPrice = amount * ticketCount;

  const handleCloseConfirmation = () => {
    console.log("Attempting to close confirmation modal");
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      toast.error("Please login to purchase tickets");
      setShowLoginModal(true);
      onClose();
    }
  }, [isOpen, isAuthenticated]);

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
    console.log("🔵 PayPal Approve Started");
    console.log("🔵 User:", user);
    console.log("🔵 Event ID:", event.id);
    console.log(
      "🔵 Current showConfirmationModal state:",
      showConfirmationModal
    );

    if (!user || !event.id) {
      console.error("🔴 Missing user or event ID");
      toast.error("Missing user information. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("🔵 Capturing PayPal order");
      const orderDetails = await actions.order.capture();
      console.log("🔵 Order captured:", orderDetails);

      try {
        console.log("🔵 Sending purchase to backend");
        const response = await api.post(
          `event-purchas/${event.id}/${user.id}/${ticketCount}`,
          {
            paypalOrderId: data.orderID,
            paypalOrderDetails: orderDetails,
            totalAmount: totalPrice,
          }
        );
        console.log("🔵 Backend response:", response);

        console.log("🔵 Setting loading to false");
        setIsLoading(false);

        console.log("🔵 Closing purchase modal");
        onClose();

        console.log("🔵 About to show confirmation modal");
        setShowConfirmationModal(true);
        console.log("🔵 Confirmation modal state set to true");
      } catch (backendError: any) {
        console.error("🔴 Backend error:", backendError);
        setIsLoading(false);

        // More specific error messages based on the error type
        if (backendError.code === "ECONNABORTED") {
          toast.error(
            "Request timed out. Please check your connection and try again."
          );
        } else if (backendError.response) {
          toast.error(
            backendError.response.data.message ||
              "Failed to process purchase. Please try again."
          );
        } else {
          toast.error("Failed to process purchase. Please try again later.");
        }
      }
    } catch (error) {
      console.error("🔴 PayPal capture error:", error);
      setIsLoading(false);
      toast.error("Failed to complete PayPal purchase. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PurchaseConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmation}
        userEmail={user?.email || ""}
      />
    </>
  );
};

export default PurchaseModal;
