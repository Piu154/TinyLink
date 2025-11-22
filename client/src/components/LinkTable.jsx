import React, { useState } from "react";
import { deleteLink } from "../services/api";

function buildShortUrl(base, code) {
  return `${base}/${code}`;
}

export default function LinksTable({ links, onDelete, baseUrl, onReload }) {
  const [copied, setCopied] = useState(null);
// console.log("links",links)
// const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  async function handleCopy(code) {
    const text = buildShortUrl(baseUrl, code);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      alert("Copy failed");
    }
  }

  async function handleDelete(code) {
    if (!confirm("Delete this link?")) return;

    if (typeof onDelete === "function") onDelete(code);

    try {
      await deleteLink(code);
      if (typeof onReload === "function") onReload();
    } catch {
      alert("Delete failed — refresh your page");
    }
  }

  if (!links.length) {
    return <div className="p-6 text-center text-gray-500">No links yet</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Target</th>
            <th className="px-4 py-2">Clicks</th>
            <th className="px-4 py-2">Last Clicked</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="px-4 py-2 font-mono text-sm">{l.code}</td>

              <td className="px-4 py-2 max-w-xs truncate" title={l.url}>
                <a
                  className="text-blue-600 hover:underline"
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.url}
                </a>
              </td>

              <td className="px-4 py-2">{l.clicks}</td>

              <td className="px-4 py-2">
                {l.last_clicked
                  ? new Date(l.last_clicked).toLocaleString()
                  : "-"}
              </td>

              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleCopy(l.code)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Copy
                </button>

                <a
  className="px-2 py-1 border rounded text-sm text-blue-600"
  href={`${baseUrl}/${l.code}`}   // ✅ CORRECT
  target="_blank"
  rel="noreferrer"
>
  Open
</a>

                <a
                  className="px-2 py-1 border rounded text-sm text-blue-600"
                  href={`/code/${l.code}`}
                >
                  Stats
                </a>

                <button
                  onClick={() => handleDelete(l.code)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {copied && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-3 py-2 rounded-md shadow">
          Copied {baseUrl}/{copied}
        </div>
      )}
    </div>
  );
}
