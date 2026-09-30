import { createClient } from '@supabase/supabase-js';

const isValidHttpUrl = (str?: string): boolean => {
  if (!str || typeof str !== 'string' || !str.trim()) return false;
  try {
    const parsed = new URL(str.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = isValidHttpUrl(rawUrl) 
  ? rawUrl!.trim() 
  : 'https://nexaagent-platform.supabase.co';

const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = (rawKey && rawKey.trim().length > 10)
  ? rawKey.trim()
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leGFhZ2VudCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQwOTk1MjAwLCJleHAiOjE5NTY1NzEyMDB9.placeholder';

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const isSupabaseConfigured = () => {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    isValidHttpUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder-nexa-agent.supabase.co' &&
    (Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY))
  );
};

