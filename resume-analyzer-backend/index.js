const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. CONFIGURATION ---
const SUPABASE_URL = 'https://nfskrwbwsbvepvvxwyok.supabase.co';
const SUPABASE_KEY = 'sb_secret_eHi_QDjCPL0Ep9VJG-Ze8w_8I9_OlmA'; 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const genAI = new GoogleGenerativeAI("AIzaSyAT6PP2fTaTmO8JSqDzjFseV_5ZUxMnETo"); 

const upload = multer({ storage: multer.memoryStorage() });

// --- 2. JOB LIBRARY ROUTES ---

// GET: Fetch all saved jobs (Fixes dashboard 404)
app.get('/api/jobs', async (req, res) => {
  try {
    const { data, error } = await supabase.from('jobs').select('*').order('id', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, skills } = req.body;
    const { data, error } = await supabase.from('jobs').insert([{ title, skills }]).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. RESUME UPLOAD & ANALYSIS ---

app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // PDF Parse Safety Check for Node v22
    let pdfData;
    const parseFunction = typeof pdf === 'function' ? pdf : pdf.default;
    pdfData = await parseFunction(req.file.buffer);
    const resumeText = pdfData.text;

    // AI Analysis
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `Analyze resume for ${req.body.jobTitle}. Requirements: ${req.body.requiredSkills}. Text: ${resumeText}. Return JSON only: { "matched": [], "missing": [], "score": 0 }`;

    const result = await model.generateContent(prompt);
    const analysis = JSON.parse(result.response.text());

    // Supabase Upload
    const fileName = `${Date.now()}-${req.file.originalname}`;
    await supabase.storage.from('resumes').upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
    const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(fileName);

    // Save Analysis to DB
    const { error: dbError } = await supabase.from('resume_analysis').insert([{
      job_title: req.body.jobTitle || "Unknown",
      score: analysis.score,
      matched_skills: analysis.matched,
      missing_skills: analysis.missing,
      resume_url: urlData.publicUrl
    }]);

    if (dbError) throw dbError;

    res.json({ ...analysis, resume_url: urlData.publicUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// --- 4. ANALYTICS ROUTE ---

// GET: Fetch all analyses (Fixes dashboard 404)
app.get('/api/all-analyses', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('resume_analysis')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send("Resume AI Server Running"));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));