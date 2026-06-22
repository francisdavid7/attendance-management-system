import EmailVerificationTemplate from "@/components/emailVerificationTemplate";
import { transporter } from "./nodemailer";
import { tutorLoginDetailsTemplate } from "@/components/emails/tutor-invitation";
import { verifyEmailTemplate } from "@/components/emails/verify-email";
import { passwordResetTemplate } from "@/components/emails/password-reset";
import {
  LOGIN_LINK,
  RESET_PASSWORD_LINK,
  VERIFICATION_LINK,
} from "../services";

// Verification email
export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string,
) {
  const verificationLink = VERIFICATION_LINK(token);

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
  const resetPasswordLink = RESET_PASSWORD_LINK(token);

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
  const loginLink = LOGIN_LINK;
  return transporter.sendMail({
    from: `"AttendX" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your AttendX Tutor Account Has Been Created",
    html: tutorLoginDetailsTemplate({ name, email, password, loginLink }),
  });
}
