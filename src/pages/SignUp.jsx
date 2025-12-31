import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 via-pink-500 to-rose-500 animate-gradient relative overflow-hidden py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="backdrop-blur-2xl bg-white/90 p-8 rounded-3xl w-96 shadow-2xl border border-white/30 animate-scale-in relative z-10">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-block p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl mb-4 shadow-2xl shadow-purple-500/30 animate-scale-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-medium">Join CareConnect today</p>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <input 
            name="name"
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            name="email"
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm"
            placeholder="Email / Phone"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            name="password"
            type="password" 
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input 
            name="confirmPassword"
            type="password" 
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Link 
            to="/connect" 
            className="block w-full text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Sign Up
          </Link>
        </div>

        <p className="text-center mt-6 text-sm text-slate-600 animate-fade-in-up font-medium" style={{ animationDelay: '0.4s' }}>
          Already have an account?{' '}
          <Link 
            to="/" 
            className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-bold hover:from-indigo-700 hover:to-pink-700 transition-all duration-300 underline-offset-2 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
