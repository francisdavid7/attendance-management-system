import { Suspense } from "react";
import ConfirmEmail from "./confirm-email";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmail />
    </Suspense>
  );
};

export default page;
