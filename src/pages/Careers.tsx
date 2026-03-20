import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Mail, Phone, Facebook } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Careers: React.FC = () => {
  const { t } = useLanguage();

  const jobs = [
    {
      title: 'MEDICAL TECHNOLOGIST',
      requirements: [
        "Bachelor's degree in Medical Technology",
        'Registered Medical Technologist certification',
        '6 months to 1 year of relevant experience (an advantage)',
        'Fresh graduates are encouraged to apply!'
      ]
    },
    {
      title: 'PHARMACIST',
      requirements: [
        "Bachelor's degree in Pharmacy",
        'Registered Pharmacist certification',
        '6 months to 1 year of relevant experience (an advantage)',
        'Fresh graduates are welcome to apply!'
      ]
    },
    {
      title: 'HR OFFICER',
      requirements: [
        "Bachelor's degree in Psychology, Business Administration (major in Human Resource Management), or equivalent.",
        'At least 3 years of HR experience.',
        '2-3 years of supervisory experience.'
      ]
    },
    {
      title: 'ZPMCH STAFF NURSE',
      requirements: [
        "Bachelor's degree in Nursing.",
        'Must be a Registered Nurse.',
        '6 months to 1 year of relevant experience is an advantage.',
        'Fresh graduates are welcome!'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-pink-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t('careers')}</h1>
            <p className="text-xl text-pink-100 leading-relaxed">
              {t('joinOurTeam')}
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('jobOpenings')}</h2>
            <p className="text-neutral-600">We're on the lookout for dedicated professionals to fill the following positions:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                    <Briefcase size={24} />
                  </div>
                  <span className="px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
                    Full-Time
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{job.title}</h3>
                <div className="space-y-3 mb-8">
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{t('requirements')}</p>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-neutral-600 text-sm">
                        <CheckCircle2 className="text-pink-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Application Info */}
          <div className="mt-20 p-12 rounded-[3rem] bg-pink-50 border border-pink-100 text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8">{t('applyNow')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 mb-4 shadow-sm">
                  <Mail size={24} />
                </div>
                <p className="text-sm text-neutral-500 mb-1">{t('sendCvTo')}</p>
                <a href="mailto:zpc144hr@gmail.com" className="font-bold text-pink-700 hover:underline">zpc144hr@gmail.com</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 mb-4 shadow-sm">
                  <Phone size={24} />
                </div>
                <p className="text-sm text-neutral-500 mb-1">{t('careerInquiry')}</p>
                <p className="font-bold text-pink-700">(062) 991-0379 / 0916 432 4390</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 mb-4 shadow-sm">
                  <Facebook size={24} />
                </div>
                <p className="text-sm text-neutral-500 mb-1">Visit us on Facebook</p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="font-bold text-pink-700 hover:underline">Zamboanga Puericulture Center Org. No. 144</a>
              </div>
            </div>
            <p className="mt-12 text-pink-600 font-bold italic">Don't miss this opportunity to advance your career with us! Apply now!</p>
          </div>
        </div>
      </section>
    </div>
  );
};
