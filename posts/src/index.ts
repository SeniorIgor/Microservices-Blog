import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";

import { CreatePostRequest, Post } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.POSTS_PORT || 4000;
const posts: Record<string, Post> = {};

app.get("/posts", (_req: Request, res: Response) => {
  res.send(posts);
});

app.post(
  "/posts",
  (req: Request<object, object, CreatePostRequest>, res: Response) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).send({ error: "Title is required" });
    }

    const id = randomBytes(4).toString("hex");

    posts[id] = { id, title };

    res.status(201).send(posts[id]);
  },
);

app.listen(PORT, () => {
  console.log(`Posts service listening on port ${PORT}`);
});
