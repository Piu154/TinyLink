const BASE = import.meta.env.VITE_API_BASE || "";

export async function createLink(data) {
  const res = await fetch(`${BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.error || "Request failed");
    e.status = res.status;
    e.body = err;
    throw e;
  }
  return res.json();
}

export async function listLinks() {
  const res = await fetch(`${BASE}/api/links`);
  if (!res.ok) throw new Error("Failed to list links");
  return res.json();
}

export async function getLink(code) {
  const res = await fetch(`${BASE}/api/links/${encodeURIComponent(code)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.error || "Not found");
    e.status = res.status;
    throw e;
  }
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${BASE}/api/links/${encodeURIComponent(code)}`, {
    method: "DELETE",
  });
  if (res.status === 404) {
    const obj = await res.json().catch(() => ({}));
    const e = new Error(obj.error || "Not found");
    e.status = 404;
    throw e;
  }
  if (res.status !== 204 && res.status !== 200) {
    throw new Error("Delete failed");
  }
  return true;
}
