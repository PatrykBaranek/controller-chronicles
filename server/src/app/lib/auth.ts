import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { openAPI } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import { EventEmitter } from 'events';

export const authEvents = new EventEmitter();

let auth: any = null;
let db: any = null;

export async function initializeAuth() {
  if (auth) {
    return auth;
  }

  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  db = client.db();

  auth = betterAuth({
    database: mongodbAdapter(db),
    databaseHooks: {},
    emailAndPassword: {
      enabled: true,
      sendResetPassword: ({ user, url }) => {
        authEvents.emit('reset-password', { email: user.email, link: url });
        return Promise.resolve();
      },
    },
    emailVerification: {
      sendVerificationEmail: ({ user, url }) => {
        authEvents.emit('verify-email', { email: user.email, link: url });
        return Promise.resolve();
      },
    },
    socialProviders: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID!,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      },
    },
    plugins: [openAPI()],
    basePath: '/api/auth',
    trustedOrigins: [process.env.FRONTEND_URL!],
  });

  return auth;
}

export function getAuth() {
  if (!auth) {
    throw new Error(
      'Auth not initialized. Call initializeAuth() before getAuth().',
    );
  }
  return auth as ReturnType<typeof betterAuth>;
}

export function getDb() {
  if (!db) {
    throw new Error(
      'Auth not initialized. Call initializeAuth() before getDb().',
    );
  }
  return db;
}
