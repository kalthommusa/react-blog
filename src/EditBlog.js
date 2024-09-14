import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8000/blogs/' + id)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };

    fetch('http://localhost:8000/blogs/' + id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }).then(() => {
      // history.push('/blogs/' + id);
      history.push('/');
    });
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog</h2>
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
    </div>
  );
}

export default EditBlog;
