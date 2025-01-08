export const FETCH_POSTS = "FETCH_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// Fetch all posts
export const fetchPosts = () => async (dispatch) => {
  const response = await fetch("http://localhost:3001/posts");
  const posts = await response.json();
  dispatch({ type: FETCH_POSTS, payload: posts });
};

// Add a new post
export const addPost = (post) => async (dispatch) => {
  const response = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  const newPost = await response.json();
  dispatch({ type: ADD_POST, payload: newPost });
};

// Update an existing post
export const updatePost = (id, post) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  const updatedPost = await response.json();
  dispatch({ type: UPDATE_POST, payload: updatedPost });
};
export const deletePost = (id) => async (dispatch) => {
  await fetch(`http://localhost:3001/posts/${id}`, { method: "DELETE" });
  dispatch({ type: DELETE_POST, payload: id });
};
