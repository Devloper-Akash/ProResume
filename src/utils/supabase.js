import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nkjlrbufyzyxadabcctw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ramxyYnVmeXp5eGFkYWJjY3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDE2MzMsImV4cCI6MjA5MjcxNzYzM30.hwwNgEApCh54Oh5sY1_Fw2zqrtqLNUuYU-ArzgK_xrU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
