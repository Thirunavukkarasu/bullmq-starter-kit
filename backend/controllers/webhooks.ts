import { triggerQueue } from "../queues";

export const webhookHandler = async (req: any, res: any) => {
  const message = req.body.message || "User Onboarded";
  const userEmail = req.body.email || "tamilan.arasu@gmail.com";
  await triggerQueue.add(`job`, { message, userEmail });

  return res.json({ message: "Receieved" });
};
