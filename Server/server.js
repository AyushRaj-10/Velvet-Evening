import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendMail } from './utils/sendMail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/reserve', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'GET is supported. Please use POST to submit a reservation.',
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://velvet-evening.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// POST /reserve
app.post('/reserve', async (req, res) => {
  const {
    Name,
    Email,
    Phone,
    Date,
    Time,
    Guest,
    Request,
    Preferred,
    Occasion
  } = req.body;

  if (!Name || !Email || !Phone || !Date || !Time || !Guest) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    await sendMail({
      data: {
        Name,
        Email,
        Phone,
        Date,
        Time,
        Guest,
        Request,
        Preferred,
        Occasion,
      }
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Send mail error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
