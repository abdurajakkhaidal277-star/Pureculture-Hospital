import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Clock, Users, ArrowRight, Star, CheckCircle2, FileText, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6 tracking-wide uppercase">
                {t('welcome')}
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1] mb-6 tracking-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-lg leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center group"
                >
                  {t('bookAppointment')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/doctors"
                  className="bg-white text-neutral-900 border-2 border-neutral-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-emerald-600 hover:text-emerald-600 transition-all flex items-center justify-center"
                >
                  {t('findDoctor')}
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Hospital"
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">4.9/5</p>
                    <p className="text-sm text-neutral-500">Patient Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">50+</p>
              <p className="text-neutral-500 font-medium">Expert Doctors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">20k+</p>
              <p className="text-neutral-500 font-medium">Happy Patients</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">15+</p>
              <p className="text-neutral-500 font-medium">Specializations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">24/7</p>
              <p className="text-neutral-500 font-medium">Emergency Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buntis Package Promo */}
      <section className="py-24 bg-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-pink-200/50 overflow-hidden border border-pink-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold uppercase tracking-widest">
                    Maternity Special
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                  {t('buntisAlert')}!
                </h2>
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  Planning for your little one’s arrival? Get our all-inclusive <span className="text-pink-600 font-bold">{t('normalDelivery')}</span> for just <span className="text-neutral-900 font-black">PHP 15,000</span>!
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <CheckCircle2 className="text-pink-500" size={20} />
                    <span className="font-medium">2 Days Ward Accommodation</span>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <CheckCircle2 className="text-pink-500" size={20} />
                    <span className="font-medium">Newborn Hearing Test Included</span>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-700">
                    <CheckCircle2 className="text-pink-500" size={20} />
                    <span className="font-medium">OB & Pedia Professional Fees</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/packages"
                    className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 text-center"
                  >
                    View Package Details
                  </Link>
                  <a
                    href="tel:09164324390"
                    className="bg-white text-pink-600 border-2 border-pink-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-pink-600 transition-all text-center"
                  >
                    Inquire Now
                  </a>
                </div>
                <p className="mt-8 text-pink-500 font-bold italic">"Alaga ni Nanay, Sigurado kay Baby!" 💗</p>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65ee9?auto=format&fit=crop&q=80&w=1000"
                  alt="Mother and Baby"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white lg:from-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight">Our Medical Services</h2>
            <p className="text-lg text-neutral-600">
              We offer a wide range of specialized medical services to ensure you receive the best care possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Emergency Care', icon: Clock, desc: 'Immediate medical attention for critical conditions, available 24/7.' },
              { title: 'Expert Consultations', icon: Users, desc: 'Access to top-tier specialists across various medical fields.' },
              { title: 'Diagnostic Imaging', icon: Shield, desc: 'Advanced MRI, CT scans, and X-ray services for accurate diagnosis.' },
              { title: 'Laboratory Services', icon: FileText, desc: 'Comprehensive blood tests and pathology with fast results.' },
              { title: 'Surgical Excellence', icon: CheckCircle2, desc: 'State-of-the-art operating theaters and skilled surgical teams.' },
              { title: 'Patient Support', icon: Star, desc: 'Dedicated care coordinators to assist you throughout your journey.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to prioritize your health?</h2>
          <p className="text-xl text-emerald-50 mb-12 max-w-2xl mx-auto">
            Join thousands of patients who trust Zamboanga Puericulture Center for their medical needs.
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-emerald-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-50 transition-all shadow-xl"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
};
