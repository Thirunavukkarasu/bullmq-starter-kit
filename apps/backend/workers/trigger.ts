import { Worker } from "bullmq";
import { EmailClient } from "emails";
import { connection } from "../config";

export const worker = new Worker(
  "trigger",
  async (job) => {
    try {
      if (process.env.RESEND_API_KEY) {
        const emailClient = new EmailClient({
          apikey: process.env.RESEND_API_KEY,
          imagesBaseUrl: "",
          from: "tnav@codosphere.com",
          replyTo: "tnav@codosphere.com",
        });

        await emailClient.send({
          email: "welcome",
          name: "Thiru",
          to: "tamilan.arasu@gmail.com",
        });
      }

      console.log("Job Done", job.data);
      return {
        message: "Email Journey for user started!",
      };
    } catch (e) {
      console.log("Error", e);
      throw e;
    }
  },
  connection
);

worker.on("completed", (job: any) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job: any, err: any) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

process.on("SIGTERM", async () => {
  await worker.close();
});
