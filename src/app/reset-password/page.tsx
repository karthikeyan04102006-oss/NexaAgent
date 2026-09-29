'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-red-500" />
            <span className="text-xl font-extrabold text-white">NexaAgent</span>
          </Link>
          <h2 className="text-lg font-bold text-white pt-2">Set New Password</h2>
          <p className="text-xs text-zinc-400">Enter your new secure account password below.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-300 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Password Updated</h3>
            <p className="text-xs text-zinc-300">Your password has been reset successfully. Redirecting to Sign In...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">Reset Password</Button>
          </form>
        )}

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
