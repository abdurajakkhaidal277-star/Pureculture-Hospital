import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Invoice } from '../types';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, AlertCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export const Billing: React.FC = () => {
  const { profile } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;

    const q = query(
      collection(db, 'invoices'),
      where('patientId', '==', profile.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  const handlePay = async (invoiceId: string) => {
    setPayingId(invoiceId);
    // Simulate payment processing
    setTimeout(async () => {
      try {
        await updateDoc(doc(db, 'invoices', invoiceId), {
          status: 'paid'
        });
        alert("Payment successful via GCash!");
      } catch (err) {
        console.error("Payment error:", err);
      } finally {
        setPayingId(null);
      }
    }, 2000);
  };

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Billing & Invoices</h1>
        <p className="text-lg text-neutral-600">Manage your payments and view transaction history.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {invoices.length > 0 ? (
              invoices.map((inv) => (
                <motion.div
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {inv.status === 'paid' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900">Invoice #{inv.id.slice(0, 8)}</h3>
                      <p className="text-sm text-neutral-500">
                        {format(inv.createdAt.toDate(), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-neutral-900 mb-2">₱{inv.totalAmount.toLocaleString()}</p>
                    {inv.status === 'unpaid' ? (
                      <button
                        onClick={() => handlePay(inv.id)}
                        disabled={payingId === inv.id}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center disabled:opacity-70"
                      >
                        {payingId === inv.id ? <Loader2 className="animate-spin mr-2" size={18} /> : 'Pay Now'}
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Paid</span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-200">
                <p className="text-neutral-400">No invoices found.</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold">GCash</div>
                      <span className="font-medium">GCash Wallet</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-neutral-700 rounded flex items-center justify-center text-[10px] font-bold italic">Maya</div>
                      <span className="font-medium">Maya Wallet</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">
                  Secure payments powered by PayMongo. Supports GCash, Maya, and major credit cards.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
