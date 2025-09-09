import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prev => ({ ...prev, [name]: value }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (!note.title && !note.content) return;
    // If parent provided onAdd, call it with note
    if (props.onAdd) props.onAdd({ title: note.title, content: note.content });
    setNote({ title: "", content: "" });
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
