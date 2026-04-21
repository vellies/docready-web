const PRESETS = [
  { value: "passport", label: "Passport Photo", hint: "200×200px, JPG, <50KB" },
  { value: "signature", label: "Signature", hint: "300×100px, JPG" },
  { value: "aadhaar", label: "Aadhaar", hint: "JPG, <200KB" },
  { value: "certificate", label: "Certificate", hint: "PDF + OCR" },
  { value: "custom", label: "Custom", hint: "Manual settings" },
];

export default function PresetSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange(p.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            value === p.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
          }`}
          title={p.hint}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export { PRESETS };
