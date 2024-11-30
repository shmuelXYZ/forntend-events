import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PurchaseConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail: string;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({ isOpen, onClose, userEmail }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('PurchaseConfirmationModal isOpen:', isOpen);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onClose(); // First close the modal
        setTimeout(() => {
            navigate('/'); // Then navigate to home
        }, 100);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Purchase Successful!
                    </h3>

                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                            Thank you for your purchase! We've sent a confirmation email to{' '}
                            <span className="font-medium text-gray-700">{userEmail}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Please check your inbox for the ticket details.
                        </p>
                    </div>

                    <div className="mt-5">
                        <button
                            onClick={handleConfirm}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseConfirmationModal;
