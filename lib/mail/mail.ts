import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",

    to: email,

    subject: "Verify your email",

    html: `
      <h2>Verify Your Email</h2>

      <p>
        Click the link below to verify your account:
      </p>

      <a href="${verificationLink}">
        Verify Email
      </a>
    `,
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
