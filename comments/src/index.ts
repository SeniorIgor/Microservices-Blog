import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const PORT = process.env.COMMENTS_PORT || 4001;

app.get("/comments", (_req: Request, res: Response) => {
  res.json([{ id: 1, postId: 1, text: "Nice post!" }]);
});

app.listen(PORT, () => {
  console.log(`Comments service listening on port ${PORT}`);
});
