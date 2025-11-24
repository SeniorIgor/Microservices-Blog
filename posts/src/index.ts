import express, { Request, Response } from "express";
import { randomBytes } from "crypto";

import { Post } from "./types";

const app = express();
app.use(express.json());

const PORT = process.env.POSTS_PORT || 4000;
const posts: Record<string, Post> = {};

app.get("/posts", (_req: Request, res: Response) => {
  res.send(posts);
});

app.post("/posts", (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`Posts service listening on port ${PORT}`);
});
