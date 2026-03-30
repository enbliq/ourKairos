const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Capsule = require("../models/Capsule");
const requireAuth = require("../middleware/requireAuth");

router.get("/", requireAuth, async (req, res) => {
  try {
    const senderId = req.user.id; 

    let statusFilter = req.query.status
      ? [].concat(req.query.status)
      : null;

    const VALID_STATUSES = ["draft", "sealed", "unlocked"];
    if (statusFilter) {
      statusFilter = statusFilter.filter((s) => VALID_STATUSES.includes(s));
      if (statusFilter.length === 0) statusFilter = null;
    }

    const search = typeof req.query.search === "string"
      ? req.query.search.trim().slice(0, 200)
      : null;

    const unlockAfter  = req.query.unlockAfter  ? new Date(req.query.unlockAfter)  : null;
    const unlockBefore = req.query.unlockBefore ? new Date(req.query.unlockBefore) : null;

    const VALID_SORT_COLS = ["created_at", "unlock_date", "title"];
    const sortBy  = VALID_SORT_COLS.includes(req.query.sortBy) ? req.query.sortBy : "created_at";
    const sortDir = req.query.sortDir === "asc" ? "ASC" : "DESC";

    const page  = Math.max(1, parseInt(req.query.page,  10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = { sender_id: senderId };

    if (statusFilter) {
      where.status = { [Op.in]: statusFilter };
    }

    if (search) {
      where[Op.or] = [
        { title:   { [Op.iLike]: `%${search}%` } },
        { message: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (unlockAfter || unlockBefore) {
      where.unlock_date = {};
      if (unlockAfter)  where.unlock_date[Op.gte] = unlockAfter;
      if (unlockBefore) where.unlock_date[Op.lte] = unlockBefore;
    }

    const { count, rows } = await Capsule.findAndCountAll({
      where,
      order:  [[sortBy, sortDir]],
      limit,
      offset,

    });

    return res.json({
      data: rows,
      meta: {
        total:       count,
        page,
        limit,
        totalPages:  Math.ceil(count / limit),
        hasNextPage: offset + rows.length < count,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error("[GET /api/capsules]", err);
    return res.status(500).json({ error: "Failed to fetch capsules" });
  }
});

module.exports = router;
