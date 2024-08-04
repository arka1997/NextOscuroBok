import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './post.css';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TelegramIcon from '@mui/icons-material/Telegram';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CommentForm from '@/app/Components/CommentForm';
import CommentList from '@/app/Components/CommentList';
import { RootState } from '@/app/Stores/store';
import { PostType, CommentType } from '@/app/types/types'; // Ensure these match your Redux slice

const Post = () => {
  const posts = useSelector((state: RootState) => state.timeline.posts as PostType[]);
  const comments = useSelector((state: RootState) => state.timeline.comments as CommentType[]);
  const [showUpdateMessage, setShowUpdateMessage] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showComments, setShowComments] = useState<CommentType[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const getRandomColor = () => {
    const colorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return colorCode;
  };

  useEffect(() => {
    const fetchInitialLikes = async () => {
      try {
        const likesData: { [key: string]: boolean } = {};
        for (const post of posts) {
          const response = await axios.get(
            `http://localhost:4000/getLikes/${post._id}`
          );
          likesData[post._id] = response.data.postLikes !== 0;
        }
        setLikes(likesData);
      } catch (error) {
        console.error('Error fetching initial likes:', error);
      }
    };
    fetchInitialLikes();
  }, [posts]);

  const addLike = async (postId: string) => {
    try {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: !prevLikes[postId],
      }));
      await updateLikes(postId, !likes[postId] ? 1 : 0);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const updateLikes = async (postId: string, likeStatus: number) => {
    try {
      await axios.post(
        `http://localhost:4000/updateLikes/${postId}/${likeStatus}`
      );
      likeStatus === 1
        ? setShowUpdateMessage('Liked Successfully')
        : setShowUpdateMessage('');
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const toggleRootComments = (postId: string) => {
    setActivePostId((prevPostId) => (prevPostId === postId ? null : postId));
    setShowComments(comments.filter((comment) => comment.postId === postId));
  };

  return (
    <>
      {showUpdateMessage === 'Liked Successfully' && (
        <div className="response-card">{showUpdateMessage}</div>
      )}
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="post__header">
            <div className="post__headerAuthor">
              <Avatar
                style={{ marginRight: '10px' }}
                sx={{ bgcolor: getRandomColor() }}
              ></Avatar>{' '}
              {post.userName} • <span>{post.timestamp}</span>
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
              src={`http://localhost:4000/${post.postImage}`}
              alt="Post"
            />
          </div>
          <div className="post__footer">
            <div className="post__footerIcons">
              <div className="post__iconsMain">
                {likes[post._id] ? (
                  <FavoriteIcon
                    className="fas postIcon"
                    onClick={() => addLike(post._id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="postIcon"
                    onClick={() => addLike(post._id)}
                  />
                )}
                <ChatOutlinedIcon
                  className="postIcon"
                  onClick={() => toggleRootComments(post._id)}
                />
                <TelegramIcon className="postIcon" />
              </div>
              <div className="post__iconsSave">
                <BookmarkBorderIcon className="postIcon" />
              </div>
            </div>
            Liked by {post.postLikes} people.
          </div>
          {activePostId === post._id && (
            <>
              <CommentForm
                postId={post._id}
                userName={post.userName}
                timestamp={post.timestamp}
              />
              <CommentList comments={showComments} />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Post;
