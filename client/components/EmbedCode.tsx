import { useState } from 'react';

export default function EmbedCode({ videoUrl }: { videoUrl: string }) {
  const embedScript = `<div id="ai-avatar"></div>
<script>
  (function() {
    const container = document.getElementById("ai-avatar");
    const video = document.createElement("video");
    video.src = "${videoUrl}";
    video.autoplay = true;
    video.controls = true;
    video.style.width = "100%";
    container.appendChild(video);
  })();
</script>`;

  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-6">
      <label className="font-semibold mb-2 block">Embed Script:</label>
      <textarea
        className="w-full border rounded p-3 text-sm font-mono"
        rows={6}
        value={embedScript}
        readOnly
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        onClick={() => {
          navigator.clipboard.writeText(embedScript);
          setCopied(true);
        }}
      >
        {copied ? 'Disalin!' : 'Salin ke Clipboard'}
      </button>
    </div>
  );
}
