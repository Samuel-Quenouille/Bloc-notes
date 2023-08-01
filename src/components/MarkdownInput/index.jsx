import React, { useState } from 'react';

const MarkdownInput = ({ onSave }) => {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSave = () => {
    onSave(markdown);
  };

  return (
    <div>
      <textarea value={markdown} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MarkdownInput;