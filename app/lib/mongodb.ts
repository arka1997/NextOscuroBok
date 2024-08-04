// lib/mongodb.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'your_mongodb_connection_string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid multiple connections
  let globalClient: MongoClient | undefined = (global as any)._mongoClient;
  if (!globalClient) {
    globalClient = client;
    (global as any)._mongoClient = globalClient;
  }
  clientPromise = Promise.resolve(globalClient);
} else {
  clientPromise = client.connect();
}

export default clientPromise;
