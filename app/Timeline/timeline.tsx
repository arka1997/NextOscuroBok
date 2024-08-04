'use client'; // Ensure this component is rendered client-side

import React, { useEffect } from 'react';
import axios from 'axios';
import './timeline.css';
import Suggestions from './suggestions';
import Post from './Posts/post';
import { useDispatch } from 'react-redux';
import { timelinePosts, addComment } from '../features/timeline/timelineSlice';

const Timeline: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from your Next.js API route
        const response = await axios.get('/api/post/fetchPosts.js');
        
        const sanitizedPosts = await Promise.all(response.data.map(async (post: any) => {
          // Sanitize post image path if needed
          const sanitizedPostImage = post.postImage.startsWith('uploads\\') ? post.postImage.replace('uploads\\', '') : post.postImage;
          
          // Fetch root comments for each post
          const responseComment = await axios.get(`/api/getPostRootComments/${post._id}`);
          const rootComments = responseComment.data.postComments || [];
          
          // Dispatch comments for each post
          dispatch(addComment({
            postId: post._id,
            comment: rootComments
          }));

          // Return sanitized post data
          return {
            ...post,
            postImage: sanitizedPostImage
          };
        }));

        // Dispatch posts to Redux store
        dispatch(timelinePosts(sanitizedPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        <div className='timeline__posts'>
          <Post />
        </div>
      </div>
      <div className='timeline__right'>
        <Suggestions />
      </div>
    </div>
  );
};

export default Timeline;
