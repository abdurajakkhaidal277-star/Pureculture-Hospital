import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Appointment, Invoice, UserProfile } from '../types';
import { DoctorDashboard } from './DoctorDashboard';
import { AdminPanel } from './AdminPanel';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, FileText, User, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguage } from '../LanguageContext';

export const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [doctors, setDoctors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const q = profile.role === 'patient' 
      ? query(collection(db, 'appointments'), where('patientId', '==', profile.uid), orderBy('date', 'desc'), limit(5))
      : profile.role === 'doctor'
      ? query(collection(db, 'appointments'), where('doctorId', '==', profile.uid), orderBy('date', 'desc'), limit(5))
      : query(collection(db, 'appointments'), orderBy('date', 'desc'), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(apps);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            {t('hello')}, {profile.name.split(' ')[0]}!
          </h1>
          <p className="text-neutral-500">{t('welcomeBackDash')}</p>
        </div>
        {profile.role === 'patient' && (
          <Link
            to="/book"
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center"
          >
            <Plus className="mr-2" size={20} />
            {t('bookNewAppointment')}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats/Overview */}
        <div className="lg:col-span-2 space-y-8">
          {profile.role === 'doctor' ? (
            <DoctorDashboard />
          ) : profile.role === 'admin' ? (
            <AdminPanel />
          ) : (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Calendar size={20} />
                  </div>
                  <p className="text-sm text-neutral-500 font-medium">{t('totalAppointments')}</p>
                  <p className="text-2xl font-bold text-neutral-900">{appointments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <Clock size={20} />
                  </div>
                  <p className="text-sm text-neutral-500 font-medium">{t('pending')}</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {appointments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <FileText size={20} />
                  </div>
                  <p className="text-sm text-neutral-500 font-medium">{t('medicalRecords')}</p>
                  <p className="text-2xl font-bold text-neutral-900">12</p>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-50 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-900">{t('recentAppointments')}</h2>
                  <Link to="/appointments" className="text-emerald-600 text-sm font-bold hover:underline">{t('viewAll')}</Link>
                </div>
                <div className="divide-y divide-neutral-50">
                  {loading ? (
                    <div className="p-10 text-center text-neutral-400">{t('loading')}</div>
                  ) : appointments.length > 0 ? (
                    appointments.map((app) => (
                      <div key={app.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-500">
                            <User size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-neutral-900">
                              {profile.role === 'patient' ? `Dr. ${app.doctorName}` : app.patientName}
                            </p>
                            <p className="text-sm text-neutral-500">
                              {format(app.date.toDate(), 'MMM d, yyyy • h:mm a')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                            app.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                            app.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <p className="text-neutral-400 mb-4">{t('noAppointmentsFound')}</p>
                      {profile.role === 'patient' && (
                        <Link to="/book" className="text-emerald-600 font-bold">{t('bookFirstAppointment')}</Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Billing Summary */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">{t('billing')}</h2>
              <CreditCard className="text-neutral-400" size={20} />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-2xl">
                <p className="text-sm text-neutral-500 mb-1">{t('unpaidBalance')}</p>
                <p className="text-2xl font-bold text-neutral-900">₱0.00</p>
              </div>
              <Link to="/billing" className="block w-full py-3 bg-neutral-900 text-white text-center rounded-xl font-bold hover:bg-neutral-800 transition-all">
                {t('viewInvoices')}
              </Link>
            </div>
          </div>

          {/* Notifications/Alerts */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">{t('notifications')}</h2>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-sm text-neutral-600">
                  {t('labResultsReady')}
                </p>
              </div>
              <div className="flex space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-sm text-neutral-600">
                  {t('appointmentConfirmed')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
