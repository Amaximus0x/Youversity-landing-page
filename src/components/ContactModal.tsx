import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-lg mx-4 bg-[#F5F5F5] rounded-2xl p-8 z-50 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-[#2A4D61] hover:text-[#EE434A] transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-bold text-[#2A4D61] mb-8 text-center">Get in Touch</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-6 py-3 rounded-full bg-white text-[#2A4D61] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE434A]"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-3 rounded-full bg-white text-[#2A4D61] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE434A]"
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Your message"
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-white text-[#2A4D61] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE434A] resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#EE434A] hover:bg-[#D93D44] text-white rounded-full py-6 text-lg font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 