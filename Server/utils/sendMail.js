import nodemailer from 'nodemailer'

export const sendMail = async(options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "gmail", 
        auth: {
          user: "ayushraj10messi10@gmail.com",
          pass: "gqxybdpzimokoxgl",
        },
      });

      const {
        Name,
        Email,
        Phone,
        Date,
        Time,
        Guest,
        Request,
        Preferred,
        Occasion,
      } = options.data;

    const htmlBody = `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #1e1e2f; color: #f2f2f2; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto;">
    <h2 style="color: #e11d48; text-align: center;">Velvet Evening ✨</h2>
    <p style="font-size: 16px; text-align: center;">You've received a new <strong>table reservation</strong> request!</p>

    <hr style="border: none; border-top: 1px solid #444; margin: 20px 0;">

    <table style="width: 100%; font-size: 15px;">
      <tr>
        <td><strong>Name:</strong></td>
        <td>${Name}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${Email}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>${Phone}</td>
      </tr>
      <tr>
        <td><strong>Date:</strong></td>
        <td>${Date}</td>
      </tr>
      <tr>
        <td><strong>Time:</strong></td>
        <td>${Time}</td>
      </tr>
      <tr>
        <td><strong>Guests:</strong></td>
        <td>${Guest}</td>
      </tr>
      <tr>
        <td><strong>Preferred Seating:</strong></td>
        <td>${Preferred}</td>
      </tr>
      <tr>
        <td><strong>Occasion:</strong></td>
        <td>${Occasion}</td>
      </tr>
      <tr>
        <td><strong>Special Request:</strong></td>
        <td>${Request || "None"}</td>
      </tr>
    </table>

    <hr style="border: none; border-top: 1px solid #444; margin: 20px 0;">

    <p style="text-align: center; font-size: 14px; color: #aaa;">
      ✨ This reservation was made via the Velvet Evening website.
    </p>
  </div>
  `;

      
      // Wrap in an async IIFE so we can use await.
      const info = await transporter.sendMail({
        from: `"Velvet Evening" <ayushraj10messi10@gmail.com>`,
        to: "ayush.raj.93005@gmail.com",
        subject: "New Table Reservation Request 🌹",
        html: htmlBody,
      });

      console.log("Message sent:", info.messageId);
}