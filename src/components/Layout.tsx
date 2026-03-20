import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useLanguage } from '../LanguageContext';
import { Chatbot } from './Chatbot';
import { auth } from '../firebase';
import { LogOut, User, LayoutDashboard, Calendar, FileText, Settings, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('doctors'), path: '/doctors' },
    { name: t('packages'), path: '/packages' },
    { name: t('careers'), path: '/careers' },
    { name: t('contact'), path: '/contact' },
  ];

  const dashboardItems = profile ? [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Records', path: '/records', icon: FileText },
    { name: 'Profile', path: '/profile', icon: Settings },
  ] : [];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <span className="text-xl font-bold text-neutral-900 tracking-tight">Zamboanga Puericulture Center</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="text-neutral-600 hover:text-pink-600 font-medium transition-colors">
                  {item.name}
                </Link>
              ))}
              
              {/* Language Switcher */}
              <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs font-bold rounded ${language === 'en' ? 'bg-white text-pink-600 shadow-sm' : 'text-neutral-500'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tl')}
                  className={`px-2 py-1 text-xs font-bold rounded ${language === 'tl' ? 'bg-white text-pink-600 shadow-sm' : 'text-neutral-500'}`}
                >
                  TL
                </button>
              </div>

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="bg-pink-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-pink-700 transition-all shadow-sm">
                    {t('dashboard')}
                  </Link>
                  <button onClick={handleLogout} className="text-neutral-500 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-pink-700 transition-all shadow-sm">
                  {t('login')}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-neutral-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {/* Language Switcher Mobile */}
                <div className="flex items-center space-x-4 px-3 py-2 border-b border-neutral-100 mb-2">
                  <Globe size={18} className="text-neutral-400" />
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-sm font-bold ${language === 'en' ? 'text-pink-600' : 'text-neutral-400'}`}
                  >
                    English
                  </button>
                  <span className="text-neutral-200">|</span>
                  <button
                    onClick={() => setLanguage('tl')}
                    className={`text-sm font-bold ${language === 'tl' ? 'text-pink-600' : 'text-neutral-400'}`}
                  >
                    Tagalog
                  </button>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-neutral-600 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-pink-600 font-bold"
                    >
                      {t('dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 font-medium"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-pink-600 font-bold"
                  >
                    {t('login')}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <span className="text-xl font-bold tracking-tight">{t('orgName')}</span>
              </div>
              <p className="text-neutral-400 max-w-md">
                {t('footerDesc')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/doctors">{t('doctors')}</Link></li>
                <li><Link to="/packages">{t('packages')}</Link></li>
                <li><Link to="/careers">{t('careers')}</Link></li>
                <li><Link to="/contact">{t('contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('contactUs')}</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>Pura Brillantes corner La Purisima Street, Zamboanga City, Philippines, 7000</li>
                <li>(062) 991 0379</li>
                <li>+63 917 163 1740</li>
                <li>zpc144@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
            © 2026 Zamboanga Puericulture Center Org. No. 144. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
