import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, FileText, BarChart3, Calendar, Download, Filter, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function Analytics() {
  // Sample data - in real app, this would come from your backend/state management
  const [timeRange, setTimeRange] = useState('week');
  const [analysisData] = useState([
    { id: 1, candidate: 'John Doe', job: 'Senior Developer', score: 85, date: '2025-01-20', matched: 8, missing: 2 },
    { id: 2, candidate: 'Jane Smith', job: 'Frontend Engineer', score: 72, date: '2025-01-19', matched: 6, missing: 3 },
    { id: 3, candidate: 'Mike Johnson', job: 'Full Stack Dev', score: 91, date: '2025-01-19', matched: 9, missing: 1 },
    { id: 4, candidate: 'Sarah Williams', job: 'Senior Developer', score: 68, date: '2025-01-18', matched: 5, missing: 3 },
    { id: 5, candidate: 'Tom Brown', job: 'Backend Developer', score: 88, date: '2025-01-18', matched: 7, missing: 1 },
    { id: 6, candidate: 'Emily Davis', job: 'Frontend Engineer', score: 79, date: '2025-01-17', matched: 6, missing: 2 },
    { id: 7, candidate: 'Chris Wilson', job: 'Full Stack Dev', score: 95, date: '2025-01-17', matched: 10, missing: 0 },
    { id: 8, candidate: 'Lisa Anderson', job: 'Senior Developer', score: 64, date: '2025-01-16', matched: 5, missing: 4 },
  ]);

  const stats = {
    totalAnalyses: analysisData.length,
    avgScore: Math.round(analysisData.reduce((acc, curr) => acc + curr.score, 0) / analysisData.length),
    excellentMatches: analysisData.filter(d => d.score >= 80).length,
    recentAnalyses: analysisData.length
  };

  const scoreDistribution = [
    { range: '90-100%', count: analysisData.filter(d => d.score >= 90).length, color: 'bg-green-500' },
    { range: '80-89%', count: analysisData.filter(d => d.score >= 80 && d.score < 90).length, color: 'bg-green-400' },
    { range: '70-79%', count: analysisData.filter(d => d.score >= 70 && d.score < 80).length, color: 'bg-yellow-500' },
    { range: '60-69%', count: analysisData.filter(d => d.score >= 60 && d.score < 70).length, color: 'bg-orange-500' },
    { range: 'Below 60%', count: analysisData.filter(d => d.score < 60).length, color: 'bg-red-500' },
  ];

  const topJobs = [...new Set(analysisData.map(d => d.job))].map(job => ({
    title: job,
    count: analysisData.filter(d => d.job === job).length,
    avgScore: Math.round(analysisData.filter(d => d.job === job).reduce((acc, curr) => acc + curr.score, 0) / analysisData.filter(d => d.job === job).length)
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-slate-600">Track your resume analysis performance and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Analyses</p>
            <p className="text-3xl font-bold text-slate-900">{stats.totalAnalyses}</p>
            <p className="text-xs text-green-600 font-medium mt-2">+12% from last week</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Average Score</p>
            <p className="text-3xl font-bold text-slate-900">{stats.avgScore}%</p>
            <p className="text-xs text-green-600 font-medium mt-2">+5% improvement</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Excellent Matches</p>
            <p className="text-3xl font-bold text-slate-900">{stats.excellentMatches}</p>
            <p className="text-xs text-slate-500 font-medium mt-2">Score ≥ 80%</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="text-orange-600" size={24} />
              </div>
              <Clock className="text-slate-400" size={20} />
            </div>
            <p className="text-sm text-slate-500 mb-1">This Week</p>
            <p className="text-3xl font-bold text-slate-900">{stats.recentAnalyses}</p>
            <p className="text-xs text-slate-500 font-medium mt-2">Candidates analyzed</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Score Distribution */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Score Distribution</h2>
              <Filter className="text-slate-400" size={20} />
            </div>
            <div className="space-y-4">
              {scoreDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.range}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.count} candidates</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${(item.count / stats.totalAnalyses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Job Roles */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Top Job Roles</h2>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                      <p className="text-xs text-slate-500">{job.count} analyses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{job.avgScore}%</p>
                    <p className="text-xs text-slate-500">avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Analysis Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Analyses</h2>
            <p className="text-sm text-slate-500 mt-1">Detailed view of recent resume evaluations</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Job Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {analysisData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold">
                          {item.candidate.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{item.candidate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{item.job}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} />
                        {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          <CheckCircle size={12} />
                          {item.matched}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                          <AlertCircle size={12} />
                          {item.missing}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.score >= 80 ? 'bg-green-500' :
                              item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 w-12">{item.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        item.score >= 80 ? 'bg-green-100 text-green-700' :
                        item.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.score >= 80 ? 'Excellent' : item.score >= 60 ? 'Good' : 'Fair'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}