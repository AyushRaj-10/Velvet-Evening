import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendMail } from './utils/sendMail.js';

dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["POST"],
    credentials:true
}))

app.use('/reserve', async(req,res) => {
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
  

app.listen(8000, () => {
    try {
        console.log(`Connect to port ${process.env.PORT}`)
    } catch (error) {
        console.log("Error in port connection")
    }
})