import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillInput() {

  return (
    <ReactQuill>
      <div className="editor-area" style={{height: 250}}/>
    </ReactQuill>
  )
}

export default QuillInput