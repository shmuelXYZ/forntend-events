// import React, { useState } from "react";
// import { Event } from "../types/eventTypes";
// import PurchaseModal from "./PurchaseModal";
// import { LucideShoppingCart } from "lucide-react";

// interface PurchaseButtonProps {
//   event: Event;
//   variant: "card" | "page";
// }

// export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
//   event,
//   variant,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const buttonStyles = {
//     card: "relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-200 dark:text-white dark:focus:ring-purple-800",
//     page: "w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all",
//   };
//   const handleClick = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <button onClick={handleClick} className={buttonStyles[variant]}>
//         <span
//           className={
//             variant === "card"
//               ? "relative rounded-md bg-white px-4 py-2 transition-all duration-75 ease-in dark:bg-gray-900 group-hover:bg-opacity-0"
//               : ""
//           }
//         >
//           Buy Tickets
//         </span>
//         {variant === "card" && (
//           <span className="ml-2">
//             <LucideShoppingCart className="text-purple-200" />
//           </span>
//         )}
//       </button>

//       {/* Reusable Purchase Modal */}
//       <PurchaseModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         event={event}
//       />
//     </>
//   );
// };
import React, { useState } from "react";
import { Event } from "../types/eventTypes";
import PurchaseModal from "./PurchaseModal";

interface PurchaseButtonProps {
  event: Event;
  variant: "card" | "page";
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  event,
  variant,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyles = {
    card: "w-full-2rem rounded-lg bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:scale-[1.02]",
    page: "w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:scale-[1.02]",
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={buttonStyles[variant]}
      >
        Buy Tickets
      </button>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
};
