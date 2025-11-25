import { useState, FormEvent, FC } from "react";
import axios from "axios";

import type { CreatePostRequest } from "../../types";

const PostCreate: FC = () => {
  const [title, setTitle] = useState<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CreatePostRequest = { title };

    await axios.post("http://localhost:4000/posts", payload);

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
