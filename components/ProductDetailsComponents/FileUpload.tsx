"use client";
import { useState, useEffect } from "react";
import { Upload, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import pdf_1 from "/public/pdf_1.png";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

type FileObject = {
  name: string;
  size: string;
  type: string;
  status: "success" | "error";
};

interface FileUploadProps {
  designGuideLineFileId: number | null;
  designGuidelines: Array<{
    seq: number;
    text: string;
  }>;
}

export default function FileUpload({
  designGuideLineFileId,
  designGuidelines = [],
}: FileUploadProps) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [guidelineFileUrl, setGuidelineFileUrl] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("ProductDetails");

  // Fetch design guideline file if available
  useEffect(() => {
    const fetchGuidelineFile = async () => {
      if (!designGuideLineFileId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/get-file?id=${designGuideLineFileId}`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US", // Adjust as needed
            },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          setGuidelineFileUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error fetching guideline file:", error);
      }
    };

    fetchGuidelineFile();

    return () => {
      if (guidelineFileUrl) URL.revokeObjectURL(guidelineFileUrl);
    };
  }, [designGuideLineFileId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    // Get supported types from designGuidelines if available
    const supportedTypes =
      designGuidelines.length > 0
        ? extractFileTypes(designGuidelines[0].text)
        : ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

    const updatedFiles: FileObject[] = Array.from(uploadedFiles).map(
      (file) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + " MB",
        type: file.type,
        status: supportedTypes.includes(file.type) ? "success" : "error",
      })
    );

    setFiles([...files, ...updatedFiles]);
  };

  // Helper to extract file types from guidelines text
  const extractFileTypes = (text: string): string[] => {
    const matches = text.match(/Supported file types: (.*)/i);
    if (!matches) return [];

    return matches[1]
      .split(",")
      .map((ext) => ext.trim().toLowerCase())
      .map((ext) => {
        switch (ext) {
          case "doc":
            return "application/msword";
          case "jpeg":
          case "jpg":
            return "image/jpeg";
          case "png":
            return "image/png";
          case "ai":
            return "application/postscript";
          case "psd":
            return "image/vnd.adobe.photoshop";
          case "ppt":
            return "application/vnd.ms-powerpoint";
          default:
            return "";
        }
      })
      .filter(Boolean);
  };

  return (
    <div className="max-w-lg flex flex-col gap-3">
      {/* Download Template Section */}
      {guidelineFileUrl && (
        <a
          href={guidelineFileUrl}
          download="design-guidelines"
          className="flex items-center gap-2 text-blue-600 cursor-pointer"
        >
          <FaDownload className="text-[#FFB11F]" />
          <span className="underline text-[14px] font-medium text-[#0F172A]">
            Download business card design templates
          </span>
        </a>
      )}

      {/* File Upload Section */}
      <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg">
        <label className="cursor-pointer">
          <Upload className="mx-auto mb-2 text-gray-500" />
          {t("fileUploader")} <span className="text-[#6366F1]">{t("upload")}</span>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept={
              designGuidelines.length > 0
                ? ".doc,.jpeg,.jpg,.png,.ai,.psd,.ppt"
                : ".pdf,.jpg,.jpeg,.png"
            }
          />
        </label>
      </div>

      {/* Dynamic Design Guidelines */}
      {designGuidelines.length > 0 ? (
        designGuidelines.map((guideline, index) => (
          <p key={index} className="text-xs text-gray-500">
            • {guideline.text}
          </p>
        ))
      ) : (
        <>
          <p className="text-xs text-gray-500">
            • Supported file types: DOC, JPG, PNG, AI, PSD, PPT.
          </p>
          <p className="text-xs text-gray-500">
            • Required resolution: 300 dots per inch.
          </p>
        </>
      )}

      {/* Uploaded Files List */}
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              file.status === "error"
                ? "bg-red-100"
                : "border-2 border-[#6C849D2E]"
            }`}
          >
            <div className="flex items-center gap-3">
              {file.type === "application/pdf" ? (
                <Image src={pdf_1} alt="PDF Icon" width={24} height={24} />
              ) : (
                <FileText className="w-6 h-6 text-gray-500" />
              )}
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[#191919] text-[14px] font-medium">
                    {file.name}
                  </span>
                  {file.status === "success" && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">{file.size}</div>
              </div>
            </div>

            {file.status === "error" && (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs text-red-500">Invalid file type</span>
              </div>
            )}

            <button
              onClick={() => setFiles(files.filter((_, i) => i !== index))}
            >
              <RiDeleteBin6Line className="text-[#40566D] w-5 h-5 hover:text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
