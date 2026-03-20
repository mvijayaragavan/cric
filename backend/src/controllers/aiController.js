const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use the API key from environment variable safely
const apiKey = process.env.GEMINI_API_KEY || process.env.GEN_AI_KEY;
const genAI = new GoogleGenerativeAI(apiKey || 'unconfigured');

exports.parseReport = async (req, res) => {
    try {
        if (!apiKey) {
            return res.status(500).json({ error: 'Generative AI API Key is not configured in backend.' });
        }

        const { text } = req.body;
        const file = req.file;

        if (!text && !file) {
            return res.status(400).json({ error: 'Please provide either report text or an image/document.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let promptContent = [
            `You are a cricket expert. Parse the provided unstructured match report, commentary, or handwritten scoresheet image into a highly structured JSON.
            Always output ONLY valid JSON without markdown wrapping. Match this schema roughly:
            {
              "matchDetails": { "team1": "...", "team2": "...", "toss": "..." },
              "battingScorecard": [ { "player": "...", "runs": 0, "balls": 0, "fours": 0, "sixes": 0, "dismissal": "..." } ],
              "bowlingFigures": [ { "player": "...", "overs": 0, "runs": 0, "wickets": 0 } ],
              "summary": "Brief 1 sentence descriptive summary"
            }
            Do NOT include markdown formatting wrappers like \`\`\`json.`
        ];

        if (text) {
            promptContent.push(`Report/Commentary Text:\n${text}`);
        }

        if (file) {
            promptContent.push({
                inlineData: {
                    data: file.buffer.toString("base64"),
                    mimeType: file.mimetype
                }
            });
        }

        const result = await model.generateContent(promptContent);
        const response = await result.response;
        let jsonText = response.text();

        // Clean markdown backticks if the model hallucinated them
        jsonText = jsonText.replace(/```json/gi, '').replace(/```/g, '').trim();

        const structuredData = JSON.parse(jsonText);
        res.status(200).json(structuredData);

    } catch (error) {
        console.error('AI Parsing Error:', error);
        res.status(500).json({ error: error.message || 'Failed to parse report with AI' });
    }
};
