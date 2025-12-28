import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Target } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState(""); // 1. Store input skills
  const [results, setResults] = useState(null); // 2. Store backend response
  const [loading, setLoading] = useState(false);

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
      alert("Please provide both a resume and required skills.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('requiredSkills', requiredSkills); // Send skills to backend

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setResults(response.data); // Save the analysis results
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
          AI Resume Analyzer & Skill Gap Detector
        </h1>
        <p className="text-gray-600 text-lg">
          {results ? "Your Analysis Report" : "Compare your resume against job requirements."}
        </p>
      </div>

      {!results ? (
        /* --- UPLOAD FORM --- */
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl border border-gray-100">
          
          {/* Skill Input Area */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Enter Required Skills:</label>
            <textarea 
              className="w-full p-3 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50/20"
              placeholder="e.g. React, Node.js, SQL, Python"
              rows="3"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
          </div>

          {/* PDF Upload Area */}
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-10 flex flex-col items-center justify-center bg-blue-50/30">
            <Upload className="text-blue-500 mb-4" size={48} />
            <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition mb-3 shadow-md">
              Select Resume (PDF)
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </label>
            {file && <p className="text-green-600 font-medium">Selected: {file.name}</p>}
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full mt-8 bg-blue-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-800 disabled:bg-gray-300 transition-all shadow-lg"
          >
            {loading ? "Analyzing..." : "Analyze Now"}
          </button>
        </div>
      ) : (
        /* --- RESULTS VIEW --- */
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
          
          {/* Score Header */}
          <div className="flex justify-between items-center border-b pb-6 mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Match Results</h2>
                <p className="text-sm text-gray-500">Based on your provided requirements</p>
            </div>
            <div className="bg-blue-100 text-blue-700 p-4 rounded-full w-20 h-20 flex flex-col items-center justify-center border-2 border-blue-200">
                <span className="text-2xl font-black">{results.score}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h3 className="flex items-center gap-2 text-green-700 font-bold mb-3">
                <CheckCircle size={18} /> Skills Found
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.matched.map((s, i) => (
                  <span key={i} className="bg-white text-green-700 px-3 py-1 rounded-md text-xs font-bold border border-green-200 shadow-sm">{s}</span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <h3 className="flex items-center gap-2 text-red-700 font-bold mb-3">
                <AlertCircle size={18} /> Skill Gap
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.missing.map((s, i) => (
                  <span key={i} className="bg-white text-red-700 px-3 py-1 rounded-md text-xs font-bold border border-red-200 shadow-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {setResults(null); setFile(null); setRequiredSkills("");}}
            className="w-full mt-8 bg-slate-100 text-slate-600 py-2 rounded-lg font-bold hover:bg-slate-200 transition"
          >
            Analyze Another Resume
          </button>
        </div>
      )}

      <p className="mt-12 text-gray-400 text-sm italic">
        Developed for BCIST 4th Semester Project - Pokhara University
      </p>
    </div>
  );
}