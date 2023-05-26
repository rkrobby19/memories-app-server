import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [Object], default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
