"use client";
import { useState } from "react";

export default function DownloadList({ results }) {
  const [expandedOcr, setExpandedOcr] = useState(null);

  if (!results.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Processed Files</h2>
      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm font-medium text-gray-700 truncate">{r.filename}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {r.ocrText && (
                  <button
                    onClick={() => setExpandedOcr(expandedOcr === i ? null : i)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {expandedOcr === i ? "Hide OCR" : "Show OCR"}
                  </button>
                )}
                <a
                  href={r.url}
                  download={r.filename}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
            {expandedOcr === i && r.ocrText && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-1">Extracted Text (OCR)</p>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">{r.ocrText}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
