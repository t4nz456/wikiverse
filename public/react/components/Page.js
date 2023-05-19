import React from 'react';
import {useState, useEffect} from "react";

export const Page = ({ page, onSubmit, onDelete, onCancel }) => {
  const [title, setTitle] = useState(page ? page.title : "");
  const [author, setAuthor] = useState(page ? page.author : "");
  const [content, setContent] = useState(page ? page.content : "");
  const [tags, setTags] = useState(page ? page.tags : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const pageData = {
      title,
      author,
      content,
      tags,
    };
    onSubmit(pageData);
  };

  const handleDelete = () => {
    onDelete(page.slug);
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">{page ? 'Update' : 'Create'}</button>
        {page && <button onClick={handleDelete}>Delete</button>}
        <button onClick={onCancel}>Back to Wiki List</button>
      </form>
    </div>
  );
}; 
	
export default Page;