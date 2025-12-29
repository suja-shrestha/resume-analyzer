import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Plus, Briefcase, Trash2, Sparkles } from 'lucide-react';
import { DotLottiePlayer } from '@dotlottie/react-player';
export default function Home() {
  const [file, setFile] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- JOB LIBRARY STATES ---
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Function to create and save a job
  const handleCreateJob = () => {
    if (!jobTitle || !requiredSkills) {
      alert("Please enter a Job Title and Required Skills first.");
      return;
    }
    const newJob = {
      id: Date.now(),
      title: jobTitle,
      skills: requiredSkills
    };
    setJobs([...jobs, newJob]);
    setJobTitle("");
    setRequiredSkills("");
  };

  // Function to select a job from the library
  const selectJob = (job) => {
    setSelectedJobId(job.id);
    setRequiredSkills(job.skills);
  };

  // Function to delete a job
  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    if (selectedJobId === id) {
      setSelectedJobId(null);
      setRequiredSkills("");
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

      // CHECK IF RESPONSE IS OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server Error");
      }

      const data = await response.json();
      
      // ENSURE DATA IS VALID BEFORE SETTING
      if (data && typeof data.score !== 'undefined') {
        setResults(data); 
      } else {
        throw new Error("Invalid response format from server.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
      setResults(null); // Reset results to prevent white screen
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-600" size={40} />
          AI Resume Analyzer
        </h1>
        <p className="text-gray-600 text-lg font-medium">Save job roles and analyze candidate fitment with AI precision.</p>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">

        {/* --- MAIN ANALYZER --- */}
        <div className="flex-1 bg-white p-10 rounded-3xl shadow-2xl border border-purple-100">
          {!results ? (
            <>
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3 border-b-2 border-purple-100 pb-4">
                <Briefcase className="text-purple-600" size={28} /> Job & Skill Setup
              </h2>

              <div className="space-y-6 mb-10">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                    Job Role Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-purple-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Required Skills (Comma separated)</label>
                  <textarea
                    className="w-full p-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none h-32 transition-all"
                    placeholder="e.g. JavaScript, React, SQL, Project Management"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                  />
                  <button
                    onClick={handleCreateJob}
                    className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all shadow-lg"
                  >
                    <Plus size={18} /> Save to Job Library
                  </button>
                </div>
              </div>

              <div className="border-3 border-dashed border-purple-300 rounded-3xl p-12 flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50">
                {/* The Moving AI Scan Icon - Updated Tag */}
                <div className="w-48 h-48 -mt-4">
                  <DotLottiePlayer
                    src="/Scanning.json"
                    loop
                    autoplay
                  />
                </div>

                <label className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl">
                  Select Resume (PDF)
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
                {file && (
                  <div className="mt-6 bg-green-50 border-2 border-green-300 text-green-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                    <CheckCircle size={20} />
                    {file.name}
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full mt-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 disabled:bg-gray-300 disabled:hover:scale-100 shadow-xl transition-all"
              >
                {loading ? "🤖 AI ANALYSIS IN PROGRESS..." : "✨ ANALYZE NOW"}
              </button>
            </>
          ) : (
            /* --- RESULTS --- */
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="flex justify-between items-center border-b-2 border-purple-100 pb-6 mb-8">
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ANALYSIS REPORT</h2>
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-3xl text-4xl font-black shadow-2xl">
                  {results.score}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border-2 border-green-300 shadow-lg">
                  <h3 className="text-green-800 font-bold mb-5 flex items-center gap-2 text-lg">
                    <CheckCircle size={24} /> Skills Found
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {results.matched.map((s, i) => (
                      <span key={i} className="bg-white text-green-700 px-4 py-2 rounded-xl text-sm font-bold shadow-md border-2 border-green-200 uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-3xl border-2 border-red-300 shadow-lg">
                  <h3 className="text-red-800 font-bold mb-5 flex items-center gap-2 text-lg">
                    <AlertCircle size={24} /> Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {results.missing.map((s, i) => (
                      <span key={i} className="bg-white text-red-700 px-4 py-2 rounded-xl text-sm font-bold shadow-md border-2 border-red-200 uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setResults(null); setFile(null); setSelectedJobId(null); setRequiredSkills(""); }}
                className="w-full mt-12 bg-gradient-to-r from-slate-700 to-slate-900 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                New Analysis
              </button>
            </div>
          )}
        </div>

        {/* --- SIDEBAR: JOB LIBRARY --- */}
        <div className="w-full md:w-96">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-purple-100 sticky top-8">
            <h2 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-3 border-b-2 border-purple-100 pb-4">
              <Briefcase className="text-purple-600" size={24} /> Job Library
            </h2>

            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-400 text-sm italic">No saved jobs yet.<br />Create one to get started!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => selectJob(job)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer relative group transition-all ${selectedJobId === job.id
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:shadow-md'
                      }`}
                  >
                    <h4 className="font-black text-gray-800 text-sm pr-8 leading-tight mb-2 uppercase">
                      {job.title}
                    </h4>
                    <p className="text-xs text-gray-600 truncate font-semibold">{job.skills}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}
                      className="absolute top-5 right-4 text-gray-300 hover:text-red-500 hover:scale-110 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="mt-20 text-gray-500 text-sm font-semibold text-center bg-white p-8 rounded-3xl shadow-2xl border border-purple-100 w-full max-w-6xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
          BCSIT 5th Semester Project • Pokhara University • 2025
        </div>
      </footer>
    </div>
  );
}