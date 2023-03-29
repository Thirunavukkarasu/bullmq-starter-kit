import { Worker } from "bullmq";
import { connection } from "./config";

export function startConsumer() {
  const worker = new Worker(
    "facebook-comments-queue",
    async (job) => {
      console.log("Job Done", job.data);
    },
    connection
  );
  ``;

  worker.on("completed", (job: any) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job: any, err: any) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });
}

startConsumer();
