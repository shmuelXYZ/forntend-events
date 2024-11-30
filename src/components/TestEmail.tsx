import React from 'react';
import axios from 'axios';

const TestEmail: React.FC = () => {
    const handleTestEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/test/test-email', {}, {
                withCredentials: true
            });
            
            alert(response.data.message);
        } catch (error) {
            console.error('Error sending test email:', error);
            alert('Failed to send test email. Check console for details.');
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <button
                onClick={handleTestEmail}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Send Test Email
            </button>
        </div>
    );
};

export default TestEmail;
