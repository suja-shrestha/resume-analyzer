import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Plus, Briefcase, Trash2, Sparkles, ArrowRight, TrendingUp, Info, X, Award, Clock, BarChart3 } from 'lucide-react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import confetti from 'canvas-confetti';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // --- 1. FETCH DATA FROM CLOUD ON START ---
  useEffect(() => {
    fetchJobs();
    fetchHistory();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load jobs");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/all-analyses');
      const data = await res.json();
      setAnalysisHistory(Array.isArray(data) ? data.slice(0, 5) : []); // Keep last 5 for dashboard
    } catch (err) {
      console.error("Failed to load history");
    }
  };

  // --- 2. JOB MANAGEMENT (Supabase linked) ---
  const handleCreateJob = async () => {
    if (!jobTitle || !requiredSkills) {
      alert("Please enter a Job Title and Required Skills first.");
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: jobTitle, skills: requiredSkills })
      });
      const newJob = await res.json();
      
      setJobs([newJob, ...jobs]);
      setJobTitle("");
      setRequiredSkills("");
    } catch (err) {
      alert("Failed to save job to cloud.");
    }
  };

  const selectJob = (job) => {
    setSelectedJobId(job.id);
    setRequiredSkills(job.skills);
    setJobTitle(job.title);
  };

  const deleteJob = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter(j => j.id !== id));
      if (selectedJobId === id) {
        setSelectedJobId(null);
        setRequiredSkills("");
        setJobTitle("");
      }
    } catch (err) {
      alert("Failed to delete job.");
    }
  };

  // --- 3. ANALYZER LOGIC (Gemini linked) ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !requiredSkills) {
      alert("Please select a job and upload a resume.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobTitle', jobTitle);
    formData.append('requiredSkills', requiredSkills);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server Error");
      }

      const data = await response.json();
      
      if (data && typeof data.score !== 'undefined') {
        setResults(data);
        
        // Success Celebration
        if (data.score >= 70) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }

        fetchHistory(); // Refresh recent analyses list
      } else {
        throw new Error("Invalid response format from server.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Needs Improvement';
  };

  // Calculate real average match score from data
  const avgScore = analysisHistory.length > 0 
    ? Math.round(analysisHistory.reduce((acc, curr) => acc + curr.score, 0) / analysisHistory.length) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Resume Analysis Dashboard</h1>
          <p className="text-slate-600">Analyze candidate resumes and track your hiring process</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-blue-600" size={20} />
              </div>
              <ArrowRight className="text-slate-400" size={16} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Saved Jobs</p>
            <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-purple-600" size={20} />
              </div>
              <ArrowRight className="text-slate-400" size={16} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Logs</p>
            <p className="text-2xl font-bold text-slate-900">{analysisHistory.length}</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={20} />
              </div>
              <ArrowRight className="text-slate-400" size={16} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Avg Match Score</p>
            <p className="text-2xl font-bold text-slate-900">
              {analysisHistory.length > 0 ? avgScore + '%' : '-'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="text-orange-600" size={20} />
              </div>
              <ArrowRight className="text-slate-400" size={16} />
            </div>
            <p className="text-sm text-slate-500 mb-1">Status</p>
            <p className="text-lg font-semibold text-slate-900">{file ? 'Ready' : 'Upload Resume'}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Analyzer Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              {!results ? (
                <div className="p-8">
                  <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">New Analysis</h2>
                      <p className="text-sm text-slate-500">Configure job and upload resume</p>
                    </div>
                  </div>

                  <div className="space-y-5 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                        placeholder="e.g., Senior Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Required Skills <span className="text-red-500">*</span>
                        <span className="text-xs text-slate-500 ml-2">(comma-separated)</span>
                      </label>
                      <textarea
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-900"
                        placeholder="JavaScript, React, Node.js, PostgreSQL, Docker"
                        rows="3"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-slate-500">
                          {requiredSkills ? requiredSkills.split(',').filter(s => s.trim()).length : 0} skills defined
                        </p>
                        <button
                          onClick={handleCreateJob}
                          disabled={!jobTitle || !requiredSkills}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus size={16} />
                          Save to Library
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 hover:border-blue-400 transition-all">
                    <div className="p-8 text-center">
                      <div className="w-48 h-48 -mt-4 mx-auto">
                        <DotLottiePlayer
                          src="/Scanning.json"
                          loop
                          autoplay
                        />
                      </div>

                      <label className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                        <Upload size={18} />
                        Choose Resume (PDF)
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                      </label>
                      
                      <p className="text-xs text-slate-500 mt-3">Maximum file size: 10MB</p>

                      {file && (
                        <div className="mt-5 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg text-sm font-medium">
                          <CheckCircle size={18} />
                          <span className="font-semibold">{file.name}</span>
                          <button 
                            onClick={(e) => { e.preventDefault(); setFile(null); }}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={loading || !file || !requiredSkills}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        AI Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Analyze Resume
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-start justify-between pb-6 mb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 ${results.score >= 80 ? 'bg-green-100' : results.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                          <CheckCircle className={`${results.score >= 80 ? 'text-green-600' : results.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`} size={18} />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900">Analysis Complete</h2>
                      </div>
                      <p className="text-sm text-slate-500">Evaluation for {jobTitle}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="text-blue-600" size={18} />
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Match Score</span>
                      </div>
                      <div className={`text-5xl font-bold ${results.score >= 80 ? 'text-green-600' : results.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.score}%
                      </div>
                      <span className={`text-sm font-medium mt-1 ${results.score >= 80 ? 'text-green-700' : results.score >= 60 ? 'text-yellow-700' : 'text-red-700'}`}>
                        {getScoreLabel(results.score)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Skills Coverage</span>
                      <span className="text-sm text-slate-600">{results.matched.length} matched</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-500 ${results.score >= 80 ? 'bg-green-600' : results.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`} style={{ width: `${results.score}%` }} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2 underline">Matched Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.matched.map((s, i) => <span key={i} className="px-2 py-1 bg-white border border-green-200 text-green-700 rounded text-xs font-bold shadow-sm">{s}</span>)}
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                      <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2 underline">Skill Gaps</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.missing.map((s, i) => <span key={i} className="px-2 py-1 bg-white border border-red-200 text-red-700 rounded text-xs font-bold shadow-sm">{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <button onClick={() => { setResults(null); setFile(null); }} className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">Analyze Another Resume</button>
                </div>
              )}
            </div>

            {/* Recent History */}
            {analysisHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Analyses (Cloud)</h3>
                <div className="space-y-3">
                  {analysisHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <FileText className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.job_title}</p>
                          <p className="text-[10px] text-slate-500">{new Date(item.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-sm font-bold ${item.score >= 80 ? 'bg-green-100 text-green-700' : item.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {item.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Job Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Briefcase className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-slate-900">Job Library</h2>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">{jobs.length}</span>
              </div>

              <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
                {jobs.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-10 italic">No saved jobs.</p>
                ) : (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => selectJob(job)}
                      className={`p-4 rounded-lg border cursor-pointer relative group transition-all ${selectedJobId === job.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <div className="pr-8">
                        <h4 className="font-medium text-slate-900 text-sm mb-1">{job.title}</h4>
                        <p className="text-[10px] text-slate-500 truncate uppercase font-bold">{job.skills}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }} className="absolute top-4 right-3 text-slate-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}