import { Resend } from "resend";
import EmailVerificationTemplate from "@/components/emailVerificationTemplate";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  token: string,
  name: string,
) {
  const verificationLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

  const emailTemplate = EmailVerificationTemplate(name, verificationLink);

  await resend.emails.send({
    from: "onboarding@resend.dev",

    to: email,

    subject: "Verify your email",

    html: emailTemplate,
  });
}

export async function sendLoginDetails(
  name: string,
  email: string,
  password: string,
) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Tutor Account Login Details!",

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
