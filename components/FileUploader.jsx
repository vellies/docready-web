"use client";
import { useRef, useState } from "react";

export default function FileUploader({ onFilesAdded }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const accepted = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );
    if (accepted.length) onFilesAdded(accepted);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
        dragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="text-4xl mb-3">📁</div>
      <p className="text-gray-600 font-medium">Drop images here or click to browse</p>
      <p className="text-gray-400 text-sm mt-1">JPG, PNG, WebP, TIFF — up to 20MB each</p>
    </div>
  );
}
