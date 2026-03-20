import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { Search, User, Star, MapPin, Building2, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

interface PrivateClinic {
  unit: string;
  doctors: {
    name: string;
    specialization: string;
    schedule: string;
    contact?: string;
  }[];
}

const privateClinics: PrivateClinic[] = [
  {
    unit: '1',
    doctors: [
      { name: 'Dr. Fatma W. Warid-Ahijon, FPOGS., MHA', specialization: 'Obstetrician - Gynecologist', schedule: 'Daily (M-Sat)', contact: '09976634885' },
      { name: 'Dr. Muammar S. Abduhasan, MPH., FPCP', specialization: 'Internal Medicine', schedule: 'Wednesday to Saturday, 2:00PM to 4:00PM' }
    ]
  },
  {
    unit: '2',
    doctors: [
      { name: 'Dr. Al-Radjid Jamiri', specialization: 'General & Cancer Surgery, Colorectal & Laparoscopic Surgery', schedule: 'Monday to Saturday, 8:00AM to 5:00PM', contact: '09556972212' }
    ]
  },
  {
    unit: '3',
    doctors: [
      { name: 'Dr. Mary Grace Cañete-Viray, MD, MPH', specialization: 'PEDIATRICIAN', schedule: 'By Appointment', contact: '09209191943' }
    ]
  },
  {
    unit: '4',
    doctors: [
      { name: 'Dr. Sherryl B. Lukman', specialization: 'Internal Medicine/ Adult Cardiology', schedule: 'Monday to Friday, 10:00AM to 1:00PM' },
      { name: 'Dr. Arriza Kryssan Soria, MD, DPCP', specialization: 'Internal Medicine - Endocrinology, Diabetes, Thyroid, and Metabolism', schedule: 'Monday to Friday, 2:00PM to 5:00PM', contact: '09368900897' }
    ]
  },
  {
    unit: '5',
    doctors: [
      { name: 'Dr. Jehana M. Julkipli - Alih, FPOGS', specialization: 'Obstetrician and Gynecologist', schedule: 'TUE- THURS- SAT', contact: '09750483968' },
      { name: 'Dr. Aireen Marie C. Sta. Teresa, FPOGS', specialization: 'Obstetrician and Gynecologist', schedule: 'MON- WED- FRI', contact: '09177104310' }
    ]
  },
  {
    unit: '6',
    doctors: [
      { name: 'Dr. Charlie Magne D. Cabangal', specialization: 'Surgeon', schedule: 'By Appointment', contact: '09753211573' }
    ]
  },
  {
    unit: '7',
    doctors: [
      { name: 'Dr. Emiliano V. Torralba, RN, RMT, DMD', specialization: 'Gen. Dentistry & Orthodontics', schedule: 'By Appointment', contact: '09656141051' }
    ]
  },
  {
    unit: '8',
    doctors: [
      { name: 'Dr. Fahda Raiza J. Hadji-Sahali', specialization: 'Obstretrician- Gynecologist', schedule: 'MON- WED- FRIDAY, 10:00AM to 3:00PM' },
      { name: 'Dr. Shalimar Jane I. Lakibul Hamis', specialization: 'Obstetrician- Gynecologist', schedule: 'TUE- THU- SAT, 10:00AM to 3:00PM' },
      { name: 'Dr. Shareen K. Lakibul- Tagayan', specialization: 'Pediatrician', schedule: 'MON- SAT, 3:00PM to 5:00PM', contact: '09676378244' }
    ]
  }
];

const medicalArtsClinics: PrivateClinic[] = [
  {
    unit: '102',
    doctors: [
      { name: 'Dr. Maryam-Lizbeth Lee-Sahijuan, MPH', specialization: 'Obstetrician-Gynecologist', schedule: 'By Appointment' }
    ]
  },
  {
    unit: '105',
    doctors: [
      { name: 'Dr. Fernasuli T. Hassiman- Borromeo, MD, DPOGS', specialization: 'The Purple Clinic - Obstetrician-Gynecologist', schedule: 'MON- TUE- THU- FRI, 10:00AM to 1:00PM', contact: '09169047646 (Joanne Jimenez)' }
    ]
  },
  {
    unit: '201',
    doctors: [
      { name: 'Dr. Ben Jason Caranay', specialization: 'Pediatrician', schedule: 'MON- TUE- WED- FRI, 10:00AM to 12:00NN; SATURDAY- 1:00PM onwards', contact: '0965-174-6344' }
    ]
  },
  {
    unit: '202',
    doctors: [
      { name: 'Dr. Lottie Andales Uy, DPPS, DPSPS, FPCC', specialization: 'Pediatrician', schedule: 'MONDAY to FRIDAY, 11:00AM to 2:00PM' }
    ]
  },
  {
    unit: '203',
    doctors: [
      { name: 'Femme THE OB-GYN CLINIC BY N&N', specialization: 'Obstetrician-Gynecologist', schedule: 'MON- SAT, 9:00AM- 4:00PM' }
    ]
  },
  {
    unit: '204',
    doctors: [
      { name: 'Dr. Jehada-Inn U. Misuari- Alihuddin', specialization: 'The Queen\'s OB-Gyn - Obstetrics- Gynecologist/ Oncologist', schedule: 'TUE- WED- THU, 1:00PM to 3:00PM' },
      { name: 'Dr. Sherryl Anne Macrohon- Sew', specialization: 'Obstetrics- Gynecologist', schedule: 'MON- WED- FRI- SAT, 9:00AM to 4:00PM' }
    ]
  },
  {
    unit: '205',
    doctors: [
      { name: 'Available for Lease', specialization: '', schedule: '' }
    ]
  },
  {
    unit: '206',
    doctors: [
      { name: 'Dr. Soledad Pamela Daguio', specialization: 'Pediatric/Adolescent Medicine', schedule: 'MON- WED- FRI, 1:00PM to 4:00PM; TUE- THU- SAT, 10:00AM to 12:00NN' },
      { name: 'Dr. Evielyne J. Labbay- Kali', specialization: 'General/ Ambulatory Pediatrics', schedule: 'MON- WED- FRI, 10:00AM to 12:00PM; TUE- THU- SAT, 1:00PM to 3:00PM' }
    ]
  },
  {
    unit: '207',
    doctors: [
      { name: 'Available for Lease', specialization: '', schedule: '' }
    ]
  }
];

export const Doctors: React.FC = () => {
  const { t } = useLanguage();
  const [doctors, setDoctors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'doctor'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
      setDoctors(docs);
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight">{t('ourDoctors')}</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {t('doctorsDesc')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        <input
          type="text"
          placeholder={t('searchPlaceholder') || "Search by name or specialization..."}
          className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hospital Doctors */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center">
          <Building2 className="mr-2 text-emerald-600" />
          {t('hospitalStaff')}
        </h2>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.uid}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-emerald-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-emerald-200">
                    <User size={80} />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                    {doc.specialization || t('generalPractitioner')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Dr. {doc.name}</h3>
                  <div className="flex items-center text-neutral-500 text-sm mb-4">
                    <Star className="text-amber-400 mr-1" size={16} fill="currentColor" />
                    <span className="font-bold text-neutral-700 mr-1">4.9</span>
                    <span>(120+ reviews)</span>
                  </div>
                  <div className="flex items-center text-neutral-500 text-sm mb-6">
                    <MapPin size={16} className="mr-1" />
                    Zamboanga Puericulture Center, Zamboanga City
                  </div>
                  <Link
                    to="/login"
                    className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                  >
                    {t('bookConsultation')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Hospital Annex - Private Clinics */}
      <div className="mt-24">
        <div className="bg-emerald-900 rounded-[3rem] p-12 md:p-16 text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            {t('outpatientUnit')}
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl">
            {t('privateClinics')} {t('privateClinicsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {privateClinics.map((clinic) => (
            <motion.div
              key={clinic.unit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden"
            >
              <div className="bg-neutral-50 px-8 py-4 border-b border-neutral-100 flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{t('unit')}</span>
                <span className="text-2xl font-black text-emerald-600">{clinic.unit}</span>
              </div>
              <div className="p-8 space-y-8">
                {clinic.doctors.map((doc, idx) => (
                  <div key={idx} className={idx !== 0 ? 'pt-8 border-t border-neutral-50' : ''}>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{doc.name}</h3>
                    <p className="text-emerald-600 font-medium mb-4">{doc.specialization}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 text-sm text-neutral-600">
                        <Clock size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                        <span>{doc.schedule}</span>
                      </div>
                      {doc.contact && (
                        <div className="flex items-start space-x-3 text-sm text-neutral-600">
                          <Phone size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900">{t('appointment')}:</span>
                            <a href={`tel:${doc.contact}`} className="hover:text-emerald-600 transition-colors">{doc.contact}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medical Arts Building - Physicians' Clinics */}
      <div className="mt-24">
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-16 text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            {t('medicalArtsBuilding')}
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl">
            {t('physiciansClinics')} located at the Medical Arts Building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {medicalArtsClinics.map((clinic) => (
            <motion.div
              key={clinic.unit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden"
            >
              <div className="bg-neutral-50 px-8 py-4 border-b border-neutral-100 flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{t('room')}</span>
                <span className="text-2xl font-black text-neutral-900">{clinic.unit}</span>
              </div>
              <div className="p-8 space-y-8">
                {clinic.doctors[0].name === 'Available for Lease' ? (
                  <div className="py-8 text-center">
                    <p className="text-neutral-400 font-bold italic">{t('availableForLease')}</p>
                  </div>
                ) : (
                  clinic.doctors.map((doc, idx) => (
                    <div key={idx} className={idx !== 0 ? 'pt-8 border-t border-neutral-50' : ''}>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{doc.name}</h3>
                      <p className="text-neutral-600 font-medium mb-4">{doc.specialization}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 text-sm text-neutral-600">
                          <Clock size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                          <span>{doc.schedule}</span>
                        </div>
                        {doc.contact && (
                          <div className="flex items-start space-x-3 text-sm text-neutral-600">
                            <Phone size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="font-bold text-neutral-900">{t('appointment')}:</span>
                              <span className="text-neutral-600">{doc.contact}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
