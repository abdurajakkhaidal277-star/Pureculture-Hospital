import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t('botWelcome') }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const systemInstruction = `
        You are the ZPMCH Assistant for Zamboanga Puericulture Maternity and Children’s Hospital (ZPMCH).
        Your goal is to help users with inquiries about the hospital, its services, doctors, and job openings.
        
        Hospital Info:
        - Name: Zamboanga Puericulture Maternity and Children’s Hospital (ZPMCH) / Zamboanga Puericulture Center Org. No. 144.
        - Location: Pura Brillantes corner La Purisima Street, Zamboanga City, Philippines, 7000.
        - Contact: (062) 991 0379 / +63 917 163 1740.
        - Email: zpc144@gmail.com.
        - Emergency: 24/7 Available.
        - Outpatient: Mon - Sat: 8:00 AM - 5:00 PM.
        
        Job Openings:
        - Medical Technologist: Req: BS MedTech, Registered, 6mo-1yr exp (fresh grads welcome).
        - Pharmacist: Req: BS Pharmacy, Registered, 6mo-1yr exp (fresh grads welcome).
        - HR Officer: Req: BS Psych/BA HR, 3yrs HR exp, 2-3yrs supervisory.
        - Staff Nurse: Req: BS Nursing, Registered, 6mo-1yr exp (fresh grads welcome).
        - HR Email: zpc144hr@gmail.com.
        
        Packages:
        - Buntis Package (Normal Delivery): PHP 15,000. Includes 2 days ward, newborn hearing test, OB & Pedia fees.
        
        Payments:
        - We support GCash, Maya, Bank Transfer, and Crypto (BTC/ETH).
        - Payments are processed securely via PayMongo.
        
        Clinics:
        - Hospital Annex (Private Clinics)
        - Medical Arts Building (Physicians' Clinics)
        
        Events:
        - Women's Month 2026: Lecture on Patient Safety by Dr. Jennifer D. Araneta.
        - IVT Training: 3-Day Basic IVT Training (April 30 – May 1-2, 2026). Fee: PHP 3,500. Contact: 0917-163-1740.
        
        Guidelines:
        - Be professional, compassionate, and helpful.
        - Support both English and Tagalog as requested. Current language: ${language}.
        - If you don't know something, refer them to the contact numbers or email.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })).concat({ role: 'user', parts: [{ text: userMessage }] }),
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const botText = response.text || "I'm sorry, I couldn't process that. Please try again or contact us directly.";
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please call us at (062) 991 0379." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white rounded-[2rem] shadow-2xl border border-neutral-100 flex flex-col overflow-hidden mb-4 transition-all duration-300 ${
              isMinimized ? 'h-20 w-72' : 'h-[600px] w-[400px] max-w-[calc(100vw-3rem)]'
            }`}
          >
            {/* Header */}
            <div className="bg-pink-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="font-bold leading-tight">ZPMCH Assistant</p>
                  <p className="text-xs text-pink-100">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-neutral-50/50">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'bg-pink-600 text-white rounded-tr-none'
                            : 'bg-white text-neutral-800 border border-neutral-100 shadow-sm rounded-tl-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-neutral-100 shadow-sm">
                        <Loader2 className="animate-spin text-pink-600" size={20} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-neutral-100">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={t('typeMessage')}
                      className="flex-grow bg-neutral-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center hover:bg-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-200"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`bg-pink-600 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3 hover:bg-pink-700 transition-all ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={24} />
        <span className="font-bold">{t('chatWithUs')}</span>
      </motion.button>
    </div>
  );
};
