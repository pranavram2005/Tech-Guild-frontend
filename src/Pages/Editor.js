import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';  // Import Quill's CSS

const SAVE_INTERVAL_MS = 2000;  // Save every 2 seconds

const Editor = ({ documentId }) => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Connect to the server when the component mounts
  useEffect(() => {
    const s = io('http://localhost:5000');
    setSocket(s);

    // Cleanup when component unmounts
    return () => {
      s.disconnect();
    };
  }, []);

  // Load document content
  useEffect(() => {
    if (!socket || !quill) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('join-room', documentId);
  }, [socket, quill, documentId]);

  // Handle real-time updates
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  // Broadcast changes made by the user to others
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  // Auto-save document content
  useEffect(() => {
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Setup Quill editor
  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = '';  // Clear existing content

    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, { theme: 'snow' });
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return (
    <><h3></h3>
  <div className="box" ref={wrapperRef}></div>  
  </>);
};

export default Editor;
