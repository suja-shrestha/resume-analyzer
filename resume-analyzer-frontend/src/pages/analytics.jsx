import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Award, FileText, BarChart3, 
  Calendar, Download, CheckCircle, 
  AlertCircle, Eye 
} from 'lucide-react';

export default function Analytics() {
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch live data from your Node.js + Supabase backend
  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/all-analyses');
        if (!response.ok) throw new Error("Connection failed");
        const data = await response.json();
        setAnalysisData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not connect to the database.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, []);

  // 2. Statistics Calculations
  const totalCount = analysisData.length;
  
  const avgScore = totalCount > 0 
    ? Math.round(analysisData.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / totalCount) 
    : 0;

  const excellentMatches = analysisData.filter(d => (Number(d.score) || 0) >= 80).length;

  const scoreDistribution = [
    { range: '90-100%', count: analysisData.filter(d => d.score >= 90).length },
    { range: '80-89%', count: analysisData.filter(d => d.score >= 80 && d.score < 90).length },
    { range: '70-79%', count: analysisData.filter(d => d.score >= 70 && d.score < 80).length },
    { range: '60-69%', count: analysisData.filter(d => d.score >= 60 && d.score < 70).length },
    { range: 'Below 60%', count: analysisData.filter(d => d.score < 60).length },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-bold uppercase text-xs tracking-widest">Syncing Cloud Data...</p>
      </div>
    </div>
  );

  if (error) return <div className="p-20 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Analytics Dashboard</h1>
            <p className="text-slate-500 font-medium italic text-sm">Real-time skill gap reports powered by Supabase Storage</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Download size={16} /> Export Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-blue-600" size={20} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase">Total Analyses</p>
            <p className="text-3xl font-black text-slate-900">{totalCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-purple-600" size={20} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase">Average Match</p>
            <p className="text-3xl font-black text-slate-900">{avgScore}%</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="text-green-600" size={20} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase">Excellent Fits</p>
            <p className="text-3xl font-black text-slate-900">{excellentMatches}</p>
          </div>
        </div>

        {/* Distribution & Table */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Distribution chart */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-6 text-slate-800 uppercase tracking-wide">Score Distribution</h2>
            <div className="space-y-5">
              {scoreDistribution.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black mb-1 uppercase text-slate-400">
                    <span>{item.range}</span>
                    <span>{item.count} Candidates</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${(item.count / (totalCount || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Recent Analysis Logs</h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Live</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
                    <th className="px-6 py-4 tracking-tighter">Job Role</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {analysisData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{item.job_title}</td>
                      <td className="px-6 py-4 text-[11px] font-bold text-slate-400">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-black text-sm ${item.score >= 80 ? 'text-green-600' : 'text-blue-600'}`}>
                          {item.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex gap-1">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-[9px] font-bold border border-green-100">
                              {item.matched_skills?.length || 0} MATCHED
                            </span>
                            <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-[9px] font-bold border border-red-100">
                              {item.missing_skills?.length || 0} GAP
                            </span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.resume_url ? (
                          <a 
                            href={item.resume_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-blue-600 transition-all shadow-md active:scale-95"
                          >
                            <Eye size={12} /> View PDF
                          </a>
                        ) : (
                          <span className="text-slate-300 text-[10px] italic">No File</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {analysisData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-10 text-center text-slate-400 italic text-sm tracking-wide">
                        No analysis history found in cloud storage.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}