import {React, useEffect} from 'react';
import axios from 'axios'
import "./Timeline.css";
import Suggestions from './Suggestions';
import Post from './Posts/post';
import { useDispatch } from 'react-redux';
import { timelinePosts, addComment } from '../features/timeline/timelineSlice';
const Timeline = () => {
  
  const dispatch = useDispatch()
  // Here useEffect expects 2 params, one is  callback function, and the other's are set of Dependencies Array, on whose change, this useEffect will trigger/render. If no dependencies array is present, then if the Timeline component renders, then this will tend to refresh 
  //  Whenever this useEffect component is loaded/mounted on server, because of change in Dispatch value, e.g., due to a Redux store update, then the inner callback function is called from the fetchPosts.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/fetchPosts");
        // Filter and sanitize the data
        const sanitizedPosts = await Promise.all(response.data.map(async post => {
          // Example: Remove 'uploads\' from the beginning of postImage URL that is stored in Mongo
          const sanitizedPostImage = post.postImage.startsWith('uploads\\') ? post.postImage.substring(8) : post.postImage;
          
          // For comments
          const responseComment = await axios.get(
            `http://localhost:4000/getPostRootComments/${post._id}`
          );
          const rootComments = responseComment.data.postComments || [];
          dispatch(addComment({
                postId: post._id,
                comment: rootComments
          }));
          return {
            ...post,
            postImage: sanitizedPostImage
            // Add more sanitization or modifications as for the image storage, and storing them inside the Array "sanitizedPostImage" one by one.
          };
        }));

        dispatch(timelinePosts(sanitizedPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);
  // 3 variants of useState:
  // First one byDefault triggers, when our Application reloads, 
  // Second one reloads on depending upon the dependency "count", If count state is ChannelMergerNode, then this iseEffect will trigger
  // 3rd one reloads when a 
  // const [count, setCount] = useState(0)
  // useEffect(() =>{},[])
  // useEffect(() =>{},[count])
  // useEffect(() =>{},[dispatch])
  return (
    <div className='timeline'>
        <div className='timeline__left'>
            <div className='timeline__posts'>
                <Post />
            </div>
        </div>
        <div className='timeline__right'>
            <Suggestions/>
        </div>
    </div>
  )
}
export default Timeline;