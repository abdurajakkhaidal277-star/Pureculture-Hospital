import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, Appointment, Invoice } from '../types';
import { motion } from 'framer-motion';
import { Users, Calendar, CreditCard, Search, UserPlus, ShieldCheck, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'appointments' | 'billing'>('users');

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile)));
    });
    const unsubApps = onSnapshot(query(collection(db, 'appointments'), orderBy('date', 'desc')), (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
      setLoading(false);
    });
    return () => { unsubUsers(); unsubApps(); };
  }, []);

  const generateInvoice = async (app: Appointment) => {
    try {
      await addDoc(collection(db, 'invoices'), {
        appointmentId: app.id,
        patientId: app.patientId,
        totalAmount: 500, // Default consultation fee
        status: 'unpaid',
        createdAt: serverTimestamp(),
      });
      alert("Invoice generated for " + app.patientName);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 p-1 bg-neutral-100 rounded-2xl w-fit">
        {[
          { id: 'users', icon: Users, label: 'Users' },
          { id: 'appointments', icon: Calendar, label: 'Appointments' },
          { id: 'billing', icon: CreditCard, label: 'Billing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl font-bold flex items-center transition-all ${
              activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-neutral-500'
            }`}
          >
            <tab.icon size={18} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 font-bold text-neutral-700">Name</th>
                <th className="px-6 py-4 font-bold text-neutral-700">Email</th>
                <th className="px-6 py-4 font-bold text-neutral-700">Role</th>
                <th className="px-6 py-4 font-bold text-neutral-700">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {users.map((user) => (
                <tr key={user.uid} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">{user.name}</td>
                  <td className="px-6 py-4 text-neutral-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-purple-50 text-purple-700' :
                      user.role === 'doctor' ? 'bg-blue-50 text-blue-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {user.createdAt ? format(user.createdAt.toDate(), 'MMM d, yyyy') : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-bold text-neutral-900">Patient: {app.patientName}</p>
                <p className="text-sm text-neutral-500">Doctor: Dr. {app.doctorName}</p>
                <p className="text-xs text-neutral-400">{format(app.date.toDate(), 'PPpp')}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100'
                }`}>
                  {app.status}
                </span>
                {app.status === 'completed' && (
                  <button
                    onClick={() => generateInvoice(app)}
                    className="text-emerald-600 font-bold text-sm hover:underline"
                  >
                    Generate Invoice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
