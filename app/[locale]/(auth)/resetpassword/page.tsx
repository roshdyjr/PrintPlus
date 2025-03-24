import { Suspense } from "react";
import ResetPasswordPage from "@/components/AuthComponents/ResetPasswordPage";
import Loading from "@/components/SharedComponents/Loading";

export const metadata = {
  title: "Print Plus - Reset Password",
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
