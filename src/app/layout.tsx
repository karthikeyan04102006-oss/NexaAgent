import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { AgentProvider } from '@/context/AgentContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NexaAgent — Autonomous AI Agent Platform',
  description: 'NexaAgent transforms natural-language goals into autonomous workflows that plan, execute, verify, and complete tasks across your connected tools.',
  keywords: ['Autonomous AI Agent', 'AI SaaS Platform', 'Agent Orchestration', 'Gemini API', 'Enterprise SaaS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <AgentProvider>
              {children}
            </AgentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
