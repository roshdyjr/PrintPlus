"use client";
import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import pdf_1 from "/public/pdf_1.png";
import Image from "next/image";

// Define the type for the file object
type FileObject = {
  name: string;
  size: string;
  type: string;
  status: "success" | "error";
};

export default function FileUpload() {
  // State to manage uploaded files
  const [files, setFiles] = useState<FileObject[]>([]);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const supportedTypes = ["application/pdf", "image/jpeg", "image/jpg"];

    // Map uploaded files to the FileObject type
    const updatedFiles: FileObject[] = Array.from(uploadedFiles).map((file) => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + " MB", // Convert size to MB
      type: file.type,
      status: supportedTypes.includes(file.type) ? "success" : "error", // Check if file type is supported
    }));

    // Update the files state with the new files
    setFiles([...files, ...updatedFiles]);
  };

  return (
    <div className="max-w-lg flex flex-col gap-3">
      {/* Download Template Section */}
      <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
        <FaDownload className="text-[#FFB11F]" />
        <span className="underline text-[14px] font-medium text-[#0F172A]">
          Download business card design templates
        </span>
      </div>

      {/* File Upload Section */}
      <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-lg">
        <label className="cursor-pointer">
          <Upload className="mx-auto mb-2 text-gray-500" />
          or Drag files here <span className="text-[#6366F1]">Upload</span>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg"
          />
        </label>
      </div>

      {/* Supported File Types and Requirements */}
      <p className="text-xs text-gray-500">
        • Supported file types: DOC, JPG, PNG, AI, PSD, PPT.
      </p>
      <p className="text-xs text-gray-500">
        • Required resolution: 300 dots per inch.
      </p>

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
            {/* File Icon and Details */}
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

            {/* Error Message for Invalid Files */}
            {file.status === "error" && (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs text-red-500">Invalid file type</span>
              </div>
            )}

            {/* Delete Button */}
            <button
              onClick={() =>
                setFiles(files.filter((_, i) => i !== index))
              }
            >
              <RiDeleteBin6Line className="text-[#40566D] w-5 h-5 hover:text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}