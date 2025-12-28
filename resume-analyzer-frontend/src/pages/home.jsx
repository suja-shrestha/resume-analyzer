import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if a file is selected and if it is a PDF
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (file) {
      alert(`Preparing to analyze: ${file.name}. (Backend connection coming soon!)`);
      // This is where we will call our Node.js API later
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
          Upload your resume to see how well you match job requirements.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl border border-gray-100">
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-10 flex flex-col items-center justify-center bg-blue-50/30">
          <Upload className="text-blue-500 mb-4" size={48} />
          
          <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition mb-3 shadow-md">
            Select Resume (PDF)
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={handleFileChange} 
            />
          </label>
          
          <p className="text-sm text-gray-400">Supported format: PDF only</p>
        </div>

        {/* File Preview Section */}
        {file && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 text-green-700">
              <FileText size={24} />
              <div>
                <p className="font-bold text-sm truncate max-w-[250px]">{file.name}</p>
                <p className="text-xs">Ready for analysis</p>
              </div>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handleUpload}
          disabled={!file}
          className="w-full mt-8 bg-blue-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
        >
          Analyze Now
        </button>
      </div>

      {/* Footer / Academic Note */}
      <p className="mt-12 text-gray-400 text-sm italic">
        Developed for BCIST 4th Semester Project - Pokhara University
      </p>
    </div>
  );
}