import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { email: string; token: string }) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Frontend validations
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isLoginTab && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Success!');
        
        // Save to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email: data.user.email }));

        // Notify parent after a short success-message delay
        setTimeout(() => {
          onAuthSuccess({ email: data.user.email, token: data.token });
          handleClose();
        }, 1200);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Connection failure. Check if the server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccessMsg(null);
    onClose();
  };

  const toggleTab = () => {
    setIsLoginTab(!isLoginTab);
    setError(null);
    setSuccessMsg(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl border border-gray-100 z-10"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-600 to-emerald-700" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-8 pt-10">
              {/* Header Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  {isLoginTab ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isLoginTab ? 'Sign in to access your account' : 'Join our green gardening community'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8 relative">
                <button
                  type="button"
                  onClick={() => !isLoginTab && toggleTab()}
                  className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all z-10 ${
                    isLoginTab ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => isLoginTab && toggleTab()}
                  className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all z-10 ${
                    !isLoginTab ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Status Notifications */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3.5 mb-6 text-sm text-red-700 bg-red-50 rounded-2xl border border-red-100"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3.5 mb-6 text-sm text-green-700 bg-green-50 rounded-2xl border border-green-100"
                >
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{successMsg}</span>
                </motion.div>
              )}

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.name@example.com"
                      required
                      disabled={submitting}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={submitting}
                      className="w-full pl-11 pr-12 py-3 rounded-2xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {!isLoginTab && (
                    <p className="text-xs text-gray-400 mt-1.5 ml-1">Must be at least 6 characters</p>
                  )}
                </div>

                {!isLoginTab && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        disabled={submitting}
                        className="w-full pl-11 pr-12 py-3 rounded-2xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3.5 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{isLoginTab ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
