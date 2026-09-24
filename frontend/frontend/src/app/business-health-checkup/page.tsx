"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessHealthCheckup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_info: "",
    digital_presence: "",
    tech_stack: "",
    challenges: "",
    contact_email: "",
  });
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8000/health-checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMsg("Health Checkup Audit submitted successfully!");
        setStep(4);

        // Submit hone ke baad Home Page par auto-redirect
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMsg("Failed to submit. Please try again.");
      }
    } catch (err) {
      setStatusMsg("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-6 border-b border-slate-800 pb-4">
          <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
            Lead Generation
          </span>
          <h1 className="text-2xl font-bold mt-1 text-slate-100">
            Is Your Business Ready for Its Next Digital Growth Stage?
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Complete this short audit to evaluate your technology and marketing readiness.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-amber-400">
                Step 1: Business Overview
              </h2>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Tell us about your Business & Industry
                </label>
                <textarea
                  name="business_info"
                  value={formData.business_info}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="e.g. E-commerce retail platform selling organic goods..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="button"
                onClick={() => formData.business_info.trim() && setStep(2)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-black rounded-lg transition"
              >
                Next: Tech & Digital Presence →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-amber-400">
                Step 2: Technical & Growth Challenges
              </h2>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Current Tech Stack / Website
                </label>
                <input
                  type="text"
                  name="tech_stack"
                  value={formData.tech_stack}
                  onChange={handleChange}
                  placeholder="e.g. React, WordPress, Node.js"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400 mb-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Primary Growth Bottlenecks
                </label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g. High bounce rates, slow site performance, lack of leads..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 font-medium rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-black rounded-lg transition"
                >
                  Next: Contact Info →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-amber-400">
                Step 3: Receive Audit Results
              </h2>
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Business Email Address
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 font-medium rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-black rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Audit Request"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-bold text-emerald-400">{statusMsg}</h3>
              <p className="text-slate-400 text-sm">
                Redirecting you back to homepage...
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}