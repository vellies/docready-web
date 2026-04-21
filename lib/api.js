const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function processFiles(fileEntries) {
  const formData = new FormData();

  for (const entry of fileEntries) {
    formData.append("files", entry.file);
    formData.append("presets", entry.preset);
    if (entry.preset === "custom" && entry.customOptions) {
      formData.append("customOptions", JSON.stringify(entry.customOptions));
    } else {
      formData.append("customOptions", "{}");
    }
  }

  const response = await fetch(`${API_BASE}/api/process`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Processing failed" }));
    throw new Error(err.error || "Processing failed");
  }

  const contentType = response.headers.get("Content-Type") || "";
  const disposition = response.headers.get("Content-Disposition") || "";
  const ocrText = response.headers.get("X-OCR-Text");

  const blob = await response.blob();
  const filename = disposition.match(/filename="?([^"]+)"?/)?.[1] || "output";
  const url = URL.createObjectURL(blob);

  return [
    {
      url,
      filename,
      ocrText: ocrText ? decodeURIComponent(ocrText) : null,
      isZip: contentType.includes("zip"),
    },
  ];
}
