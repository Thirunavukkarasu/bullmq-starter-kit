import process from "process";
import { Queue } from "bullmq";
import { connection } from "../config";

const CONNECTION_REFUSED = "ECONNREFUSED";

const flowQueue = new Queue("flow", connection);

process.on("SIGTERM", async () => {
  await flowQueue.close();
});

flowQueue.on("error", (err) => {
  if ((err as any).code === CONNECTION_REFUSED) {
    console.error("Make sure you have installed Redis and it is running.", err);
    process.exit();
  }
});

export default flowQueue;
