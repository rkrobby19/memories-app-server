import express from "express";
import {
  addPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePostById,
  likePostById,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/posts", addPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePostById);
router.put("/posts/:id/likePost", likePostById);
router.delete("/posts/:id", deletePostById);

export default router;
