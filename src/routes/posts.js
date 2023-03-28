import express from "express";
import {
  addPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostById,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/post", addPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePostById);
router.delete("/posts/:id", deletePostById);

export default router;
