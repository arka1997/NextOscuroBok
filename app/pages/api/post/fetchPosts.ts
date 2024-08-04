
// pages/api/post/fetchPosts.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

interface Post {
  _id: string;
  postImage: string;
  postText: string;
  userName: string;
  postLikes: number;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('OscurobookDB');
      const postsCollection = db.collection('posts');
      // Fetch posts from the collection
      const posts: Post[] = await postsCollection.find({}).toArray();

      // Optionally sanitize the data if needed
      // posts = posts.map(post => ({
      //   ...post,
      //   postImage: sanitizeImagePath(post.postImage),
      // }));

      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Error fetching posts' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
