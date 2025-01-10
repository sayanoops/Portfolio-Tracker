import {AuthError} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  fullName: string;
}

export const authService = {
  async signIn({ email, password }: AuthCredentials): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (err) {
      return { error: err as AuthError };
    }
  },

  async signUp({ email, password, fullName }: SignUpData): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      return { error };
    } catch (err) {
      return { error: err as AuthError };
    }
  },

  getErrorMessage(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password. Please try again.';
      case 'Email not confirmed':
        return 'Please verify your email address before signing in.';
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long.';
      default:
        return error.message;
    }
  }
};