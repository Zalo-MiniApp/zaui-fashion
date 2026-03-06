import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function ContactModal({ isOpen, onClose, serviceName }: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { fullName, phoneNumber, serviceName });
    alert(`Cảm ơn ${fullName}! Chúng tôi sẽ liên hệ lại với bạn qua số ${phoneNumber} trong thời gian sớm nhất.`);
    setFullName("");
    setPhoneNumber("");
    onClose();
  };

  const handleCallNow = () => {
    window.location.href = "tel:18001166";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="bg-[#0093DD] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Liên hệ tư vấn</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {serviceName && (
            <p className="text-sm text-gray-600 mb-4">
              Gói dịch vụ: <span className="font-bold text-[#0093DD]">{serviceName}</span>
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ tên của bạn"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                required
                pattern="[0-9]{10,11}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0093DD] text-white py-3 rounded-lg font-bold hover:bg-[#0082c9] transition-colors"
            >
              GỬI THÔNG TIN
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">hoặc</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Call Now Button */}
          <button
            onClick={handleCallNow}
            className="w-full bg-[#EF4444] text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            📞 TƯ VẤN NGAY
          </button>
        </div>
      </div>
    </div>
  );
}
