const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse'); // Ensure this is installed: npm install pdf-parse

const app = express();
app.use(cors());
app.use(express.json());

// Using Memory Storage so we don't clutter the server with physical files
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit: 5MB
});

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        // 1. Basic Validation
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const requiredSkillsRaw = req.body.requiredSkills || "";
        if (!requiredSkillsRaw.trim()) {
            return res.status(400).json({ error: 'No required skills provided.' });
        }

        // 2. Prepare Skills Array
        const requiredSkillsArray = requiredSkillsRaw
            .split(',')
            .map(s => s.trim())
            .filter(s => s !== "");

        // 3. Extract Text from PDF
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text; // Original text for better matching

        const matched = [];
        const missing = [];

        // 4. Smart Matching Logic (Using Regex for word boundaries)
        requiredSkillsArray.forEach(skill => {
            // This Regex ensures "Java" matches "Java" but NOT "JavaScript"
            // \b is a word boundary in Regex
            const escapedSkill = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special chars
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'gi'); 

            if (regex.test(resumeText)) {
                matched.push(skill);
            } else {
                missing.push(skill);
            }
        });

        // 5. Calculate Match Percentage
        const total = requiredSkillsArray.length;
        const score = total > 0 ? Math.round((matched.length / total) * 100) : 0;

        // 6. Send Response
        console.log(`Processed: ${req.file.originalname} | Score: ${score}%`);
        res.json({
            matched,
            missing,
            score,
            filename: req.file.originalname,
            message: "Analysis Complete"
        });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Analysis failed during PDF parsing." });
    }
});

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send("Resume Analyzer Backend is Running smoothly!");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});