import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Invoice } from '../types';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, AlertCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../LanguageContext';

type PaymentMethod = 'gcash' | 'maya' | 'bank' | 'crypto';

export const Billing: React.FC = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('gcash');

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
    // Simulate payment verification request
    setTimeout(async () => {
      try {
        await updateDoc(doc(db, 'invoices', invoiceId), {
          status: 'pending_verification'
        });
        alert(`${t('paymentPending')}! Our team will verify your payment soon.`);
      } catch (err) {
        console.error("Payment error:", err);
      } finally {
        setPayingId(null);
      }
    }, 1500);
  };

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">{t('billingAndInvoices')}</h1>
        <p className="text-lg text-neutral-600">{t('managePayments')}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
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
                  className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      inv.status === 'paid' ? 'bg-pink-50 text-pink-600' : 
                      inv.status === 'pending_verification' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {inv.status === 'paid' ? <CheckCircle2 size={24} /> : 
                       inv.status === 'pending_verification' ? <Loader2 className="animate-spin" size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900">Invoice #{inv.id.slice(0, 8)}</h3>
                      <p className="text-sm text-neutral-500">
                        {format(inv.createdAt.toDate(), 'MMMM d, yyyy')}
                      </p>
                      {inv.status === 'pending_verification' && (
                        <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider">{t('paymentPending')}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-xl font-bold text-neutral-900 mb-2">₱{inv.totalAmount.toLocaleString()}</p>
                    {inv.status === 'unpaid' ? (
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-xs text-neutral-500 max-w-[200px] text-right italic">
                          {selectedMethod === 'gcash' && t('gcashInstructions')}
                          {selectedMethod === 'maya' && t('mayaInstructions')}
                          {selectedMethod === 'bank' && t('bankInstructions')}
                          {selectedMethod === 'crypto' && t('cryptoInstructions')}
                        </div>
                        <button
                          onClick={() => handlePay(inv.id)}
                          disabled={payingId === inv.id}
                          className="bg-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-pink-700 transition-all flex items-center disabled:opacity-70"
                        >
                          {payingId === inv.id ? <Loader2 className="animate-spin mr-2" size={18} /> : t('confirmPayment')}
                        </button>
                      </div>
                    ) : inv.status === 'paid' ? (
                      <span className="text-pink-600 font-bold text-sm uppercase tracking-wider">{t('paid')}</span>
                    ) : null}
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
                <h2 className="text-xl font-bold mb-6">{t('paymentMethods')}</h2>
                <div className="space-y-4 mb-8">
                  {/* GCash */}
                  <button
                    onClick={() => setSelectedMethod('gcash')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedMethod === 'gcash' ? 'bg-white/10 border-pink-500' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold">GCash</div>
                      <span className="font-medium">{t('gcash')}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedMethod === 'gcash' ? 'border-pink-500 bg-pink-500' : 'border-white/20'}`}></div>
                  </button>

                  {/* Maya */}
                  <button
                    onClick={() => setSelectedMethod('maya')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedMethod === 'maya' ? 'bg-white/10 border-pink-500' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-neutral-700 rounded flex items-center justify-center text-[10px] font-bold italic">Maya</div>
                      <span className="font-medium">{t('maya')}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedMethod === 'maya' ? 'border-pink-500 bg-pink-500' : 'border-white/20'}`}></div>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => setSelectedMethod('bank')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedMethod === 'bank' ? 'bg-white/10 border-pink-500' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-neutral-600 rounded flex items-center justify-center text-[10px] font-bold">BANK</div>
                      <span className="font-medium">{t('bankTransfer')}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedMethod === 'bank' ? 'border-pink-500 bg-pink-500' : 'border-white/20'}`}></div>
                  </button>

                  {/* Crypto */}
                  <button
                    onClick={() => setSelectedMethod('crypto')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedMethod === 'crypto' ? 'bg-white/10 border-pink-500' : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-amber-500 rounded flex items-center justify-center text-[10px] font-bold">BTC</div>
                      <span className="font-medium">{t('crypto')}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${selectedMethod === 'crypto' ? 'border-pink-500 bg-pink-500' : 'border-white/20'}`}></div>
                  </button>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t('securePayments')}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
