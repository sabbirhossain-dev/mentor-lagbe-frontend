import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is missing!");
}

const client = new MongoClient(uri);
const db = client.db("Mentor-Lagbe");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
});