const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// ... existing imports (express, cors, multer, pdf-parse)

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');

        // 1. Get required skills from the frontend request body
        // We expect a string like "React, Node, SQL"
        const requiredSkillsRaw = req.body.requiredSkills || "";
        const requiredSkillsArray = requiredSkillsRaw
            .split(',')
            .map(s => s.trim())
            .filter(s => s !== "");

        // 2. Extract Text from PDF
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text.toLowerCase();

        // 3. Dynamic Comparison (Match vs Gap)
        const matched = [];
        const missing = [];

        requiredSkillsArray.forEach(skill => {
            if (resumeText.includes(skill.toLowerCase())) {
                matched.push(skill);
            } else {
                missing.push(skill);
            }
        });

        // 4. Calculate Match Percentage
        const total = requiredSkillsArray.length;
        const score = total > 0 ? Math.round((matched.length / total) * 100) : 0;

        res.json({
            matched,
            missing,
            score,
            message: "Analysis Complete"
        });

    } catch (error) {
        res.status(500).json({ error: "Analysis failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));