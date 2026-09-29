import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AgentProvider } from '@/context/AgentContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NexaAgent — Autonomous AI Agent Platform for Everyday Tasks',
  description: 'NexaAgent transforms natural-language goals into autonomous workflows that plan, execute, verify, and complete tasks across your everyday apps.',
  keywords: ['Autonomous AI Agent', 'AI Command Center', 'Agent Orchestration', 'Gemini API', 'Enterprise SaaS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-black text-zinc-100 min-h-screen">
        <AuthProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
