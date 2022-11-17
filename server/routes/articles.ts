import express from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  checkId,
  checkBody,
} from "../controllers/articles-controller";

var router = express.Router();

router.param("id", checkId);

router.route("/").get(getAllArticles).post(checkBody, createArticle);

router
  .route("/:id")
  .get(getArticle)
  .put(checkBody, updateArticle)
  .delete(deleteArticle);

export default router;
