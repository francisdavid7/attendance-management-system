import { Suspense } from "react";
import ResetPassword from "./reset-password";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default page;
