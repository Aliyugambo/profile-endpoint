import express from "express";
import axios, { HttpStatusCode } from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// ✅ GET /me endpoint
app.get("/me", async (req, res) => {
  try {
    // Fetch cat fact
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000, // 5s timeout
    });

    const catFact = response.data.fact;

    // Build JSON response
    const result = {
      status: { code: 200, message: "success" },
      user: {
        email: process.env.EMAIL,
        name: process.env.NAME,
        stack: process.env.STACK,
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    res.status(500).json({
      status: "error",
      message:
        "Failed to fetch cat fact. Please try again later.",
    });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
