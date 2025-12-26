import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router';
import logo from '@/assets/logo.png';
import {
  CustomCard,
  CustomCardDescription,
  CustomCardTitle,
} from '@/components/common/custom-card.tsx';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { ModeToggle } from '@/components/common/mode-toggle';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { isAuthenticated } from '@/lib/auth';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // Agar foydalanuvchi allaqachon login qilgan bo'lsa, dashboard ga yo'naltirish
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token && isAuthenticated()) {
        navigate('/dashboard', { replace: true });
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Agar hali tekshirilayotgan bo'lsa, hech narsa ko'rsatmaslik
  if (isChecking) {
    return null;
  }

  return (
    <>
      {/* Theme & Language Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="fixed top-4 right-4 z-50 flex gap-2"
      >
        <LanguageSwitcher />
        <ModeToggle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.2, 0.9, 0.25, 1], // smooth cubic-bezier
        }}
        className="w-full"
      >
        <CustomCard className="border border-(--border)/50 bg-(--card-bg)/80 shadow-2xl backdrop-blur-xl md:max-w-md">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
            className="mb-4 inline-flex h-20 w-20 items-center justify-center"
          >
            <img src={logo} alt={t('app.name')} className="h-full w-full object-contain" />
          </motion.div>
          <div className="text-center font-semibold text-base text-gray-900 sm:text-lg dark:text-gray-100">
            {t('auth.login.welcomeBack')}
          </div>
        </div>
        <CustomCardTitle className="mb-2 text-center font-semibold text-(--label)">
          {t('auth.login.subtitle')}
        </CustomCardTitle>
        <LoginForm />
        <CustomCardDescription>
          <div className="mt-2 border-(--border)/30 border-t pt-4 text-center text-sm">
            <span className="text-(--secondaryLabel)">{t('auth.info.dontHaveAccount')} </span>
            <NavLink
              to="/register"
              className="font-medium text-(--system-blue) transition-colors duration-200 hover:text-(--system-blue)/80"
            >
              {t('auth.actions.register')}
            </NavLink>
          </div>
        </CustomCardDescription>
      </CustomCard>
    </motion.div>
    </>
  );
};

export default Login;
