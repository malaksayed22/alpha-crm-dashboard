import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { translate } from '../../utils/translations';
import logo from '../../assets/images/logo.jpg';

const LoginPage = ({ onLogin }) => {
  const { settings } = useSettings();
  const t = (key) => translate(key, settings.language);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('Email is required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('Invalid email format');
    }

    if (!formData.password) {
      newErrors.password = t('Password is required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('Password must be at least 6 characters');
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = t('First name is required');
      }
      if (!formData.lastName) {
        newErrors.lastName = t('Last name is required');
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('Please confirm your password');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('Passwords do not match');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Login logic
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = existingUsers.find(u => u.email === formData.email);

        if (!user) {
          setErrors({ email: t('No account found with this email') });
          setLoading(false);
          return;
        }

        if (user.password !== formData.password) {
          setErrors({ password: t('Incorrect password') });
          setLoading(false);
          return;
        }

        // Login successful
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        // Register logic
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (existingUsers.find(u => u.email === formData.email)) {
          setErrors({ email: t('This email is already registered') });
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now(),
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: '',
          bio: '',
          avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
          jobTitle: 'User'
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        onLogin(newUser);
      }
      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4 relative overflow-hidden">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-slate-200">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center py-6 px-6 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="mb-3 flex justify-center relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div style={{width: '200px', height: '140px'}} className="rounded-3xl bg-white p-5 shadow-2xl ring-4 ring-white/60 relative z-10 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Alpha Logo" 
                  style={{width: '100%', height: '100%', objectFit: 'contain'}}
                />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1 relative z-10 drop-shadow-lg">{t('Alpha Dashboard')}</h2>
          <h1 className="text-lg font-semibold mb-1 relative z-10">
            {isLogin ? t('Welcome Back!') : t('Create Account')}
          </h1>
          <p className="text-xs text-white/90 relative z-10">
            {isLogin 
              ? t('Sign in to access your dashboard') 
              : t('Sign up to get started with your dashboard')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">{t('First Name')}</label>
                <input
                  type="text"
                  name="firstName"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('Enter your first name')}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">{t('Last Name')}</label>
                <input
                  type="text"
                  name="lastName"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
                  }`}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('Enter your last name')}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">{t('Email Address')}</label>
            <input
              type="email"
              name="email"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
              }`}
              value={formData.email}
              onChange={handleChange}
              placeholder={t('Enter your email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">{t('Password')}</label>
            <input
              type="password"
              name="password"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
              }`}
              value={formData.password}
              onChange={handleChange}
              placeholder={t('Enter your password')}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="block text-xs font-medium text-slate-700 mb-1">{t('Confirm Password')}</label>
              <input
                type="password"
                name="confirmPassword"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('Confirm your password')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                {isLogin ? t('Signing in...') : t('Creating account...')}
              </span>
            ) : (
              isLogin ? t('Sign In') : t('Sign Up')
            )}
          </button>

          <button 
            type="button" 
            className="w-full py-2.5 px-4 text-sm bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            onClick={() => {
              const guestUser = {
                email: 'guest@example.com',
                firstName: 'Guest',
                lastName: 'User',
                profilePicture: null
              };
              localStorage.setItem('currentUser', JSON.stringify(guestUser));
              localStorage.setItem('isGuest', 'true');
              onLogin(guestUser);
            }}
          >
            <i className="fa-solid fa-user"></i>
            {t('Continue as Guest')}
          </button>
        </form>

        <div className="text-center py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            {isLogin ? t("Don't have an account? ") : t("Already have an account? ")}
            <button 
              type="button" 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all"
              onClick={toggleMode}
            >
              {isLogin ? t('Sign Up') : t('Sign In')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
