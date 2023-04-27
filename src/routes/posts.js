import express from "express";
import {
  addPost,
  deletePostById,
  getPostById,
  getPosts,
  getPostsBySearch,
  updatePostById,
  likePostById,
} from "../controllers/posts.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/posts", [auth], addPost);
router.get("/posts", getPosts);
router.get("/posts/search", getPostsBySearch);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", [auth], updatePostById);
router.put("/posts/:id/likePost", [auth], likePostById);
router.delete("/posts/:id", [auth], deletePostById);

export default router;
