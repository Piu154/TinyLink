import React, { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinksTable from "../components/LinkTable";
import { listLinks } from "../services/api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await listLinks();
      setLinks(data);
    } catch (err) {
      console.error("Failed to load links", err);
    } finally {
      setLoading(false);
    }
  }

  function handleCreated(newLink) {
    // add instantly
    setLinks((prev) => [newLink, ...prev]);

    // also reload from DB for accurate clicks
    load();
  }

  function handleDelete(code) {
    setLinks((prev) => prev.filter((l) => l.code !== code));

    // reload database list
    load();
  }
  useEffect(() => {
    load();
  
    // Auto-refresh when the tab becomes active again
    function onFocus() {
      load();
    }
  
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        onFocus();
      }
    });
  
    window.addEventListener("focus", onFocus);
  
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">TinyLink</h1>

      <AddLinkForm onCreated={handleCreated} reload={load} />

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Links</h2>

        {loading ? (
          <div className="p-6">Loading...</div>
        ) : (
          <LinksTable
            links={links}
            baseUrl={baseUrl}
            onDelete={handleDelete}
            onReload={load}
          />
        )}
      </div>
    </div>
  );
}
