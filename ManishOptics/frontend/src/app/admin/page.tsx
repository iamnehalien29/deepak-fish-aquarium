"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Glasses, Calendar, Clock, Phone, Mail, Check, X, Trash2, ArrowLeft, RefreshCw, Eye } from 'lucide-react';

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      setRefreshing(true);
      const response = await fetch(`${apiUrl}/api/appointments`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
      setError('');
    } catch (err: any) {
      setError('Could not connect to the backend server. Make sure the backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiUrl}/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update state locally
      setAppointments(prev =>
        prev.map(app => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update appointment status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiUrl}/api/appointments/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Update state locally
      setAppointments(prev => prev.filter(app => app._id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete appointment.');
    }
  };

  // Helper stats
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Server dates are stored in UTC
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-1.5 text-slate-400 hover:text-amber-500 transition-colors text-sm font-semibold">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </Link>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-2 text-amber-500">
              <Glasses className="h-6 w-6" />
              <span className="font-extrabold tracking-wider text-slate-100 text-base">
                MANISH<span className="text-amber-500 font-medium">OPTICS</span> <span className="text-slate-500 text-xs font-bold uppercase ml-2 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800">Admin</span>
              </span>
            </div>
          </div>

          <button
            onClick={fetchAppointments}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/30 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh List'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Appointment Management</h1>
            <p className="text-slate-400 text-sm mt-1">Review, approve, and manage customer bookings for Manish Optics.</p>
          </div>
        </div>

        {/* Status Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Requests</span>
            <p className="text-3xl font-extrabold text-slate-100 mt-2">{total}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Confirmation</span>
            <p className="text-3xl font-extrabold text-amber-400 mt-2">{pending}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmed Slots</span>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">{confirmed}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cancelled / Declined</span>
            <p className="text-3xl font-extrabold text-rose-500 mt-2">{cancelled}</p>
          </div>
        </div>

        {/* Appointments Table / Content */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-24 text-center space-y-4">
              <svg className="animate-spin h-8 w-8 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-slate-400 text-sm font-semibold">Loading appointments data...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center px-6 max-w-md mx-auto space-y-4">
              <div className="h-12 w-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
                <X className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-200">Server Connection Error</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
              <button
                onClick={fetchAppointments}
                className="bg-amber-500 text-slate-950 px-5 py-2 rounded-full font-bold text-xs hover:bg-amber-400 transition-all active:scale-95 cursor-pointer"
              >
                Try Reconnecting
              </button>
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-200 text-lg">No appointments found</h3>
              <p className="text-slate-400 text-sm">New bookings will display here once customers complete the scheduler.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-4.5 px-6">Client Info</th>
                    <th className="py-4.5 px-6">Service Requested</th>
                    <th className="py-4.5 px-6">Date & Slot</th>
                    <th className="py-4.5 px-6">Status</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {appointments.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-900/20 transition-colors group"
                    >
                      {/* Name & Contact */}
                      <td className="py-5 px-6 space-y-1 max-w-[200px]">
                        <h4 className="font-bold text-slate-200">{app.name}</h4>
                        <div className="flex flex-col space-y-0.5 text-xs text-slate-400 font-medium">
                          <span className="flex items-center space-x-1"><Phone className="h-3 w-3 shrink-0 text-amber-500/70" /> <span>{app.phone}</span></span>
                          <span className="flex items-center space-x-1"><Mail className="h-3 w-3 shrink-0 text-amber-500/70" /> <span className="truncate">{app.email}</span></span>
                        </div>
                      </td>

                      {/* Service type & Notes */}
                      <td className="py-5 px-6 space-y-1.5 max-w-[240px]">
                        <span className="inline-block text-[11px] font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full">
                          {app.serviceType}
                        </span>
                        {app.notes && (
                          <div className="text-xs text-slate-400 bg-slate-950/40 p-2 border border-slate-900 rounded-lg max-h-16 overflow-y-auto font-medium">
                            <span className="font-bold text-[10px] text-slate-500 uppercase block mb-0.5">Notes:</span>
                            {app.notes}
                          </div>
                        )}
                      </td>

                      {/* Date & Time Slot */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 font-medium">
                          <span className="flex items-center space-x-1.5 text-slate-200">
                            <Calendar className="h-3.5 w-3.5 text-amber-500" />
                            <span>{formatDate(app.date)}</span>
                          </span>
                          <span className="flex items-center space-x-1.5 text-slate-400 text-xs">
                            <Clock className="h-3.5 w-3.5 text-amber-500/70" />
                            <span>{app.timeSlot}</span>
                          </span>
                        </div>
                      </td>

                      {/* Status Badges */}
                      <td className="py-5 px-6">
                        {app.status === 'pending' && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
                            Pending
                          </span>
                        )}
                        {app.status === 'confirmed' && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
                            Confirmed
                          </span>
                        )}
                        {app.status === 'cancelled' && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mr-1.5"></span>
                            Cancelled
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {app.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(app._id, 'confirmed')}
                              title="Confirm Appointment"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-colors cursor-pointer"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          {app.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusUpdate(app._id, 'cancelled')}
                              title="Cancel Appointment"
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 transition-colors cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(app._id)}
                            title="Delete Record"
                            className="p-1.5 rounded-lg bg-slate-950 text-slate-500 border border-slate-800 hover:border-red-500/40 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
