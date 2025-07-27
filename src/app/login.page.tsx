// app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { loginWithGoogle, onUserChanged } from '../firebaseAuth';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onUserChanged((user: User| null) => {
      if (user) {
        router.push('/trip/sample-trip-2025');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-8">驗證中...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">登入旅遊規劃工具</h1>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
        >
          使用 Google 帳號登入
        </button>
      </div>
    </div>
  );
}