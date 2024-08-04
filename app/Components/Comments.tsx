'use client';

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import "./Comments.css";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import CommentForm from "./CommentForm";
import { RootState } from "../Stores/store";

interface CommentsProps {
  _id: string;
  postId: string;
  toogleLikeRootComment: boolean;
  rootCommentLikes: number;
  userName: string;
  rootMessage: string;
  timestamp: string;
}

const Comments: React.FC<CommentsProps> = ({ _id, postId, toogleLikeRootComment, rootCommentLikes, userName, rootMessage, timestamp }) => {
  const stateComment = useSelector((state: RootState) => state.timeline.comments);
  const [isLiked, setIsLiked] = useState(toogleLikeRootComment);
  const [likesCount, setLikesCount] = useState(rootCommentLikes);
  const currentDate = new Date(timestamp);
  const currentDateISOString = currentDate.toISOString();
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [isEditting, setIsEditting] = useState(false);
  const [processedComments, setProcessedComments] = useState<any[]>([]);

  useEffect(() => {
    setIsLiked(toogleLikeRootComment);
  }, [toogleLikeRootComment]);

  const deleteRootCommentLikes = async () => {
    const rootCommentId = _id;
    try {
      const response = await axios.delete(`http://localhost:4000/deleteRootCommentLikes/${rootCommentId}`);
      if (!response.data.ok) {
        throw new Error('Failed to delete comment');
      }
      setProcessedComments(prevComments => prevComments.filter(comment => comment._id !== rootCommentId));
      setLikes(prevLikes => {
        const newLikes = { ...prevLikes };
        delete newLikes[rootCommentId];
        return newLikes;
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  }

  const addChildCommentLikes = async (commentId: string) => {
    const rootCommentId = commentId;
    try {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [rootCommentId]: !prevLikes[rootCommentId], //stores in the form [ key(id) : true]
      }));
      const likeStatus = !likes[rootCommentId] ? 1 : 0;
      await axios.post(`http://localhost:4000/updateRootCommentLikes/${rootCommentId}/${likeStatus}`);
      setLikesCount((prevCount) => likeStatus === 1 ? prevCount + 1 : prevCount - 1);
      setIsLiked(likeStatus === 1);
    } catch (error) {
      console.error('Error updating comment likes:', error);
    }
  };

  const editRootCommentLikes = () => {
    setIsEditting(true);
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{userName}</span>
          <span className="date">{currentDateISOString}</span>
        </div>
        <div className="message">{rootMessage}</div>
        <div className="footer">
          <IconBtn Icon={isLiked ? FaHeart : FaRegHeart} onClick={() => addChildCommentLikes(_id)}>
            {likesCount}
          </IconBtn>
          <IconBtn Icon={FaReply} onClick={editRootCommentLikes}></IconBtn>
          {isEditting ? (
            <CommentForm
              postId={_id}
              userName={userName}
              timestamp={timestamp}
            />
          ) : (
            <IconBtn Icon={FaEdit}></IconBtn>
          )}
          <IconBtn Icon={FaTrash} onClick={deleteRootCommentLikes}></IconBtn>
        </div>
      </div>
    </>
  );
};

export default Comments;
