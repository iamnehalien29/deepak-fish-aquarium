"use client";

import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const serviceTypes = [
  'Comprehensive Eye Test',
  'Contact Lens Consultation',
  'Prescription Glasses Fitting',
  'Frame Repair & Adjustment'
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: serviceTypes[0],
    date: '',
    timeSlot: timeSlots[0],
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Backend URL configured dynamically or defaults to localhost:5000
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || data.msg || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: serviceTypes[0],
        date: '',
        timeSlot: timeSlots[0],
        notes: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the booking server.');
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date formatted as YYYY-MM-DD to set min date attribute
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <section id="book" className="bg-slate-900 py-24 relative overflow-hidden border-t border-slate-800">
      {/* Light highlights */}
      <div className="absolute left-1/4 bottom-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-amber-500 font-bold uppercase tracking-wider text-sm">Scheduler</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">Book Your Vision Consultation</h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choose your preferred slot, service type, and enter your details to lock in a consultation with our visual specialist.
          </p>
        </div>

        {/* Glassmorphic Container */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          
          {success ? (
            <div className="text-center py-12 space-y-6 flex flex-col items-center">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-slate-100">Appointment Requested!</h4>
                <p className="text-slate-400 max-w-md mx-auto">
                  Thank you for choosing Manish Optics. We have received your booking and will contact you via email or phone shortly to confirm.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 bg-slate-900 text-slate-200 border border-slate-800 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 hover:text-white transition-all"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Callout */}
              {error && (
                <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <User className="h-3.5 w-3.5 text-amber-500" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <Mail className="h-3.5 w-3.5 text-amber-500" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <Phone className="h-3.5 w-3.5 text-amber-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm"
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                    <span>Service Needed</span>
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm appearance-none cursor-pointer"
                    >
                      {serviceTypes.map(service => (
                        <option key={service} value={service} className="bg-slate-950 text-slate-200">
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={getMinDate()}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm cursor-pointer"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    <span>Time Slot</span>
                  </label>
                  <div className="relative">
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm appearance-none cursor-pointer"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot} className="bg-slate-950 text-slate-200">
                          {slot}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  <span>Notes / Particular Symptoms (Optional)</span>
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Specify eye history, current glass power, or other details..."
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-slate-950 py-4 rounded-xl font-bold text-base hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.99] transition-all disabled:opacity-50 flex justify-center items-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Requesting Appointment...</span>
                  </>
                ) : (
                  <span>Request Booking Appointment</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
