export default function CustomOptions({ value, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div className="mt-3 grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Width (px)</label>
        <input
          type="number"
          placeholder="e.g. 400"
          value={value.width || ""}
          onChange={(e) => set("width", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Height (px)</label>
        <input
          type="number"
          placeholder="e.g. 300"
          value={value.height || ""}
          onChange={(e) => set("height", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Format</label>
        <select
          value={value.format || "jpeg"}
          onChange={(e) => set("format", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="jpeg">JPG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Max size (KB)</label>
        <input
          type="number"
          placeholder="e.g. 100"
          value={value.maxKB || ""}
          onChange={(e) => set("maxKB", e.target.value ? Number(e.target.value) : null)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
}
