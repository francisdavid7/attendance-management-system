import EmailVerificationTemplate from "@/components/emailVerificationTemplate";
import { transporter } from "./nodemailer";

// Verification email
export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string,
) {
  const verificationLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

  const emailTemplate = EmailVerificationTemplate(name, verificationLink);

  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: emailTemplate,
  });
}

// Tutor login details
export async function sendLoginDetails(
  name: string,
  email: string,
  password: string,
) {
  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Tutor Account Created Successfully",
    html: `
      <h2 style="margin-bottom: 20px">Hi, ${name}! Your tutor account has been successfully created.</h2>

      <p>
        Below are you login details:
      </p>

      <ul style="list-style: none">
        <li>email: ${email}</li>
        <li>password: ${password}</li>
      </ul>
    `,
  });
}
