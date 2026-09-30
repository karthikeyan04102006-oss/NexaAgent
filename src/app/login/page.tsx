'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState<string>('alex.vance@enterprise-nexa.io');
  const [password, setPassword] = useState<string>('password123');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password.length < 6) {
      setErrorMsg('Invalid password. Password must be at least 6 characters.');
      return;
    }
    const res = await login(email, password);
    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Google OAuth is unconfigured in development mode.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#17151C] flex items-center justify-center p-6 md:p-12 relative">
      <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E7E3EC] p-8 md:p-10 space-y-6 shadow-editorial rounded-lg">
        <div className="text-center space-y-2 pb-2">
          <Link href="/" className="inline-block mb-2">
            <Logo size={36} showWordmark={true} variant="editorial" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#17151C]">
            Welcome back.
          </h1>
          <p className="text-xs text-[#696572]">Sign in to continue.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 rounded">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#17151C] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#96919F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-4 pl-10 py-2.5 text-xs text-[#17151C] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#17151C]">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#6D5BA6] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#96919F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-4 pl-10 py-2.5 text-xs text-[#17151C] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
            Sign In
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#E7E3EC] dark:border-[#23222B] w-full"></div>
          <span className="bg-[#FFFFFF] dark:bg-[#111116] px-3 text-[10px] text-[#96919F] dark:text-[#686375] font-mono uppercase tracking-widest absolute">OR</span>
        </div>

        {/* OFFICIAL GOOGLE BUTTON */}
        <Button
          onClick={handleGoogleSignIn}
          type="button"
          variant="google"
          size="md"
          className="w-full"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          }
        >
          Continue with Google
        </Button>

        <p className="text-center text-xs text-[#696572] dark:text-[#A7A3B2] pt-2">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#7C3AED] dark:text-[#C4B5FD] font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

