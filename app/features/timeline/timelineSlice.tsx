import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    comments: []
};

export const timelineSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        timelinePosts: (state, action) => {
            const posts = {
                    id: nanoid(),
                    text: action.payload,
                }
                state.posts.push(posts)  // Set the posts directly
        },
        addComment: (state, action) => {
            
            const { postId, comment} = action.payload;
            const comments = {
                postId: postId,
                text: comment,
            };
            state.comments.push(comments);
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        }
    }
});
//Here the timeSlice has multiple actions like timelinePosts,..,etc. And we are destructuring that and storing them in a variable
export const {timelinePosts, addComment, deleteComment } = timelineSlice.actions

export default timelineSlice.reducer