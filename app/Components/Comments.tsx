import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import "./Comments.css";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import CommentForm from "./CommentForm";

const Comments = ({ _id, postId, toogleLikeRootComment, rootCommentLikes, userName, rootMessage, timestamp }) => {
  
  const stateComment = useSelector(state => state.comments);
  // const {getReplies} = "dfdf"
  // const childComments = getReplies(id) // here we pass the id of the current root comment to get its child comments
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(rootCommentLikes);
  const currentDate = new Date(timestamp);
  const currentDateISOString = currentDate.toISOString();
  const [likes, setLikes] = useState({});
  const [isEditting, setIsEditting] = useState(false);
  const [processedComments, setProcessedComments] = useState([]);

  useEffect(() => {
    setIsLiked(toogleLikeRootComment);
  }, [toogleLikeRootComment]);
  
  const deleteRootCommentLikes = async () => {
    const rootCommentId = _id;
    try {
      const response = await axios.delete(`http://localhost:4000/deleteRootCommentLikes/${rootCommentId}`);
    if (!response.ok) {
      throw new Error('Failed to delete commentt');
    }
    setProcessedComments(prevComments => prevComments.filter(comment => comment._id !== comment._id));
      setLikes(prevLikes => {
        const newLikes = { ...prevLikes };
        delete newLikes[_id];
        return newLikes;
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  }

  const addChildCommentLikes = async (commentId) => {
    
    const rootCommentId = commentId;
    
    try {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [rootCommentId]: !prevLikes[rootCommentId],//stores in the form [ key(id) : true]
      }))
      const likeStatus = !likes[rootCommentId] ? 1 : 0
      await axios.post(`http://localhost:4000/updateRootCommentLikes/${rootCommentId}/${likeStatus}`);
      
      (likeStatus === 1) ? setIsLiked(true) : setIsLiked(false);
      
    } catch (error) {
      console.error('Error updating comment likes:', error);
    }
  };

  const editRootCommentLikes = () => {
    setIsEditting(true);
  }

  return (
    <>
      {/* This first one is the Parent comment with header footer, and after that, we print its child comments */}
      {/* Create Comment Header */}
        <div className="comment">
          <div className="header">
            {/* Also add user IMAGE along with name in comments */}
            <span className="name">{userName}</span>
            <span className="date">{currentDateISOString}</span>
          </div>

          {/* Create Comment Message Body */}
          <div className="message">{rootMessage}</div>

          {/* Create Comment Footer */}
          <div className="footer">
          {console.log("y"+toogleLikeRootComment)}
          {console.log("z"+isLiked)}
            <IconBtn Icon={isLiked ? FaHeart: FaRegHeart } onClick={(e) => addChildCommentLikes(_id)}>
            {likesCount}
          </IconBtn>
            <IconBtn Icon={FaReply} onClick={editRootCommentLikes}></IconBtn>          
          {isEditting === false ? (
            <IconBtn Icon={FaEdit}></IconBtn>
          ): (
            <CommentForm
                            postId={_id}
                            userName={userName}
                            timestamp={timestamp}
                        />
          )}
            <IconBtn Icon={FaTrash} colour="red" onClick={deleteRootCommentLikes}></IconBtn>
          </div>
        </div>
    </>

    /* Now Comment Form will be present in 2 places, one is just below post when I click Comment Btn.
    The other time is when we want to update the Comment(Parent or Child) */
  );
};

export default Comments;