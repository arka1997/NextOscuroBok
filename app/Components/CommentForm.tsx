import React, { useState, useEffect } from 'react';
import './commentForm.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../Stores/store';

interface CommentFormProps {
  postId: string;
  userName: string;
  timestamp: string;
  autoFocus?: boolean;
  initialValue?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  userName,
  timestamp,
  autoFocus = false,
  initialValue = '',
}) => {
  const posts = useSelector((state: RootState) => state.timeline.posts);
  const [message, setMessage] = useState<string>(initialValue);
  const [togglePostButton, setTogglePostButton] = useState<boolean>(false);

  useEffect(() => {
    setTogglePostButton(message.trim().length > 0);
  }, [message]);

  const addRootComments = async (
    postId: string,
    rootMessage: string,
    userName: string,
    rootCommentLikes: number,
    timestamp: string
  ) => {
    try {
      const response = await axios.post(`http://localhost:4000/addRootComments/${postId}`, {
        rootMessage,
        userName,
        rootCommentLikes,
        timestamp,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (togglePostButton) {
      await addRootComments(postId, message, userName, 0, timestamp);
      setMessage('');
      setTogglePostButton(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={handleChange}
          className="message-input"
        />
        <button className="btn2" type="submit" disabled={!togglePostButton}>
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
