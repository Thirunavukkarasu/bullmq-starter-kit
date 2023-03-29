import * as dotenv from "dotenv";
import { Queue } from "bullmq";

dotenv.config({ path: process.cwd() + "/.env" });
export const connection: any = {
  connection: {
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

export const facebookCommentsQueue = new Queue(
  "facebook-comments-queue",
  connection
);
