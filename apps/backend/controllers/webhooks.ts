import prisma from "../config/prisma";
import triggerQueue from "../queues/trigger";

export const simpleWebhookHandler = async (req: any, res: any) => {
  const message = req.body.message || "User Onboarded";
  const userEmail = req.body.email || "tamilan.arasu@gmail.com";
  const flowName = `Flow ${Math.floor(Math.random() * 1000)}`;
  // await prisma.flow.create({
  //   data: {
  //     name: flowName,
  //     active: true,
  //     publishedAt: new Date(),
  //   },
  // });
  await triggerQueue.add(`${flowName}-trigger`, { message, userEmail });

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
