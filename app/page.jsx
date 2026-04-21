"use client";
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import FileCard from "../components/FileCard";
import DownloadList from "../components/DownloadList";
import { processFiles } from "../lib/api";

export default function Home() {
  const [fileEntries, setFileEntries] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addFiles = (newFiles) => {
    const entries = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preset: "aadhaar",
      customOptions: { width: null, height: null, format: "jpeg", maxKB: null },
    }));
    setFileEntries((prev) => [...prev, ...entries]);
  };

  const updateEntry = (id, patch) =>
    setFileEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );

  const removeEntry = (id) =>
    setFileEntries((prev) => prev.filter((e) => e.id !== id));

  const handleProcess = async () => {
    if (!fileEntries.length) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const out = await processFiles(fileEntries);
      setResults(out);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFileEntries([]);
    setResults([]);
    setError(null);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">DocReady</h1>
        <p className="text-gray-500 mt-1">eSeva Document Formatter — Upload → Preset → Download</p>
      </div>

      {!results.length && (
        <>
          <FileUploader onFilesAdded={addFiles} />

          {fileEntries.length > 0 && (
            <div className="mt-6 space-y-4">
              {fileEntries.map((entry) => (
                <FileCard
                  key={entry.id}
                  file={entry.file}
                  preset={entry.preset}
                  customOptions={entry.customOptions}
                  onPresetChange={(preset) => updateEntry(entry.id, { preset })}
                  onCustomChange={(customOptions) => updateEntry(entry.id, { customOptions })}
                  onRemove={() => removeEntry(entry.id)}
                />
              ))}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleProcess}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-base transition-colors"
              >
                {loading ? "Processing…" : `Process ${fileEntries.length} file${fileEntries.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          )}
        </>
      )}

      {results.length > 0 && (
        <>
          <DownloadList results={results} />
          <button
            onClick={reset}
            className="mt-6 w-full py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm transition-colors"
          >
            Process more files
          </button>
        </>
      )}
    </main>
  );
}
