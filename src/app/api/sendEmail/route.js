import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { first_name, last_name, email, password } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_APP_EMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
    });

    const subject = "Account Created/Updated";
    const text = `Hello ${first_name} ${last_name}`;
    const html = `
      <p>${text}</p>
      Here are your Updated Credentials for BCS-CMS.<br/>
      Email: ${email} <br/>
      Password: ${password}
    `;

    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_APP_EMAIL,
      to: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
