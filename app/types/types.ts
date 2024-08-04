// types.ts
export interface PostType {
  _id: string;
  postImage: string;
  postText: string;
  userName: string;
  postLikes: number;
  timestamp: string;
}

export interface CommentType {
  _id: string;
  postId: string;
  rootMessage: string;
  userName: string;
  rootCommentLikes: number;
  timestamp: string;
}
