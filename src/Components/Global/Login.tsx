import React from "react"
import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '../../Utils/LoadingButton';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

interface CleanAuthFormProps {
  onClose?: () => void
}

const CleanAuthForm = ({ onClose }: CleanAuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loading, setLoading] = useState(false);
  const { login } = useAuth() as any;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsLogin(!isLogin)
      setFormData({ fullName: "", email: "", password: "" })
      setIsTransitioning(false)
    }, 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const endpoint = isLogin ? '/users/login' : '/users/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.fullName, email: formData.email, password: formData.password };
      const baseURL = 'https://notes-app-server-un2c.onrender.com';
      const res = await axios.post(baseURL + endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const data = res.data;
      if (isLogin) {
        login(data.user, data.token);
        setSuccess('Welcome back! You have successfully logged in.');
      } else {
        setSuccess('Account created successfully! You can now log in.');
      }
      setLoading(false);
      setTimeout(() => {
        setSuccess(null);
        onClose?.();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Network error');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Main Form Container */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with sliding indicator */}
        <div className="relative p-8 pb-0">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
              <div className="h-8 w-8 bg-white rounded-lg text-blue-600 flex items-center justify-center font-bold text-lg">
                N
              </div>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="relative bg-white bg-opacity-10 rounded-2xl p-1 backdrop-blur-sm">
            <div
              className={`absolute top-1 bottom-1 bg-white rounded-xl transition-all duration-500 ease-in-out ${
                isLogin ? "left-1 right-1/2" : "left-1/2 right-1"
              }`}
            ></div>
            <div className="relative flex">
              <button
                onClick={() => !isTransitioning && isLogin === false && handleToggle()}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin ? "text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => !isTransitioning && isLogin === true && handleToggle()}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin ? "text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div
            className={`transition-all duration-300 ${
              isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-400 bg-white/10 rounded-lg px-4 py-2 text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-400 bg-white/10 rounded-lg px-4 py-2 text-center font-semibold">
                  {success}
                </div>
              )}
              {/* Full Name Field (Sign Up Only) */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isLogin ? "max-h-0 opacity-0 overflow-hidden" : "max-h-20 opacity-100"
                }`}
              >
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 z-10">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    required={!isLogin}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 z-10">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 z-10">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-200 z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password Link (Login Only) */}
              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-white/70 hover:text-white text-sm transition-all duration-200">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <LoadingButton
                loading={loading}
                type="submit"
                loadingPosition="center"
                loadingIndicator={<CircularProgress color="inherit" size={24} sx={{ color: '#fff' }} />}
                sx={{
                  background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  py: '14px',
                  borderRadius: '9999px',
                  boxShadow: 4,
                  textTransform: 'none',
                  letterSpacing: '0.03em',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)',
                    boxShadow: 8,
                  },
                }}
              >
                {isLogin ? "Sign In to Dashboard" : "Create My Account"}
              </LoadingButton>
            </form>
          </div>

          {/* Alternative Action */}
          <div className="mt-8 text-center">
            <p className="text-white/70 mb-4">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button
              onClick={handleToggle}
              disabled={isTransitioning}
              className="text-white font-semibold hover:text-blue-200 transition-all duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-200 disabled:opacity-50"
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleanAuthForm
