import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { Search, User, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Doctors: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight">Our Expert Doctors</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Connect with top-tier medical specialists dedicated to providing you with the best care.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
                  {doc.specialization || 'General Practitioner'}
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
                  Pureculture Hospital, Manila
                </div>
                <Link
                  to="/login"
                  className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
