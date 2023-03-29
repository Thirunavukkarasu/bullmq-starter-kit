import { facebookCommentsQueue } from "./config";

export async function startProducer() {
  const noOfMessages = process.argv[2];
  console.log(noOfMessages);
  const data = {
    message: "Hello there",
    user: "11dante",
  };

  for (let i = 0; i < parseInt(noOfMessages); i++) {
    await facebookCommentsQueue.add(`job-${i}`, data);
  }

  process.exit();
}

startProducer();
