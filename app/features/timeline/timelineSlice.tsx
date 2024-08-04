import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

// Updated interfaces to match component types
interface PostType {
    _id: string;
    postImage: string;
    postText: string;
    userName: string;
    postLikes: number;
    timestamp: string;
}

interface CommentType {
    _id: string;
    postId: string;
    rootMessage: string;
    userName: string;
    rootCommentLikes: number;
    timestamp: string;
}

interface TimelineState {
    posts: PostType[];
    comments: CommentType[];
}

const initialState: TimelineState = {
    posts: [],
    comments: []
};

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        timelinePosts: (state, action: PayloadAction<PostType>) => {
            state.posts.push(action.payload);
        },
        addComment: (state, action: PayloadAction<{ postId: string; comment: CommentType }>) => {
            const { postId, comment } = action.payload;
            state.comments.push(comment);
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(comment => comment._id !== action.payload);
        }
    }
});

export const { timelinePosts, addComment, deleteComment } = timelineSlice.actions;

export default timelineSlice.reducer;
