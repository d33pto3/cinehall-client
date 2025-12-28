"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Hall {
  _id: string;
  name: string;
  location: string;
  address: string;
}

interface HallSelectionModalProps {
  movieId: string;
  isOpen: boolean;
  onClose: () => void;
}

const HallSelectionModal: React.FC<HallSelectionModalProps> = ({
  movieId,
  isOpen,
  onClose,
}) => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && movieId) {
      const fetchHalls = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get(`/hall/by-movie/?movieId=${movieId}`);
          
          const data = response.data;
          if (data && Array.isArray(data.data)) {
            setHalls(data.data);
          } else if (Array.isArray(data)) {
            setHalls(data);
          } else {
            console.error("Unexpected API response structure:", data);
            setHalls([]);
          }
        } catch (err) {
          console.error("Error fetching halls:", err);
          setError("Failed to load halls");
        } finally {
          setLoading(false);
        }
      };

      fetchHalls();
    }
  }, [isOpen, movieId]);

  const handleHallSelect = (hallId: string) => {
    setSelectedHallId((prevId) => (prevId === hallId ? null : hallId));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#FDE0B1] rounded-[40px] shadow-2xl overflow-hidden border-4 border-[#3ABEF9] flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 pb-4 text-center relative">
              <button
                onClick={onClose}
                className="absolute right-8 top-8 text-neutral-800 hover:text-black transition-colors"
                aria-label="Close"
              >
                <X size={28} />
              </button>
              <h2 className="text-3xl font-bold text-[#4A2C2C] mt-4">
                Select Your Theatre
              </h2>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-[#FAAA47]" size={48} />
                  <p className="text-[#4A2C2C] font-medium">Fetching available theatres...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20 text-red-600 font-bold">{error}</div>
              ) : halls.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-bold text-[#4A2C2C] italic">
                    &quot;there is no upcoming show for this movie&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                    {halls.map((hall, index) => {
                      const isSelected = selectedHallId === hall._id;
                      return (
                        <motion.div
                          key={hall._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleHallSelect(hall._id)}
                          className={`
                            group flex items-start gap-4 p-5 rounded-2xl cursor-pointer
                            transition-all duration-300 border-2
                            ${
                              isSelected
                                ? "bg-[#3ABEF9] border-[#3ABEF9] text-white shadow-xl scale-[1.02]"
                                : "bg-[#F9DFC2] border-black/10 hover:bg-[#FBE8D3] hover:-translate-y-1 hover:shadow-md"
                            }
                          `}
                        >
                          <div className={`mt-1 p-2 rounded-full ${isSelected ? 'bg-white/40' : 'bg-white/30'}`}>
                            <MapPin size={20} className={isSelected ? 'text-white' : 'text-[#4A2C2C]'} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-[#4A2C2C]'}`}>
                              {hall.name}
                            </h3>
                            <p className={`text-sm font-medium leading-relaxed mt-1 ${isSelected ? 'text-white/90' : 'text-neutral-600'}`}>
                              {hall.address || hall.location}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}
            </div>

            {selectedHallId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 pb-8"
              >
                <button
                  onClick={() => router.push(`/booking/${selectedHallId}?movieId=${movieId}`)}
                  className="w-full py-4 bg-[#FAAA47] text-[#4A2C2C] font-extrabold text-xl rounded-2xl shadow-lg hover:bg-[#fb923c] transition-all transform hover:scale-[1.02] active:scale-95 border-b-4 border-[#ce8a36]"
                >
                  goto booking
                </button>
              </motion.div>
            )}
            
            {/* Custom scrollbar styling */}
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #4A2C2C44;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #4A2C2C66;
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HallSelectionModal;
