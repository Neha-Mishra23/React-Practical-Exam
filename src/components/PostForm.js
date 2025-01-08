import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../store/actions";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post id from the URL

  // Get the post from the Redux store if we are editing
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === parseInt(id))
  );

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const updatedPost = {
        title,
        content,
        image,
        date: new Date().toISOString(),
      };

      if (post) {
        // Dispatch updatePost for existing post
        dispatch(updatePost(post.id, updatedPost));
      } else {
        // Dispatch addPost for new post
        dispatch(addPost(updatedPost));
      }

      navigate("/"); // Redirect to home after submission
    }
  };

  return (
    <div className="container mt-4">
      <h2>{post ? "Edit Post" : "Add Post"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {post ? "Save Changes" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
