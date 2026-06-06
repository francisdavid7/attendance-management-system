import EmailVerificationTemplate from "@/components/emailVerificationTemplate";
import { transporter } from "./nodemailer";
import { tutorLoginDetailsTemplate } from "@/components/utorLoginDetailsTemplate";

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
  const loginLink = "http://localhost:3000/auth/login";
  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your AttendX Tutor Account Has Been Created",
    html: tutorLoginDetailsTemplate({ name, email, password, loginLink }),
  });
}
