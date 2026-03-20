import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthProvider';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';

export const BookAppointment: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState<UserProfile[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<UserProfile | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'doctor'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
      setDoctors(docs);
      setFetchingDoctors(false);
    };
    fetchDoctors();
  }, []);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleBooking = async () => {
    if (!profile || !selectedDoctor || !selectedDate || !selectedTime) return;
    setLoading(true);

    try {
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':');
      let finalHours = parseInt(hours);
      if (period === 'PM' && finalHours !== 12) finalHours += 12;
      if (period === 'AM' && finalHours === 12) finalHours = 0;

      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(finalHours, parseInt(minutes), 0, 0);

      await addDoc(collection(db, 'appointments'), {
        patientId: profile.uid,
        doctorId: selectedDoctor.uid,
        patientName: profile.name,
        doctorName: selectedDoctor.name,
        date: Timestamp.fromDate(appointmentDate),
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setStep(4);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-12">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`w-20 h-1 mx-2 rounded ${
                step > s ? 'bg-emerald-600' : 'bg-neutral-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center tracking-tight">Select a Specialist</h2>
            {fetchingDoctors ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((doc) => (
                  <button
                    key={doc.uid}
                    onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                    className="flex items-center p-6 bg-white border border-neutral-200 rounded-3xl hover:border-emerald-600 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <User size={32} />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-neutral-900 text-lg">Dr. {doc.name}</p>
                      <p className="text-neutral-500">{doc.specialization || 'General Practitioner'}</p>
                    </div>
                    <ChevronRight className="text-neutral-300 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center tracking-tight">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-neutral-700 mb-4 flex items-center">
                  <CalendarIcon className="mr-2" size={20} /> Available Dates
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => {
                    const date = addDays(startOfToday(), i + 1);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-neutral-200 hover:border-emerald-600'
                        }`}
                      >
                        <p className="text-xs font-bold uppercase">{format(date, 'EEE')}</p>
                        <p className="text-xl font-bold">{format(date, 'd')}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-neutral-700 mb-4 flex items-center">
                  <Clock className="mr-2" size={20} /> Available Slots
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-2xl border text-center font-bold transition-all disabled:opacity-50 ${
                        selectedTime === time ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-neutral-200 hover:border-emerald-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 flex justify-between">
              <button onClick={() => setStep(1)} className="px-8 py-3 font-bold text-neutral-500 hover:text-neutral-900">Back</button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center tracking-tight">Confirm Booking</h2>
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Doctor</p>
                  <p className="font-bold text-neutral-900">Dr. {selectedDoctor?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Date & Time</p>
                  <p className="font-bold text-neutral-900">
                    {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-100">
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'Confirm Appointment'}
                </button>
                <button onClick={() => setStep(2)} className="w-full mt-4 py-2 text-neutral-500 font-bold hover:text-neutral-900">Edit Details</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Booking Confirmed!</h2>
            <p className="text-lg text-neutral-600 mb-12 max-w-md mx-auto">
              Your appointment with Dr. {selectedDoctor?.name} has been successfully scheduled. You can view details in your dashboard.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-neutral-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all"
            >
              Go to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { AnimatePresence } from 'framer-motion';
