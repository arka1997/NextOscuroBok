'use client'
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";

const Post = () => {
  const posts = useSelector((state) => state.posts);
  const comments = useSelector(state => state.comments);
  const [showUpdateMessage, setShowUpdateMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [likes, setLikes] = useState({});
  const [activePostId, setActivePostId] = useState(null);

  const getRandomColor = () => {
    const colorCode = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return colorCode;
  };

  useEffect(() => {
    const fetchInitialLikes = async () => {
      try {
        const likesData = {};
        for (const post of posts[0].text) {
          const response = await axios.get(
            `http://localhost:4000/getLikes/${post._id}`
          );
          likesData[post._id] = response.data.postLikes !== 0;
        }
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching initial likes:", error);
      }
    };
    fetchInitialLikes();
  }, [posts]);

  const addLike = async (postId) => {
    try {
      
      setLikes((prevLikes) => ({
        ...prevLikes, // keeps a copy of the previous likes
        [postId]: !prevLikes[postId], // Matches the new updated data with the old copy
      }));
      await updateLikes(postId, !likes[postId] ? 1 : 0);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const updateLikes = async (postId, likeStatus) => {
    try {
      await axios.post(
        `http://localhost:4000/updateLikes/${postId}/${likeStatus}`
      );
      likeStatus === 1
        ? setShowUpdateMessage("Liked Successfully")
        : setShowUpdateMessage("");
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const toggleRootComments = async (postId) => {

    // On clicking the comments button of a post, this method will trigger with the postId. Initially, prevPostId is null, so it doesn't match postId, and we set prevPostId to postId. On another click, if prevPostId and postId match, we return null to hide the comments section again.
    setActivePostId((prevPostId) => (prevPostId === postId ? null : postId));

    try {
      setShowComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setShowComments([]); // Fallback to empty array in case of error
    }
  };

  return (
    <>
      {showUpdateMessage === "Liked Successfully" && (
        <div className="response-card">{showUpdateMessage}</div>
      )}
      {posts?.map((post) => (
        <div className="post" key={post.id}>
          {post.text?.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <div className="post__header">
                <div className="post__headerAuthor">
                  <Avatar
                    style={{ marginRight: "10px" }}
                    sx={{ bgcolor: getRandomColor() }}
                  ></Avatar>{" "}
                  {item.userName} • <span>{item.timestamp}</span>
                </div>
                <Tooltip title="Delete Post">
                  <div
                    className="moreOptionsIcon"
                    onClick={() => setShowDeletePopup(true)}
                  >
                    <MoreHorizIcon />
                  </div>
                </Tooltip>
              </div>
              <div className="post__image">
                <img
                  src={`http://localhost:4000/${item.postImage}`} // Dynamic image source
                  alt="Post"
                />
              </div>
              <div className="post__footer">
                <div className="post__footerIcons">
                  <div className="post__iconsMain">
                    {likes[item._id] ? (
                      <FavoriteIcon
                        className="fas postIcon"
                        onClick={() => addLike(item._id)}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="postIcon"
                        onClick={() => addLike(item._id)}
                      />
                    )}
                      <ChatOutlinedIcon
                        className="postIcon"
                        onClick={() => toggleRootComments(item._id)}
                      />
                      <TelegramIcon className="postIcon" />
                  </div>
                  <div className="post__iconsSave">
                      <BookmarkBorderIcon className="postIcon" />
                  </div>
                </div>
                Liked by {item.postLikes} people.
              </div>
              {/* dO SOME CHanGE HERE, somehow fetch the values, and render them in comments*/}
              {activePostId === item._id && (
                <>
                  {comments?.map((comment) => (
                    <>
                    {comment.postId === activePostId && (
                      <>
                        <CommentForm
                            postId={item._id}
                            userName={item.userName}
                            timestamp={item.timestamp}
                        />
                        <CommentList comments={comment.text} />
                        </>
                  )}
                  </>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Post;

// First, the api is called to get the Parent Comments List -> then in the posts page -> onclick of comment button -> we display form and send the root comments that was fetched from Db, as a Parameter to CommentList page.
// CommentList Page has the component Comment. We inject the COMMENTS inside that COMMENTS ONE BY ONE THROUGH TRAVERSING
