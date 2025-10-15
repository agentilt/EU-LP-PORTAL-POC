"use client";
import { useState, DragEvent } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export default function DragDropDemo() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadedFile[] = droppedFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-lg border-2 border-dashed p-8 transition-colors
          ${isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
          }
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`rounded-full p-3 ${isDragging ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"}`}>
            <Upload className={`size-8 ${isDragging ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {isDragging ? "Drop files here" : "Drag & drop documents here"}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PDF, Excel, or Word documents
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Capital Calls</span>
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Reports</span>
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">KYC Documents</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Uploaded Files ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-2">
                    <FileText className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

