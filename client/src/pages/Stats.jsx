import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLink } from "../services/api";

export default function Stats() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://tinylink-a8gs.onrender.com";

  useEffect(() => {
    setLoading(true);
    getLink(code)
      .then((d) => {
        setData(d);
      })
      .catch((err) => {
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [code]);
console.log("data.clicks",data)
  if (loading) return <div className="p-6">Loading...</div>;

  if (!data)
    return (
      <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Link not found</h2>
        <p className="mb-4 text-gray-600">We couldn't find a link with code <strong>{code}</strong>.</p>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded">Back to Dashboard</button>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-2">Stats for: {data.code}</h1>

      <p className="mb-2">
        Short URL:{" "}
        <a href={`${baseUrl}/${data.code}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          {`${baseUrl}/${data.code}`}
        </a>
      </p>

      <p className="mb-2">Target: <a href={data.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{data.url}</a></p>

      <p className="mb-2">Clicks: <strong>{data.clicks ?? 0}</strong></p>
      <p className="mb-2">Last clicked: {data.last_clicked ? new Date(data.last_clicked).toLocaleString() : "-"}</p>
      <p className="mb-2">Created at: {data.created_at ? new Date(data.created_at).toLocaleString() : "-"}</p>

      <div className="mt-4">
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-200 rounded mr-2">Back</button>
        <a href={`${baseUrl}/${data.code}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded">Open Link</a>
      </div>
    </div>
  );
}
