import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Mail, MapPin, Baby, Heart, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Packages: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-600 text-sm font-bold mb-4 tracking-wide uppercase"
          >
            Special Maternity Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight"
          >
            {t('buntisAlert')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            Normal Delivery at Zamboanga Puericulture Maternity and Children’s Hospital. 
            Planning for your little one’s arrival? We’ve got you covered!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Package Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/50 border border-pink-100 overflow-hidden"
          >
            <div className="bg-pink-600 p-8 text-white text-center">
              <Baby size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t('normalDelivery')}</h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-pink-100 text-lg">{t('allInclusive')}</span>
                <span className="text-4xl font-black">PHP 15,000</span>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                  <CheckCircle2 className="text-pink-600 mr-2" size={24} />
                  {t('whatsIncluded')}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    '2 days ward accommodation (mom & baby)',
                    '2 days basic medications',
                    'Hospital admission kit',
                    'Basic newborn kit',
                    'Newborn hearing test',
                    'Doctors’ professional fee (OB & Pedia)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-neutral-700">
                      <div className="mt-1 w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                  <Info className="text-neutral-400 mr-2" size={20} />
                  {t('packageDetails')}:
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex items-center">• Applicable to single birth only</li>
                  <li className="flex items-center">• Additional charges for multiple births & complicated cases</li>
                  <li className="flex items-center">• House case only with at least 2 prenatal visits in ZPMCH OPD</li>
                </ul>
              </div>

              <div className="mt-10 text-center">
                <p className="text-pink-600 font-bold text-xl italic mb-2">{t('alagaNiNanay')} 💗</p>
                <p className="text-neutral-500 text-sm">Give yourself and your baby the care you deserve</p>
              </div>
            </div>
          </motion.div>

          {/* Contact & Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">Inquiries & Booking</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium mb-1">Call or Text</p>
                    <p className="text-lg font-bold text-neutral-900">09164324390</p>
                    <p className="text-lg font-bold text-neutral-900">(062) 991-0379</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium mb-1">Email Us</p>
                    <p className="text-lg font-bold text-neutral-900">zpc144@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 font-medium mb-1">Visit Us</p>
                    <p className="text-lg font-bold text-neutral-900">Zamboanga Puericulture Center Org. No. 144</p>
                    <p className="text-neutral-500 text-sm mt-1">Pura Brillantes corner La Purisima Street, Zamboanga City</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-emerald-600 p-8 rounded-[2rem] text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <Heart className="mb-4 text-emerald-200" size={32} />
                <h3 className="text-xl font-bold mb-2">Why Choose ZPMCH?</h3>
                <p className="text-emerald-50 text-sm leading-relaxed">
                  With decades of experience in maternity and pediatric care, we provide a safe and nurturing environment for mothers and their newborns. Our dedicated team ensures that every delivery is handled with the utmost professional care.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
