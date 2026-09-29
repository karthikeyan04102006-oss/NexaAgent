'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-red-glow text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-800/80 text-red-400 flex items-center justify-center mx-auto shadow-red-glow">
          <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Check Your Email</h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            We sent a verification link to your registered email address. Click the link to complete account activation.
          </p>
        </div>

        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300">
          Didn't receive the email? Check your spam folder or click below to resend.
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/onboarding" className="block">
            <Button className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Onboarding
            </Button>
          </Link>

          <Link href="/login" className="block">
            <Button variant="ghost" size="sm" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
