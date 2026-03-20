import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Appointment, Prescription } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, CheckCircle2, XCircle, FilePlus, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';

export const DoctorDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [isPrescribing, setIsPrescribing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', profile.uid),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [profile]);

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, 'appointments', id), { status });
  };

  const handlePrescribe = async () => {
    if (!selectedApp || !prescriptionText) return;
    setIsPrescribing(true);
    try {
      await addDoc(collection(db, 'prescriptions'), {
        appointmentId: selectedApp.id,
        patientId: selectedApp.patientId,
        doctorId: profile?.uid,
        details: prescriptionText,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'appointments', selectedApp.id), { status: 'completed' });
      setSelectedApp(null);
      setPrescriptionText('');
      alert("Prescription issued and appointment marked as completed.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPrescribing(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {appointments.map((app) => (
          <motion.div
            key={app.id}
            className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-500">
                <User size={24} />
              </div>
              <div>
                <p className="font-bold text-neutral-900">{app.patientName}</p>
                <p className="text-sm text-neutral-500">
                  {format(app.date.toDate(), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {app.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'confirmed')}
                    className="p-2 text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
                    title="Confirm"
                  >
                    <CheckCircle2 size={24} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'cancelled')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Cancel"
                  >
                    <XCircle size={24} />
                  </button>
                </>
              )}
              {app.status === 'confirmed' && (
                <button
                  onClick={() => setSelectedApp(app)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold flex items-center text-sm"
                >
                  <FilePlus size={18} className="mr-2" />
                  Prescribe
                </button>
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                app.status === 'confirmed' ? 'bg-pink-50 text-pink-700' :
                app.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                app.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                'bg-neutral-100 text-neutral-700'
              }`}>
                {app.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Prescription Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Issue Prescription</h2>
                <button onClick={() => setSelectedApp(null)} className="text-neutral-400 hover:text-neutral-600">
                  <X size={24} />
                </button>
              </div>
              <p className="text-neutral-500 mb-4">Patient: <span className="font-bold text-neutral-900">{selectedApp.patientName}</span></p>
              <textarea
                className="w-full h-40 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none transition-all mb-6"
                placeholder="Enter medication, dosage, and instructions..."
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
              />
              <button
                onClick={handlePrescribe}
                disabled={isPrescribing || !prescriptionText}
                className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {isPrescribing ? <Loader2 className="animate-spin" size={24} /> : 'Complete & Issue'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
