const express = require("express");

const app = express();
const PORT = 3000;

const API_KEY = "2bc5c64f417f46f38b6c88594cd6b6a8";

// Serve frontend
app.use(express.static("public"));

app.get("/api/news", async (req, res) => {
    const country = req.query.country || "in";

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok") {
            return res.status(400).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
