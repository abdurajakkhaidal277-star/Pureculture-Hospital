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
  quickLinks: { en: 'Quick Links', tl: 'Mabilisang Links' },
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
  
  // News & Events
  latestNews: { en: 'Latest News & Events', tl: 'Mga Pinakabagong Balita at Kaganapan' },
  womensMonthTitle: { en: "✨ WOMEN'S MONTH CELEBRATION AT ZPMCH ✨", tl: '✨ PAGDIRIWANG NG BUWAN NG KABABAIHAN SA ZPMCH ✨' },
  womensMonthDesc: { en: 'Zamboanga Puericulture Maternity and Children’s Hospital (ZPMCH) welcomed Dr. Jennifer D. Araneta, who was invited to conduct a lecture on Patient Safety on March 19, 2026, in celebration of Women’s Month!', tl: 'Malugod na tinanggap ng Zamboanga Puericulture Maternity and Children’s Hospital (ZPMCH) si Dr. Jennifer D. Araneta, na naimbitahang magsagawa ng lecture tungkol sa Patient Safety noong Marso 19, 2026, bilang pagdiriwang ng Buwan ng Kababaihan!' },
  womensMonthQuote: { en: '"As an OB-GYNE, it is both an honor and a responsibility to care for women... Patient safety is not just a protocol; it is a commitment to protect lives, uphold dignity, and ensure that every mother, daughter, and sister receives the care she truly deserves."', tl: '"Bilang isang OB-GYNE, isang karangalan at responsibilidad ang mag-alaga sa mga kababaihan... Ang kaligtasan ng pasyente ay hindi lamang isang protocol; ito ay isang pangako na protektahan ang mga buhay, itaguyod ang dignidad, at tiyakin na ang bawat ina, anak na babae, at kapatid na babae ay makakatanggap ng pangangalagang nararapat sa kanila."' },
  womensMonthClosing: { en: 'Let us continue empowering women through education, compassion, and excellence in healthcare!', tl: 'Patuloy nating bigyang-kapangyarihan ang mga kababaihan sa pamamagitan ng edukasyon, malasakit, at kahusayan sa pangangalagang pangkalusugan!' },

  // Women's Month Message
  womensMonthMessageTitle: { en: 'Zamboanga Puericulture Maternity and Children’s Hospital celebrates Women’s Month 2026! 💜', tl: 'Ipinagdiriwang ng Zamboanga Puericulture Maternity and Children’s Hospital ang Buwan ng Kababaihan 2026! 💜' },
  womensMonthMessageBody: { en: 'Our OIC Chief Nurse, Aprilyn Antonio, RN, shares a powerful message recognizing the strength, compassion, and dedication of all women making a difference in our communities and workplaces.', tl: 'Ang aming OIC Chief Nurse, Aprilyn Antonio, RN, ay nagbabahagi ng isang makapangyarihang mensahe na kumikilala sa lakas, malasakit, at dedikasyon ng lahat ng kababaihan na gumagawa ng pagkakaiba sa ating mga komunidad at lugar ng trabaho.' },
  womensMonthMessageClosing: { en: 'This month, let’s stand together to support, uplift, and empower one another. To every incredible woman out there, your resilience and passion inspire us daily! ✨', tl: 'Ngayong buwan, magsama-sama tayo upang suportahan, iangat, at bigyang-kapangyarihan ang isa\'t isa. Sa bawat kahanga-hangang babae diyan, ang inyong katatagan at hilig ay nagbibigay-inspirasyon sa amin araw-araw! ✨' },
  happyWomensMonth: { en: 'Happy Women’s Month! 💪', tl: 'Maligayang Buwan ng Kababaihan! 💪' },

  // Careers
  careers: { en: 'Careers', tl: 'Mga Trabaho' },
  joinOurTeam: { en: 'Join Our Growing Team!', tl: 'Sumali sa Aming Lumalaking Koponan!' },
  jobOpenings: { en: 'Job Openings', tl: 'Mga Bakanteng Trabaho' },
  applyNow: { en: 'Apply Now', tl: 'Mag-apply Na' },
  requirements: { en: 'Requirements', tl: 'Mga Kinakailangan' },
  sendCvTo: { en: 'Send your CV and Cover Letter to', tl: 'Ipadala ang iyong CV at Cover Letter sa' },
  careerInquiry: { en: 'For career inquiries, contact us at', tl: 'Para sa mga katanungan sa trabaho, makipag-ugnayan sa amin sa' },
  freshGradsWelcome: { en: 'Fresh graduates are welcome to apply!', tl: 'Ang mga bagong nagtapos ay malugod na inaanyayahang mag-apply!' },

  // Chatbot
  chatWithUs: { en: 'Chat with us', tl: 'Makipag-chat sa amin' },
  howCanIHelp: { en: 'How can I help you today?', tl: 'Paano kita matutulungan ngayon?' },
  typeMessage: { en: 'Type a message...', tl: 'Mag-type ng mensahe...' },
  botWelcome: { en: 'Hello! I am the ZPMCH Assistant. How can I help you today?', tl: 'Kumusta! Ako ang ZPMCH Assistant. Paano kita matutulungan ngayon?' },

  // IVT Training
  ivtTitle: { en: '3-DAY BASIC IVT TRAINING', tl: '3-ARAW NA BASIC IVT TRAINING' },
  ivtDate: { en: 'April 30 – May 1-2, 2026', tl: 'Abril 30 – Mayo 1-2, 2026' },
  ivtTime: { en: '8:00 AM - 5:00 PM', tl: '8:00 AM - 5:00 PM' },
  ivtFee: { en: 'Fee: Php 3,500.00', tl: 'Bayad: Php 3,500.00' },
  ivtRequirements: { en: 'Requirements', tl: 'Mga Kinakailangan' },
  ivtInclusions: { en: 'Inclusions', tl: 'Mga Kasama' },
  ivtReserve: { en: 'Reserve your spot now', tl: 'Mag-reserve na ng iyong slot' },
  ivtLimitedSlots: { en: 'LIMITED SLOTS AVAILABLE!', tl: 'LIMITADONG SLOTS LAMANG!' },
  ivtDesc: { en: 'Master the essential skills in Intravenous Therapy with our 3-DAY BASIC IVT TRAINING!', tl: 'Maging bihasa sa mga mahahalagang kasanayan sa Intravenous Therapy sa aming 3-ARAW NA BASIC IVT TRAINING!' },

  // Contact
  contactUs: { en: 'Contact Us', tl: 'Makipag-ugnayan sa Amin' },
  contactDesc: { en: 'We are here to help you. Reach out to us through any of the following channels.', tl: 'Nandito kami para tulungan ka. Makipag-ugnayan sa amin sa pamamagitan ng alinman sa mga sumusunod na channel.' },
  phone: { en: 'Phone', tl: 'Telepono' },
  phoneDesc: { en: 'Call us for appointments or inquiries.', tl: 'Tawagan kami para sa mga appointment o katanungan.' },
  email: { en: 'Email', tl: 'Email' },
  emailDesc: { en: 'Send us an email for non-urgent matters.', tl: 'Mag-email sa amin para sa mga hindi apurahang bagay.' },
  location: { en: 'Location', tl: 'Lokasyon' },
  locationDesc: { en: 'Visit our hospital in Zamboanga City.', tl: 'Bisitahin ang aming ospital sa Zamboanga City.' },
  openingHours: { en: 'Opening Hours', tl: 'Mga Oras ng Pagbubukas' },
  emergencyCare: { en: 'Emergency Care', tl: 'Pangangalaga sa Emergency' },
  outpatientClinics: { en: 'Outpatient Clinics', tl: 'Mga Outpatient Clinic' },
  labDiagnostics: { en: 'Laboratory & Diagnostics', tl: 'Laboratoryo at Diagnostics' },
  visitingHours: { en: 'Visiting Hours', tl: 'Mga Oras ng Pagbisita' },
  available247: { en: '24/7 Available', tl: '24/7 Available' },
  monSat85: { en: 'Mon - Sat: 8:00 AM - 5:00 PM', tl: 'Lunes - Sabado: 8:00 AM - 5:00 PM' },
  monSun78: { en: 'Mon - Sun: 7:00 AM - 8:00 PM', tl: 'Lunes - Linggo: 7:00 AM - 8:00 PM' },
  daily108: { en: 'Daily: 10:00 AM - 8:00 PM', tl: 'Araw-araw: 10:00 AM - 8:00 PM' },
  footerDesc: { en: 'Zamboanga Puericulture Center Org. No. 144. Providing world-class healthcare with compassion and excellence. Your health is our priority.', tl: 'Zamboanga Puericulture Center Org. No. 144. Nagbibigay ng world-class na pangangalagang pangkalusugan na may malasakit at kahusayan. Ang iyong kalusugan ang aming priyoridad.' },
  orgName: { en: 'Zamboanga Puericulture Center Org. No. 144', tl: 'Zamboanga Puericulture Center Org. No. 144' },

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
