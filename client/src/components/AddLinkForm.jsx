import React, { useState } from "react";
import { createLink } from "../services/api";

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

export default function AddLinkForm({ onCreated, reload }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (!url) return setError("Target URL is required");

    try {
      new URL(url);
    } catch {
      return setError("Invalid URL (must start with http:// or https://)");
    }

    if (code && !CODE_REGEX.test(code)) {
      return setError("Code must be 6-8 alphanumeric characters");
    }

    setLoading(true);

    try {
      const created = await createLink({
        url: url.trim(),
        code: code || undefined,
      });

      setUrl("");
      setCode("");

      if (typeof onCreated === "function") onCreated(created);
      if (typeof reload === "function") reload();
    } catch (err) {
      if (err?.status === 409) setError("Code already exists");
      else setError(err?.message || "Error creating link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      <div>
        <label className="block text-sm font-medium">Target URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/long/path"
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Custom Code (optional)
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-8 characters"
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
}
