'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AccountType } from '@/types';
import { Sparkles, ArrowRight, User, Mail, Lock, Building2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [accountType, setAccountType] = useState<AccountType>('personal');
  const [organizationName, setOrganizationName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    const res = await register(fullName, email, password, accountType, organizationName);
    if (res.success) {
      router.push('/verify-email');
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-lg relative z-10">
        <Card variant="glow" className="p-8 space-y-6 shadow-red-glow">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-gradient p-0.5 shadow-red-glow">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Nexa<span className="text-red-600">Agent</span>
              </span>
            </Link>
            <h2 className="text-xl font-bold pt-2">Create your NexaAgent account</h2>
            <p className="text-xs text-secondary-text">Join the autonomous AI agent platform</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Alex Vance"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex@enterprise-nexa.io"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Account Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('personal')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    accountType === 'personal'
                      ? 'bg-red-950 text-white border-red-600 shadow-red-glow font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-secondary-text'
                  }`}
                >
                  <User className="w-5 h-5 text-red-600 mb-1" />
                  <div className="text-xs font-bold">Personal Account</div>
                  <div className="text-[10px] text-secondary-text">Individual agent workspace</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('organization')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    accountType === 'organization'
                      ? 'bg-red-950 text-white border-red-600 shadow-red-glow font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-secondary-text'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-red-600 mb-1" />
                  <div className="text-xs font-bold">Organization / Admin</div>
                  <div className="text-[10px] text-secondary-text">Team governance & RBAC</div>
                </button>
              </div>
            </div>

            {/* Conditional Organization Field */}
            {accountType === 'organization' && (
              <div className="p-3.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                  Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={organizationName}
                  onChange={e => setOrganizationName(e.target.value)}
                  placeholder="Nexa Technologies Inc."
                  className="w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-red-600"
                />
                <div className="text-[11px] text-secondary-text flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span>You will be assigned the <strong>client_admin</strong> role.</span>
                </div>
              </div>
            )}

            <Button type="submit" isLoading={isLoading} className="w-full font-bold" icon={<ArrowRight className="w-4 h-4" />}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-secondary-text">
            Already registered?{' '}
            <Link href="/login" className="text-red-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
