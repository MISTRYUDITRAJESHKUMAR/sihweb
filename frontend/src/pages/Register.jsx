import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
    // specific fields
    college: '', branch: '', year: '',
    department: '', institution: '',
    company_name: '', domain: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful');
      window.location.href = '/dashboard'; // Force reload to dashboard
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21l9-5-9-5-9 5 9 5z"></path></svg>
            </div>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
          SyncSpace
        </h2>
        <h2 className="mt-2 text-xl font-medium text-gray-600">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 mb-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Select your role</h3>
              {['student', 'faculty', 'college', 'industry'].map((role) => (
                <button
                  key={role}
                  onClick={() => { setFormData({ ...formData, role }); setStep(2); }}
                  className="w-full p-4 text-left border rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors capitalize font-semibold text-gray-700"
                >
                  {role}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-sm text-indigo-600 font-medium mb-4 flex justify-between items-center">
                <span className="capitalize">{formData.role} Registration</span>
                <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 text-xs">Back</button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />

                {formData.role === 'student' && (
                  <>
                    <input name="college" placeholder="College Name" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <input name="branch" placeholder="Branch/Department" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </>
                )}
                {formData.role === 'faculty' && (
                  <>
                    <input name="institution" placeholder="Institution" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <input name="department" placeholder="Department" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </>
                )}
                {formData.role === 'college' && (
                  <input name="institution" placeholder="Institution Name" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                )}
                {formData.role === 'industry' && (
                  <>
                    <input name="company_name" placeholder="Company Name" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    <input name="domain" placeholder="Industry Domain" required onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                  </>
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
                {loading ? 'Creating account...' : 'Complete Registration'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
