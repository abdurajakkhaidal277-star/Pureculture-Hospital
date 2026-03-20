import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t('contactUs')}</h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              {t('contactDesc')}
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Phone */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{t('phone')}</h3>
              <p className="text-neutral-600 mb-6">{t('phoneDesc')}</p>
              <div className="space-y-2">
                <a href="tel:0629910379" className="block text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">(062) 991 0379</a>
                <a href="tel:09171631740" className="block text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">0917 163 1740</a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{t('email')}</h3>
              <p className="text-neutral-600 mb-6">{t('emailDesc')}</p>
              <a href="mailto:zpc144@gmail.com" className="text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">zpc144@gmail.com</a>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{t('location')}</h3>
              <p className="text-neutral-600 mb-6">{t('locationDesc')}</p>
              <p className="text-xl font-bold text-neutral-900">Zamboanga Puericulture Center, Zamboanga City, Philippines</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Hours */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 tracking-tight">{t('openingHours')}</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400">{t('emergencyCare')}</span>
                  <span className="font-bold text-emerald-400">{t('available247')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400">{t('outpatientClinics')}</span>
                  <span className="font-bold">{t('monSat85')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400">{t('labDiagnostics')}</span>
                  <span className="font-bold">{t('monSun78')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-neutral-400">{t('visitingHours')}</span>
                  <span className="font-bold">{t('daily108')}</span>
                </div>
              </div>

              <div className="mt-12 flex space-x-6">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all">
                  <Facebook size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all">
                  <MessageSquare size={24} />
                </a>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden h-[500px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                alt="Hospital Location"
                className="w-full h-full object-cover grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-2xl text-center max-w-xs">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="font-bold text-xl mb-2">ZPMCH</p>
                  <p className="text-emerald-100 text-sm">Zamboanga Puericulture Maternity and Children’s Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
