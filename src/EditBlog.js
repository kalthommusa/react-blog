import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch"; // Import the custom hook

const EditBlog = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id); // Reuse useFetch
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const history = useHistory();

  // Set form fields when blog data is fetched
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    }
  }, [blog]); // This effect runs when blog data changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };

    fetch('http://localhost:8000/blogs/' + id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }).then(() => {
      history.push('/');
    });
  };

  return (
    <div className="edit-blog">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog author:</label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">mario</option>
            <option value="yoshi">yoshi</option>
          </select>
          <button>Update Blog</button>
        </form>
      )}
    </div>
  );
}

export default EditBlog;
