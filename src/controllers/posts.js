import Post from "../models/post.js";

export const addPost = async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;

    const newPost = new Post({
      ...data,
      creator: user.id,
      name: `${user.firstName} ${user.lastName}`,
    });

    await newPost.save();

    res.status(201).send({ post: newPost });
  } catch (error) {
    res.status(409).send({ status: error.name, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { pages } = req.query;
    let posts;
    if (pages) {
      const LIMIT = 4;
      const startIndex = (Number(pages) - 1) * LIMIT;
      const TOTAL = await Post.countDocuments({});

      posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
      return res.status(200).send({
        posts,
        currentPage: Number(pages),
        numberOfPages: Math.ceil(TOTAL / LIMIT),
      });
    }

    posts = await Post.find();

    return res.send({ posts });
  } catch (error) {
    res.status(404).send({ status: error.name, message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  try {
    const { q, tags } = req.query;

    const title = new RegExp(q, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

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

    const tag = tags.split(",");

    const updatePost = { title, message, selectedFile, creator, tags: tag };

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

    if (!req.user) {
      return res.json({ message: "Unauthenticated" });
    }

    const post = await Post.findById(id);

    if (post == null) {
      return res.status(404).send({ message: `Post with id:${id} not found` });
    }

    const index = post.likes.findIndex((id) => id === String(req.user.id));

    if (index === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.user.id));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.send({ post: updatedPost });
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
