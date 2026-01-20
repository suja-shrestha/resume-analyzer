import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Plus, Briefcase, Trash2, Sparkles, ArrowRight, TrendingUp, Info, X, Award, Clock, BarChart3 } from 'lucide-react';
import { DotLottiePlayer } from '@dotlottie/react-player';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const handleCreateJob = () => {
    if (!jobTitle || !requiredSkills) {
      alert("Please enter a Job Title and Required Skills first.");
      return;
    }
    const newJob = {
      id: Date.now(),
      title: jobTitle,
      skills: requiredSkills,
      createdAt: new Date().toLocaleDateString()
    };
    setJobs([...jobs, newJob]);
    setJobTitle("");
    setRequiredSkills("");
  };

  const selectJob = (job) => {
    setSelectedJobId(job.id);
    setRequiredSkills(job.skills);
    setJobTitle(job.title);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    if (selectedJobId === id) {
      setSelectedJobId(null);
      setRequiredSkills("");
      setJobTitle("");
    }
  };

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
        // Add to history
        setAnalysisHistory([
          {
            id: Date.now(),
            fileName: file.name,
            jobTitle: jobTitle,
            score: data.score,
            date: new Date().toLocaleString()
          },
          ...analysisHistory
        ].slice(0, 5)); // Keep last 5
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
            <p className="text-sm text-slate-500 mb-1">Analyzed Today</p>
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
              {analysisHistory.length > 0 
                ? Math.round(analysisHistory.reduce((acc, curr) => acc + curr.score, 0) / analysisHistory.length) + '%'
                : '-'}
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
            {/* Analysis Tool */}
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

                  {/* Upload Section */}
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

                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${jobTitle && requiredSkills ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <span className={jobTitle && requiredSkills ? 'text-green-700 font-medium' : 'text-slate-500'}>
                      Job configured
                    </span>
                    <div className="flex-1 h-px bg-slate-200" />
                    <div className={`w-2 h-2 rounded-full ${file ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <span className={file ? 'text-green-700 font-medium' : 'text-slate-500'}>
                      Resume uploaded
                    </span>
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={loading || !file || !requiredSkills}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing Resume...
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
                /* Results Section */
                <div className="p-8">
                  <div className="flex items-start justify-between pb-6 mb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 ${
                          results.score >= 80 ? 'bg-green-100' :
                          results.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                        } rounded-lg flex items-center justify-center`}>
                          <CheckCircle className={`${
                            results.score >= 80 ? 'text-green-600' :
                            results.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`} size={18} />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900">Analysis Complete</h2>
                      </div>
                      <p className="text-sm text-slate-500">Resume evaluation results</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="text-blue-600" size={18} />
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Match Score</span>
                      </div>
                      <div className={`text-5xl font-bold ${
                        results.score >= 80 ? 'text-green-600' :
                        results.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {results.score}%
                      </div>
                      <span className={`text-sm font-medium mt-1 ${
                        results.score >= 80 ? 'text-green-700' :
                        results.score >= 60 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {getScoreLabel(results.score)}
                      </span>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="mb-6 bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Skills Coverage</span>
                      <span className="text-sm text-slate-600">
                        {results.matched.length} of {results.matched.length + results.missing.length} skills
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          results.score >= 80 ? 'bg-green-600' :
                          results.score >= 60 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${results.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={20} />
                          <h3 className="font-semibold text-green-900">Matched Skills</h3>
                        </div>
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                          {results.matched.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {results.matched.length > 0 ? (
                          results.matched.map((s, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-green-200 text-green-700 rounded-lg text-sm font-medium shadow-sm">
                              {s}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-green-600">No matched skills found</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="text-red-600" size={20} />
                          <h3 className="font-semibold text-red-900">Missing Skills</h3>
                        </div>
                        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
                          {results.missing.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {results.missing.length > 0 ? (
                          results.missing.map((s, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium shadow-sm">
                              {s}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-green-600 font-medium">🎉 All skills matched!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setResults(null); setFile(null); }}
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              )}
            </div>

            {/* Recent Analysis History */}
            {analysisHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Analyses</h3>
                <div className="space-y-3">
                  {analysisHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <FileText className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.fileName}</p>
                          <p className="text-xs text-slate-500">{item.jobTitle} • {item.date}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        item.score >= 80 ? 'bg-green-100 text-green-700' :
                        item.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Job Library Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    <h2 className="text-lg font-semibold text-slate-900">Job Library</h2>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-semibold text-blue-900">{jobs.length}</span>
                    <span className="text-xs text-blue-600">saved</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">Quick access to saved configurations</p>
              </div>

              <div className="p-4">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="text-slate-400" size={28} />
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">No saved jobs yet</p>
                    <p className="text-xs text-slate-400">Create and save job profiles for quick analysis</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => selectJob(job)}
                        className={`p-4 rounded-lg border cursor-pointer relative group transition-all ${
                          selectedJobId === job.id
                            ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="pr-8">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-900 text-sm">
                              {job.title}
                            </h4>
                            {selectedJobId === job.id && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-2">{job.skills}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock size={12} />
                            {job.createdAt}
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}
                          className="absolute top-4 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                        {selectedJobId === job.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}