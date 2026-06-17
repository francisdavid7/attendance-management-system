import EmailVerificationTemplate from "@/components/emailVerificationTemplate";
import { transporter } from "./nodemailer";
import { tutorLoginDetailsTemplate } from "@/components/emails/tutor-invitation";
import { verifyEmailTemplate } from "@/components/emails/verify-email";
import { passwordResetTemplate } from "@/components/emails/password-reset";

// Verification email
export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string,
) {
  const verificationLink = `https://attendx-flame.vercel.app/auth/confirm-email?token=${token}`;

  const emailTemplate = verifyEmailTemplate(name, verificationLink);

  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: emailTemplate,
  });
}

// Password reset meail
export async function sendResetPasswordEmail(
  name: string,
  token: string,
  email: string,
) {
  const resetPasswordLink = `https://attendx-flame.vercel.app/auth/reset-password?token=${token}`;

  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset Your AttendX Password",
    html: passwordResetTemplate(name, resetPasswordLink),
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
