'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#111111] flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DAD8D2] p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2 border-b border-[#DAD8D2] pb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest text-[#830000] uppercase">RECOVERY</span>
            <span className="text-xl font-serif font-medium text-[#111111]">NexaAgent</span>
          </Link>
          <h1 className="text-2xl font-serif font-medium text-[#111111]">RESET YOUR PASSWORD</h1>
          <p className="text-xs text-[#555555]">Enter your account email to receive a password reset link.</p>
        </div>

        {submitted ? (
          <div className="p-5 bg-[#FAFAF7] border border-[#DAD8D2] text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#830000] mx-auto" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#111111]">Reset Link Dispatched</h3>
            <p className="text-xs text-[#555555]">We have sent a password reset link to <strong className="font-mono text-[#111111]">{email}</strong>.</p>
            <div className="pt-2">
              <Link href="/login">
                <Button size="sm" variant="outline" className="border-[#DAD8D2] text-[#111111]">Return to Sign In</Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#555555] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#FAFAF7] border border-[#DAD8D2] focus:border-[#111111] px-4 pl-10 py-3 text-sm text-[#111111] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#111111] hover:bg-[#830000] text-white py-3 font-mono text-xs uppercase tracking-wider transition-colors">
              Send Reset Instructions
            </Button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#111111] font-mono">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

