import React, { useEffect, useState } from "react";

type Post = { id: number; title: string };
type Comment = { id: number; postId: number; text: string };

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Adjust URLs if you put services behind a gateway or different port
    fetch("http://localhost:4000/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error fetching posts", err));

    fetch("http://localhost:4001/comments")
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Error fetching comments", err));
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Microservices Demo</h1>

      <section>
        <h2>Posts</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Comments</h2>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              Post #{c.postId}: {c.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
