import { pool } from "../db.js";

export async function createLink(code, url) {
  const query = `
    INSERT INTO links(code, url, clicks, last_clicked)
    VALUES ($1, $2, 0, null)
    RETURNING *;
  `;
  const values = [code, url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getLink(code) {
  const { rows } = await pool.query("SELECT * FROM links WHERE code=$1", [
    code,
  ]);
  return rows[0];
}

export async function incrementClick(code) {
  // Update clicks and last_clicked
  const query = `
    UPDATE links
    SET clicks = clicks + 1,
        last_clicked = NOW()
    WHERE code = $1
    RETURNING *;
  `;
  const values = [code];
  const { rows } = await pool.query(query, values);

  // If no row found, return null
  if (rows.length === 0) return null;

  return rows[0];
}

export async function deleteLink(code) {
  await pool.query("DELETE FROM links WHERE code=$1", [code]);
}

export async function getAllLinks() {
  const { rows } = await pool.query(
    "SELECT * FROM links ORDER BY created_at DESC"
  );
  return rows;
}
