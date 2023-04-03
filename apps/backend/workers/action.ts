import { Worker } from "bullmq";
import { connection } from "../config";

export const worker = new Worker(
  "action",
  async (job) => {
    const { flowId } = job.data;

    console.log(flowId);
  },
  connection
);

worker.on("completed", (job) => {
  console.info(`JOB ID: ${job.id} - FLOW ID: ${job.data.flowId} has started!`);
});

worker.on("failed", (job: any, err) => {
  console.info(
    `JOB ID: ${job.id} - FLOW ID: ${job.data.flowId} has failed to start with ${err.message}`
  );
});

process.on("SIGTERM", async () => {
  await worker.close();
});
