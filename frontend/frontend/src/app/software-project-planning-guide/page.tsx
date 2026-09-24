"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SoftwareProjectPlanningGuide() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8000/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMsg("Guide request submitted! Redirecting to Home...");
        setSubmitted(true);

        // Submit hone ke baad Home Page par auto-redirect
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMsg("Failed to submit request. Please try again.");
      }
    } catch (err) {
      setStatusMsg("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-6 border-b border-slate-800 pb-4 text-center">
          <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
            Free Resource
          </span>
          <h1 className="text-2xl font-bold mt-1 text-slate-100">
            Download Software Project Planning Guide
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Learn best practices for scoping, architecture, and technology selection.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-4xl">📄</div>
            <h3 className="text-xl font-bold text-emerald-400">{statusMsg}</h3>
            <p className="text-slate-400 text-sm">
              Taking you back to the home page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Acme Inc."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Business Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@acme.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {statusMsg && (
              <p className="text-rose-400 text-sm text-center">{statusMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-black rounded-lg transition disabled:opacity-50 mt-2"
            >
              {loading ? "Processing..." : "Get Free PDF Guide →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}