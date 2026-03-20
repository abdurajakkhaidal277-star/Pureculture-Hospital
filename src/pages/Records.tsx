import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Prescription, LabResult } from '../types';
import { motion } from 'framer-motion';
import { FileText, FlaskConical, Download, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export const Records: React.FC = () => {
  const { profile } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'labs'>('prescriptions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const qPres = query(
      collection(db, 'prescriptions'),
      where('patientId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );

    const qLabs = query(
      collection(db, 'lab_results'),
      where('patientId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubPres = onSnapshot(qPres, (snapshot) => {
      setPrescriptions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prescription)));
    });

    const unsubLabs = onSnapshot(qLabs, (snapshot) => {
      setLabResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LabResult)));
      setLoading(false);
    });

    return () => {
      unsubPres();
      unsubLabs();
    };
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Medical Records</h1>
        <p className="text-lg text-neutral-600">Access your prescriptions and laboratory results in one place.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 p-1 bg-neutral-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'prescriptions' ? 'bg-white text-emerald-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          Prescriptions
        </button>
        <button
          onClick={() => setActiveTab('labs')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'labs' ? 'bg-white text-emerald-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          Lab Results
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'prescriptions' ? (
            prescriptions.length > 0 ? (
              prescriptions.map((pres) => (
                <motion.div
                  key={pres.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">Prescription Details</h3>
                        <div className="flex items-center text-sm text-neutral-500 space-x-4">
                          <span className="flex items-center"><Calendar size={14} className="mr-1" /> {format(pres.createdAt.toDate(), 'MMMM d, yyyy')}</span>
                          <span className="flex items-center"><User size={14} className="mr-1" /> Dr. Santos</span>
                        </div>
                        <div className="mt-4 p-4 bg-neutral-50 rounded-2xl text-neutral-700 whitespace-pre-wrap">
                          {pres.details}
                        </div>
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-xl transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-200">
                <p className="text-neutral-400">No prescriptions found.</p>
              </div>
            )
          ) : (
            labResults.length > 0 ? (
              labResults.map((lab) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                        <FlaskConical size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-1">{lab.result}</h3>
                        <p className="text-sm text-neutral-500">
                          {format(lab.createdAt.toDate(), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <button className="bg-neutral-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-neutral-800 transition-all flex items-center">
                      <Download size={18} className="mr-2" />
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-200">
                <p className="text-neutral-400">No lab results found.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
