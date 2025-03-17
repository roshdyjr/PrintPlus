"use client";
import { useEffect } from "react";
import ProdectSidebar from "./ProdectSidebar";

interface ContainerProdectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContainerProdectSidebar({
  isOpen,
  onClose,
}: ContainerProdectSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ProdectSidebar onClose={onClose} />
      </div>
    </>
  );
}
