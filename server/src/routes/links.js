import express from "express";
import {
  postCreateLink,
  getLinks,
  getLinkStats,
  deleteLinkByCode,
} from "../controllers/linksController.js";

const router = express.Router();

router.post("/", postCreateLink);
router.get("/", getLinks);
router.get("/:code", getLinkStats);
router.delete("/:code", deleteLinkByCode);

export default router;
