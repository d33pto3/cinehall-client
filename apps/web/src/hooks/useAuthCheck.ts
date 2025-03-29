// // src/hooks/useAuthCheck.ts
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getCookie } from 'cookies-next';
// import { useAuth } from '@/context/AuthContext';

// export function useAuthCheck(requireAuth = true) {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const token = getCookie('token');
//     const isLoggedIn = token || isAuthenticated;

//     if (requireAuth && !isLoggedIn) {
//       router.replace('/login');
//     } else if (!requireAuth && isLoggedIn) {
//       router.replace('/dashboard');
//     }
//   }, [requireAuth, router, isAuthenticated]);
// }
