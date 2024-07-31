import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comments from './Comments';

const CommentList = ({ comments }) => {
  
  const stateComment = useSelector(state => state.comments);
  const [processedComments, setProcessedComments] = useState([]);
  const [likeRootComment, setLikeRootComment] = useState({});
  const [toogleLikeRootComment, setToogleLikeRootComment] = useState({});
  useEffect(() => {
    const fetchRootComments = async () => {
      try {
        const likesData = {};
        const allComments = [];
         // Fetch comments and their likes
         const fetchCommentsPromises = comments.map(comment =>
          axios.get(`http://localhost:4000/getPostRootComments/${comment.postId}`)
        );

        const fetchedComments = await Promise.all(fetchCommentsPromises);
        
        // Process fetched comment
        fetchedComments.forEach(response => {
          const postComments = response.data.postComments || [];
          postComments.forEach(cmnt => {
            likesData[cmnt._id] = cmnt.rootCommentLikes > 0;
            allComments.push(cmnt);
          });
        });
        setProcessedComments(allComments);
        setToogleLikeRootComment(likesData);
          
        
      } catch (error) {
        console.error('Error processing comments:', error);
      }
    };
  fetchRootComments();
}, [stateComment, comments]);

  return (
    <>
      {/* Here is the List, WHERe EACH COMMENTS LIST ARE TRAVERSED AND DATA IS POPULATED FROM ARRAY 1 BY 1, AND SEND AS PROPS TO THE cOMMENT cOMPONENT. sO HERE YOU HAVE TO MODIFY THE THINGS FOR LIKE COMMENTS, OR EVEN USE USEEFFECT TO UPDATE HE VALUE OF "COMMENTS IN THIS COMPONENT'S PROPS, AND THEN TRAVERSE THE NEW UPDATED LIST, AND CALLING cOMMENTS AGAIN*/}
    
      {comments.map(comment => (
        <div key={comment._id} className="comment-stack">
          <Comments 
            {...comment}
            toogleLikeRootComment={toogleLikeRootComment[comment._id]}
          />
        </div>
      ))}
      
    </>
  );
};

export default CommentList;
