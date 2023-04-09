import Post from "../models/post.js";

export const addPost = async (req, res) => {
  try {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPost = new Post({
      title,
      message,
      selectedFile,
      creator,
      tags,
    });

    await newPost.save();

    res.status(201).send({ newPost });
  } catch (error) {
    res.status(409).send({ status: error.name, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ posts });
  } catch (error) {
    res.status(404).send({ status: error.name, message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post == null) {
      return res.status(404).send({ message: `Post with id:${id} not found` });
    }

    res.status(200).send({ post });
  } catch (error) {
    res.status(404).send({ status: error.name, message: error.message });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, message, selectedFile, creator, tags } = req.body;

    const updatePost = { title, message, selectedFile, creator, tags };

    const post = await Post.findByIdAndUpdate(id, updatePost, {
      returnDocument: "after",
    });

    if (post == null) {
      return res.status(404).send({ message: `Post with id:${id} not found` });
    }

    res.send({ post });
  } catch (error) {
    res.send({ status: error.name, message: error.message });
  }
};

export const likePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post == null) {
      return res.status(404).send({ message: `Post with id:${id} not found` });
    }

    const likePost = await Post.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { returnDocument: "after" }
    );

    res.send({ likePost });
  } catch (error) {
    res.send({ status: error.name, message: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (post == null) {
      return res.status(404).send({ message: `Post with id:${id} not found` });
    }

    res.send({ post });
  } catch (error) {
    res.send({ status: error.name, message: error.message });
  }
};
