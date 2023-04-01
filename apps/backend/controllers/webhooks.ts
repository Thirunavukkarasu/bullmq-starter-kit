import { triggerQueue } from "../queues";

export const simpleWebhookHandler = async (req: any, res: any) => {
  const message = req.body.message || "User Onboarded";
  const userEmail = req.body.email || "tamilan.arasu@gmail.com";
  await triggerQueue.add(`simple-job`, { message, userEmail });

  return res.json({ message: "Receieved" });
};

export const complexWebhookHandler = async (req: any, res: any) => {
  const message = req.body.message || "User Onboarded";
  const userEmail = req.body.email || "tamilan.arasu@gmail.com";
  await triggerQueue.add(`complex-job`, { message, userEmail });

  return res.json({ message: "Receieved" });
};

export const randomWebhookHandler = async (req: any, res: any) => {
  const message = req.body.message || "User Onboarded";
  const userEmail = req.body.email || "tamilan.arasu@gmail.com";
  await triggerQueue.add(`random-job`, { message, userEmail });

  return res.json({ message: "Receieved" });
};
