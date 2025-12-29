const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        // Get skills from frontend
        const skillsRaw = req.body.requiredSkills || "";
        const skills = skillsRaw.split(',').map(s => s.trim()).filter(s => s !== "");

        // READ FILE
        const dataBuffer = fs.readFileSync(req.file.path);
        
        let resumeText = "";
        try {
            const data = await pdf(dataBuffer);
            resumeText = data.text;
        } catch (e) {
            console.log("PDF Parse failed, but we will continue...");
            resumeText = ""; // Fallback to empty string if PDF is unreadable
        }

        const matched = [];
        const missing = [];

        // Analysis
        skills.forEach(skill => {
            // Regex for smart matching
            const regex = new RegExp(`\\b${skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
            if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
                matched.push(skill);
            } else {
                missing.push(skill);
            }
        });

        const score = skills.length > 0 ? Math.round((matched.length / skills.length) * 100) : 0;

        res.json({ matched, missing, score, message: "Analysis Complete" });

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));