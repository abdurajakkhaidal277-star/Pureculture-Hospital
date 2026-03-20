import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tl';

interface Translations {
  [key: string]: {
    en: string;
    tl: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { en: 'Home', tl: 'Home' },
  about: { en: 'About', tl: 'Tungkol sa Amin' },
  doctors: { en: 'Doctors', tl: 'Mga Doktor' },
  packages: { en: 'Packages', tl: 'Mga Package' },
  contact: { en: 'Contact', tl: 'Kontak' },
  dashboard: { en: 'Dashboard', tl: 'Dashboard' },
  login: { en: 'Login', tl: 'Mag-login' },
  logout: { en: 'Logout', tl: 'Mag-logout' },
  
  // Home
  welcome: { en: 'Welcome to Zamboanga Puericulture Center', tl: 'Maligayang Pagdating sa Zamboanga Puericulture Center' },
  heroTitle: { en: 'Healthcare that cares for you.', tl: 'Serbisyong pangkalusugan na nagmamalasakit sa iyo.' },
  heroDesc: { en: 'Experience world-class medical services with the most advanced technology and compassionate care in the Philippines.', tl: 'Damhin ang world-class na serbisyong medikal gamit ang pinaka-advanced na teknolohiya at mapagkalingang pangangalaga sa Pilipinas.' },
  bookAppointment: { en: 'Book Appointment', tl: 'Mag-book ng Appointment' },
  findDoctor: { en: 'Find a Doctor', tl: 'Maghanap ng Doktor' },
  
  // Doctors Page
  ourDoctors: { en: 'Our Expert Doctors', tl: 'Ang Aming mga Ekspertong Doktor' },
  doctorsDesc: { en: 'Meet our team of highly qualified specialists dedicated to providing the best medical care.', tl: 'Kilalanin ang aming koponan ng mga kwalipikadong espesyalista na nakatuon sa pagbibigay ng pinakamahusay na pangangalagang medikal.' },
  outpatientUnit: { en: 'Outpatient and Maternal Care Unit (Hospital Annex)', tl: 'Outpatient at Maternal Care Unit (Hospital Annex)' },
  privateClinics: { en: 'Private Clinics', tl: 'Mga Pribadong Klinika' },
  unit: { en: 'Unit', tl: 'Unit' },
  appointment: { en: 'For Appointment', tl: 'Para sa Appointment' },
  info: { en: 'For Information', tl: 'Para sa Impormasyon' },
  inquiries: { en: 'For Inquiries', tl: 'Para sa mga Katanungan' },
  hospitalStaff: { en: 'Hospital Staff Specialists', tl: 'Mga Espesyalista ng Ospital' },
  privateClinicsDesc: { en: 'located at the Hospital Annex. Please contact individual units for appointments and inquiries.', tl: 'matatagpuan sa Hospital Annex. Mangyaring makipag-ugnayan sa bawat unit para sa mga appointment at katanungan.' },
  searchPlaceholder: { en: 'Search by name or specialization...', tl: 'Maghanap sa pangalan o espesyalisasyon...' },
  bookConsultation: { en: 'Book Consultation', tl: 'Mag-book ng Konsultasyon' },
  generalPractitioner: { en: 'General Practitioner', tl: 'General Practitioner' },
  medicalArtsBuilding: { en: 'Medical Arts Building', tl: 'Medical Arts Building' },
  physiciansClinics: { en: 'Physicians’ Clinics', tl: 'Mga Klinika ng mga Doktor' },
  room: { en: 'Room', tl: 'Room' },
  availableForLease: { en: 'Available for Lease', tl: 'Available para sa Lease' },
  
  // Packages
  buntisAlert: { en: 'Buntis Package Alert', tl: 'Buntis Package Alert' },
  normalDelivery: { en: 'Normal Delivery Package', tl: 'Normal Delivery Package' },
  allInclusive: { en: 'All-inclusive for only', tl: 'All-inclusive sa halagang' },
  whatsIncluded: { en: 'What’s included?', tl: 'Ano ang kasama?' },
  packageDetails: { en: 'Package Details', tl: 'Detalye ng Package' },
  alagaNiNanay: { en: '"Alaga ni Nanay, Sigurado kay Baby!"', tl: '"Alaga ni Nanay, Sigurado kay Baby!"' },

  // Login
  welcomeBack: { en: 'Welcome Back', tl: 'Maligayang Pagbabalik' },
  createAccount: { en: 'Create Account', tl: 'Gumawa ng Account' },
  loginToAccess: { en: 'Login to access your dashboard', tl: 'Mag-login para ma-access ang iyong dashboard' },
  joinZPC: { en: 'Join Zamboanga Puericulture Center today', tl: 'Sumali sa Zamboanga Puericulture Center ngayon' },
  fullName: { en: 'Full Name', tl: 'Buong Pangalan' },
  phoneNumber: { en: 'Phone Number', tl: 'Numero ng Telepono' },
  iamA: { en: 'I am a...', tl: 'Ako ay isang...' },
  patient: { en: 'Patient', tl: 'Pasyente' },
  doctor: { en: 'Doctor', tl: 'Doktor' },
  emailAddress: { en: 'Email Address', tl: 'Email Address' },
  password: { en: 'Password', tl: 'Password' },
  signUp: { en: 'Sign Up', tl: 'Mag-sign Up' },
  noAccount: { en: "Don't have an account? Sign Up", tl: "Wala pang account? Mag-sign Up" },
  alreadyHaveAccount: { en: 'Already have an account? Login', tl: 'May account na? Mag-login' },

  // Dashboard
  myDashboard: { en: 'My Dashboard', tl: 'Aking Dashboard' },
  upcomingAppointments: { en: 'Upcoming Appointments', tl: 'Mga Darating na Appointment' },
  medicalRecords: { en: 'Medical Records', tl: 'Mga Rekord Medikal' },
  billing: { en: 'Billing & Payments', tl: 'Billing at mga Bayad' },
  noAppointments: { en: 'No upcoming appointments', tl: 'Walang darating na appointment' },
  noRecords: { en: 'No medical records found', tl: 'Walang nahanap na rekord medikal' },
  hello: { en: 'Hello', tl: 'Kumusta' },
  welcomeBackDash: { en: 'Welcome back to your dashboard.', tl: 'Maligayang pagbabalik sa iyong dashboard.' },
  bookNewAppointment: { en: 'Book New Appointment', tl: 'Mag-book ng Bagong Appointment' },
  totalAppointments: { en: 'Total Appointments', tl: 'Kabuuang Appointment' },
  pending: { en: 'Pending', tl: 'Pending' },
  recentAppointments: { en: 'Recent Appointments', tl: 'Mga Kamakailang Appointment' },
  viewAll: { en: 'View All', tl: 'Tingnan Lahat' },
  noAppointmentsFound: { en: 'No appointments found.', tl: 'Walang nahanap na appointment.' },
  bookFirstAppointment: { en: 'Book your first appointment', tl: 'I-book ang iyong unang appointment' },
  unpaidBalance: { en: 'Unpaid Balance', tl: 'Hindi pa Bayad na Balanse' },
  viewInvoices: { en: 'View Invoices', tl: 'Tingnan ang mga Invoice' },
  notifications: { en: 'Notifications', tl: 'Mga Notipikasyon' },
  labResultsReady: { en: 'Your lab results are ready to view.', tl: 'Ang iyong mga resulta sa lab ay handa na para tingnan.' },
  appointmentConfirmed: { en: 'Appointment confirmed.', tl: 'Kumpirmado na ang appointment.' },
  
  // Common
  search: { en: 'Search', tl: 'Maghanap' },
  loading: { en: 'Loading...', tl: 'Naglo-load...' },
  error: { en: 'Error', tl: 'Error' },
  save: { en: 'Save', tl: 'I-save' },
  cancel: { en: 'Cancel', tl: 'I-cancel' },
  delete: { en: 'Delete', tl: 'I-delete' },
  edit: { en: 'Edit', tl: 'I-edit' },
  view: { en: 'View', tl: 'Tingnan' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
