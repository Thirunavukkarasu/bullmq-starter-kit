import { Worker } from "bullmq";
import { connection } from "../config";

export function startWorker() {
  const worker = new Worker(
    "trigger",
    async (job) => {
      console.log("Job Done", job.data);
      return {
        message: "Email Journey for user started!",
      };
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

startWorker();
