import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Plus, Briefcase, Trash2 } from 'lucide-react';
import axios from 'axios';

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
    // 1. Check if file and skills are present
    if (!file || !requiredSkills) {
      alert("Please select a job and upload a resume.");
      return;
    }

    // 2. Extra safety check for file type
    if (file.type !== "application/pdf") {
      alert("Invalid file type. Only PDF resumes are accepted.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('requiredSkills', requiredSkills);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">AI Resume Analyzer</h1>
        <p className="text-gray-500 italic">Save job roles and analyze candidate fitment.</p>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        
        {/* --- MAIN ANALYZER --- */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {!results ? (
            <>
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 border-b pb-2">
                <Briefcase className="text-blue-600" /> Job & Skill Setup
              </h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-600 text-sm font-bold mb-1">Job Role Title:</label>
                  <input 
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-bold mb-1">Required Skills (Comma separated):</label>
                  <textarea 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none h-24"
                    placeholder="e.g. JavaScript, React, SQL, Project Management"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                  />
                  <button 
                    onClick={handleCreateJob}
                    className="mt-2 text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline active:scale-95 transition"
                  >
                    <Plus size={16}/> Save this Job to Library
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-blue-200 rounded-2xl p-10 flex flex-col items-center bg-blue-50/20">
                <Upload className="text-blue-400 mb-4" size={48} />
                <label className="cursor-pointer bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
                  Select Resume (PDF)
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
                {file && <p className="mt-4 text-green-600 font-bold">{file.name} selected</p>}
              </div>

              <button 
                onClick={handleUpload}
                disabled={loading}
                className="w-full mt-8 bg-blue-900 text-white py-4 rounded-2xl font-black text-xl hover:bg-blue-800 disabled:bg-gray-300 shadow-xl transition-all"
              >
                {loading ? "AI ANALYSIS IN PROGRESS..." : "ANALYZE NOW"}
              </button>
            </>
          ) : (
            /* --- RESULTS --- */
            <div className="animate-in fade-in zoom-in duration-300">
               <div className="flex justify-between items-center border-b pb-6 mb-8">
                 <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Analysis Report</h2>
                 <div className="bg-blue-600 text-white px-6 py-2 rounded-2xl text-3xl font-black shadow-lg">
                   {results.score}%
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
                   <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20}/> Skills Found</h3>
                   <div className="flex flex-wrap gap-2">
                     {results.matched.map((s, i) => <span key={i} className="bg-white text-green-700 px-3 py-1 rounded-lg text-xs font-black shadow-sm border border-green-100 uppercase">{s}</span>)}
                   </div>
                 </div>

                 <div className="bg-red-50 p-5 rounded-2xl border border-red-200">
                   <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2"><AlertCircle size={20}/> Missing Skills</h3>
                   <div className="flex flex-wrap gap-2">
                     {results.missing.map((s, i) => <span key={i} className="bg-white text-red-700 px-3 py-1 rounded-lg text-xs font-black shadow-sm border border-red-100 uppercase">{s}</span>)}
                   </div>
                 </div>
               </div>

               <button 
                 onClick={() => {setResults(null); setFile(null); setSelectedJobId(null); setRequiredSkills("");}}
                 className="w-full mt-10 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800"
               >
                 New Analysis
               </button>
            </div>
          )}
        </div>

        {/* --- SIDEBAR: JOB LIBRARY --- */}
        <div className="w-full md:w-80">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-8">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2 border-b pb-2">
              <Briefcase className="text-blue-600" size={20} /> Job Library
            </h2>
            
            {jobs.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10 italic">No saved jobs. Create one on the left!</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {jobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => selectJob(job)}
                    className={`p-4 rounded-xl border-2 cursor-pointer relative group transition-all ${selectedJobId === job.id ? 'border-blue-600 bg-blue-50' : 'border-slate-50 bg-slate-50 hover:border-blue-200'}`}
                  >
                    <h4 className="font-black text-slate-800 text-sm pr-6 leading-tight mb-1 uppercase">{job.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate font-bold">{job.skills}</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}
                      className="absolute top-4 right-3 text-slate-300 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="mt-16 text-gray-400 text-xs font-bold text-center">
        BCSIT 4th Semester Project • Pokhara University • 2024
      </footer>
    </div>
  );
}