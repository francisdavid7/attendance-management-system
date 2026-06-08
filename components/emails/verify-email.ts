import { baseTemplate } from "./layouts/base-template";

export const verifyEmailTemplate = (name: string, link: string) =>
  baseTemplate({
    name,
    title: "Verify Your Email Address",
    description:
      "Welcome to AttendX — we're excited to have you onboard. To securely activate your account, verify your email address using the button below.",
    actionText: "Verify Email",
    actionLink: link,
    notice: "🔒 This verification link expires in 1 hour.",
  });
