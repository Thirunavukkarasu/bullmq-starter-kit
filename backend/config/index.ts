import * as dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/.env" });
export const connection: any = {
  connection: {
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};
