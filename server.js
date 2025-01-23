import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Initialize OpenAI SDK
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure API key is set in .env
});

// API route to handle chat requests
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            stream: true,  // Enable streaming responses
        });

        for await (const chunk of completion) {
            res.write(JSON.stringify(chunk.choices[0]?.delta?.content || '') + '\n');
        }
        res.end();
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).send({ error: "Error processing request" });
    }
});
// Simple GET endpoint to check if the server is running
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
