"use client";
import { useState } from "react";
import PresetSelector, { PRESETS } from "./PresetSelector";
import CustomOptions from "./CustomOptions";

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileCard({ file, preset, customOptions, onPresetChange, onCustomChange, onRemove }) {
  const [preview] = useState(() => URL.createObjectURL(file));
  const presetLabel = PRESETS.find((p) => p.value === preset)?.label || preset;
  const presetHint = PRESETS.find((p) => p.value === preset)?.hint || "";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={preview}
          alt={file.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 flex-shrink-0 text-lg leading-none"
              title="Remove"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-3">{formatBytes(file.size)}</p>
          <PresetSelector value={preset} onChange={onPresetChange} />
          {preset !== "custom" && (
            <p className="text-xs text-blue-500 mt-1.5">{presetHint}</p>
          )}
        </div>
      </div>
      {preset === "custom" && (
        <CustomOptions value={customOptions} onChange={onCustomChange} />
      )}
    </div>
  );
}
