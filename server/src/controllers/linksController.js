import { nanoid } from "nanoid";
import {
  createLink,
  getAllLinks,
  getLink,
  deleteLink,
  incrementClick,
} from "../models/linksModel.js";
import { isValidUrl } from "../utils/validateUrl.js";

export async function postCreateLink(req, res) {
  let { url, code } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (!code) {
    code = nanoid(6);
  }

  const existing = await getLink(code);
  if (existing) {
    return res.status(409).json({ error: "Code already exists" });
  }

  const newLink = await createLink(code, url);
  res.status(201).json(newLink);
}

export async function getLinks(req, res) {
  res.json(await getAllLinks());
}

export async function getLinkStats(req, res) {
  const link = await getLink(req.params.code);
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
}

export async function deleteLinkByCode(req, res) {
  const link = await getLink(req.params.code);
  if (!link) return res.status(404).json({ error: "Not found" });

  await deleteLink(req.params.code);
  res.json({ success: true });
}

export async function redirectCode(req, res) {
  const code = req.params.code;
  const link = await getLink(code);

  if (!link) return res.status(404).send("Not Found");

  await incrementClick(code);
  res.redirect(302, link.url);
}
