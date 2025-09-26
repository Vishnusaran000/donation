import React, { useState } from 'react';
import { X, CreditCard, Smartphone, QrCode, DollarSign } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  organizationName: string;
}

export function DonationModal({ isOpen, onClose, campaignTitle, organizationName }: DonationModalProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'bank'>('card');
  const [message, setMessage] = useState('');
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'qr') {
      setShowQR(true);
      return;
    }
    
    // Process donation - replace with actual payment processing
    alert(`Thank you for your donation of $${amount} to ${campaignTitle}!`);
    onClose();
  };

  if (showQR) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">QR Payment</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 mb-4">
              <QrCode className="h-32 w-32 mx-auto text-gray-400" />
              <p className="text-sm text-gray-600 mt-2">QR Code will appear here</p>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">
              Donation Amount: ${amount}
            </h4>
            <p className="text-gray-600 mb-4">
              Scan this QR code with your mobile wallet or banking app to complete the donation.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Instructions:</strong><br />
                1. Open your mobile wallet app<br />
                2. Scan the QR code above<br />
                3. Confirm the payment amount<br />
                4. Complete the transaction
              </p>
            </div>
            
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Payment Options
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Make a Donation</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-lg text-gray-900">{campaignTitle}</h4>
            <p className="text-gray-600">by {organizationName}</p>
          </div>

          <form onSubmit={handleDonate} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Donation Amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 px-4 rounded-lg border text-center transition-colors ${
                      amount === preset.toString()
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Secure payment via card</div>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    paymentMethod === 'qr'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <div className="font-medium">QR Code Payment</div>
                      <div className="text-sm text-gray-600">Pay with mobile wallet</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Card Details (only show if card is selected) */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Optional Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Leave an encouraging message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Privacy:</strong> Your donation and personal information are secure and encrypted. 
                You will receive a tax-deductible receipt via email.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {paymentMethod === 'qr' ? 'Generate QR Code' : `Donate $${amount || '0'}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}