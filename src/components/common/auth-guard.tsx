import type { PropsWithChildren } from 'react';
// import { useLocation } from 'react-router';
import { Spinner } from '@/components/ui/spinner';
import { useAuthContext } from '@/hooks/use-auth-context';

export function AuthGuard({ children }: PropsWithChildren) {
  const { isLoading } = useAuthContext();
  // const location = useLocation();

  // Agar ma'lumotlar yuklanayotgan bo'lsa, loading ko'rsatish
  if (isLoading) {
    return <Spinner show size="medium" className="flex min-h-screen items-center justify-center" />;
  }

  // // Agar foydalanuvchi autentifikatsiya qilinmagan bo'lsa, login sahifasiga yo'naltirish
  // // va joriy sahifa manzilini saqlash, keyinroq qaytib yo'naltirish uchun
  // if (!isLoggedIn) {
  //   return <Navigate to="/auth/login" state={{ from: { pathname: location.pathname } }} replace />;
  // }

  // Agar foydalanuvchi autentifikatsiya qilingan bo'lsa, children komponentlarni render qilish
  // Bu foydalanuvchiga himoyalangan route'larga kirish imkonini beradi
  // qayta yo'naltirilmasdan
  return <>{children}</>;
}
