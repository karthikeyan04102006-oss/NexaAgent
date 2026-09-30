'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#111111] flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DAD8D2] p-8 space-y-6 shadow-sm text-center relative z-10">
        <div className="w-16 h-16 bg-[#FAFAF7] border border-[#DAD8D2] text-[#830000] flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#830000]">VERIFICATION</div>
          <h1 className="text-2xl font-serif font-medium text-[#111111]">CHECK YOUR EMAIL</h1>
          <p className="text-xs text-[#555555] max-w-xs mx-auto">
            We sent a verification link to your registered email address. Click the link to complete account activation.
          </p>
        </div>

        <div className="p-4 bg-[#FAFAF7] border border-[#DAD8D2] text-xs text-[#555555] font-sans">
          Didn't receive the email? Check your spam folder or click below to resend.
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/onboarding" className="block">
            <Button className="w-full bg-[#111111] hover:bg-[#830000] text-white py-3 font-mono text-xs uppercase tracking-wider transition-colors" icon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Onboarding
            </Button>
          </Link>

          <Link href="/login" className="block">
            <Button variant="ghost" size="sm" className="w-full text-[#555555] font-mono text-xs">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

