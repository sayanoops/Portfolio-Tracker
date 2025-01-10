import { useState } from 'react';
import { SignUpData, authService } from '../services/authService';
import { validation } from '../utils/validation';

interface UseAuthFormProps {
  isSignUp: boolean;
  onSuccess?: () => void;
}

export function useAuthForm({ isSignUp, onSuccess }: UseAuthFormProps) {
  const [formData, setFormData] = useState<SignUpData & { rememberMe: boolean }>({
    email: '',
    password: '',
    fullName: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): { valid: boolean; message?: string } => {
    const emailValidation = validation.email(formData.email);
    if (!emailValidation.valid) {
      return emailValidation;
    }

    const passwordValidation = validation.password(formData.password);
    if (!passwordValidation.valid) {
      return passwordValidation;
    }

    if (isSignUp && !formData.fullName.trim()) {
      return { valid: false, message: 'Full name is required' };
    }

    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateForm();
    if (!validation.valid) {
      setError(validation.message || 'Invalid form data');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = isSignUp 
        ? await authService.signUp(formData)
        : await authService.signIn(formData);

      if (authError) {
        setError(authService.getErrorMessage(authError));
      } else {
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }
        onSuccess?.();
      }
    } catch (err) {
      setError(`An unexpected error occurred:${err}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    setError,
    handleSubmit
  };
}