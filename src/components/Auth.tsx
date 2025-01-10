import { useState } from 'react';
import { KeyRound, Mail, User } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    formData,
    setFormData,
    loading,
    error,
    setError,
    handleSubmit
  } = useAuthForm({ 
    isSignUp,
    onSuccess: () => {}
  });

  return (
    <div className="h-screen bg-starry bg-no-repeat bg-cover">
      <div className="h-s flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className='text-zinc-300 text-3xl font-extrabold'>Welcome to my Portfolio Tracer</div>
          <div className='bg-starry2 bg-no-repeat bg-cover p-10 rounded-xl'> 
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-200">
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </h2>
              <p className="mt-2 text-center text-zinc-100 font-extrabold">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                  }}
                  className="font-extrabold text-green-300 hover:text-indigo-500" 
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                {isSignUp && (
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5"/>
                      </div>
                      <input
                        id="fullName"
                        type="text"
                        required={isSignUp}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 pl-10 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-indigo-500 sm:text-sm"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5"/>
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 pl-10 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 pl-10 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-slate-200 font-extrabold">
                      Remember me
                    </label>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}font-extrabold
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-extrabold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                >
                  {loading ? 'Processing...Please wait' : (isSignUp ? 'Sign up' : 'Sign in')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid place-content-center text-zinc-300 font-extrabold">Made with ❤️ by Sayan</div>
    </div>
  );
}