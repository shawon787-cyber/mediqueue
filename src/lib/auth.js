import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let client;
let clientPromise;

if (process.env.MONGODB_URI) {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
} else {
  clientPromise = Promise.resolve(null);
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: mongodbAdapter(client.db("mediquee")),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowSignUp: true,
    },
  },

  accountLinking: {
    enabled: true,
    trustedProviders: ["google"],
  },

  secret: process.env.BETTER_AUTH_SECRET,
});