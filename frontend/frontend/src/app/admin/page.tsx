"use client";

import React, { useEffect, useState } from "react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirement?: string;
  message: string;
  created_at?: string;
}

interface HealthCheckup {
  id: number;
  contact_email: string;
  business_info: string;
  digital_presence?: string;
  tech_stack?: string;
  challenges?: string;
  created_at?: string;
}

interface LeadMagnet {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"enquiries" | "health" | "lead">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [healthCheckups, setHealthCheckups] = useState<HealthCheckup[]>([]);
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resEnq, resHealth, resLead] = await Promise.all([
        fetch(`${API_BASE}/admin/enquiries`),
        fetch(`${API_BASE}/admin/health-checkups`),
        fetch(`${API_BASE}/admin/lead-magnets`),
      ]);

      if (resEnq.ok) setEnquiries(await resEnq.json());
      if (resHealth.ok) setHealthCheckups(await resHealth.json());
      if (resLead.ok) setLeadMagnets(await resLead.json());
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-amber-400">Riyadvi Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Lead Management & Submissions Overview</p>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition"
          >
            Refresh Data
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "enquiries" ? "bg-amber-500 text-black font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Contact Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("health")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "health" ? "bg-amber-500 text-black font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Health Checkups ({healthCheckups.length})
          </button>
          <button
            onClick={() => setActiveTab("lead")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "lead" ? "bg-amber-500 text-black font-bold" : "bg-slate-900 text-slate-300"
            }`}
          >
            Lead Magnets ({leadMagnets.length})
          </button>
        </div>

        {/* Data Table View */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading database records...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50">
            {activeTab === "enquiries" && (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-200 uppercase text-xs">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {enquiries.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center">No enquiries found</td></tr>
                  ) : (
                    enquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="p-3">{item.id}</td>
                        <td className="p-3 font-medium text-white">{item.name}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3 max-w-xs truncate">{item.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "health" && (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-200 uppercase text-xs">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Business Info</th>
                    <th className="p-3">Challenges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {healthCheckups.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center">No health checkup leads found</td></tr>
                  ) : (
                    healthCheckups.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="p-3">{item.id}</td>
                        <td className="p-3 text-amber-400">{item.contact_email}</td>
                        <td className="p-3">{item.business_info}</td>
                        <td className="p-3">{item.challenges || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "lead" && (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-200 uppercase text-xs">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leadMagnets.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center">No lead magnet requests found</td></tr>
                  ) : (
                    leadMagnets.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="p-3">{item.id}</td>
                        <td className="p-3 font-medium text-white">{item.name}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3">{item.company || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}