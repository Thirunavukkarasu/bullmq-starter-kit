import prisma from "../config/prisma";
import emailQueue from "../queues/emailQueue";

export const sendMessage = async (req: any, res: any) => {
  const message = req.body.message;
  const userEmail = req.body.email;
  const jobName = `Job ${Math.floor(Math.random() * 1000)}`;
  // await prisma.flow.create({
  //   data: {
  //     name: flowName,
  //     active: true,
  //     publishedAt: new Date(),
  //   },
  // });
  await emailQueue.add(jobName, { message, userEmail });

  return res.json({ message: "Message Receieved" });
};

