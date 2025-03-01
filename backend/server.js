require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://api.forefront.ai/v1/chat/completions";
const API_KEY = process.env.FOREFRONT_API_KEY; // Store API key in .env

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "mistralai/Mistral-7B-v0.1",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 64,
                temperature: 0.5,
            }),
        };

        const response = await fetch(API_URL, options);
        const data = await response.json();
        
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
