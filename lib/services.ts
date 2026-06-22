export const VERIFICATION_LINK = (token: string) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:3001/auth/confirm-email?token=${token}`
    : `
https://attendx-flame.vercel.app/auth/confirm-email?token=${token}`;

export const RESET_PASSWORD_LINK = (token: string) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:3001/auth/reset-password?token=${token}`
    : `
https://attendx-flame.vercel.app/auth/reset-password?token=${token}`;

export const LOGIN_LINK =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/auth/login"
    : "https://attendx-flame.vercel.app/auth/login";
