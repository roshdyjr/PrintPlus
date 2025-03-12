"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/Modal";

export default function SessionErrorHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && pathname !== "/login") {
      // Show the modal instead of automatically redirecting
      setShowModal(true);
      signOut({ redirect: false }); // Prevent automatic redirect
    }
  }, [session, pathname]);

  const handleLoginRedirect = async () => {
    // Clear the invalid NextAuth token by signing out
    await signOut({ redirect: false }); // Prevent automatic redirect
    setShowModal(false); // Close the modal
    router.push("/login"); // Redirect to the login page
  };

  return (
    <>
      {children}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Session Expired</h2>
            <p className="mb-6">
              Your session has expired. Please log in again to continue.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
