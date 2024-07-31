import React, { useState, useEffect } from 'react'
import "./CommentForm.css";
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommentForm = ({
    postId,
    userName,
    timestamp,
    autoFocus = false,
    initialValue = "",
  }) => {
    const posts = useSelector(state => state.posts);
    const [message, setMessage] = useState(initialValue);
    const [togglePostButton, setTogglePostButton] = useState(false);

    useEffect(() => {
        setTogglePostButton(message.trim().length > 0);
      }, [message]); 
      const addRootComments = async (postId, rootMessage, userName, rootCommentLikes, timestamp) => {
        try {
          const response = await axios.post(`http://localhost:4000/addRootComments/${postId}`, {
            rootMessage,
            userName,
            rootCommentLikes,
            timestamp
          });
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };
    const demo = (e) => {
        setTogglePostButton = true;
        setMessage(e);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (togglePostButton) {
          await addRootComments(postId, message, userName, 0, timestamp);
          setMessage("");
          setTogglePostButton(false);
        }
      };
    const handleChange = (e) => {
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
                        {/* {loading ? "Loading":"Post"} */}
                        Post
                    </button>
                </div>
            </form>
    )
}

export default CommentForm