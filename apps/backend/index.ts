import express from "express";
import * as config from "./config";
import { ExpressAdapter } from "@bull-board/express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import triggerQueue from "./queues/trigger";
import {
  simpleWebhookHandler,
  complexWebhookHandler,
  randomWebhookHandler,
} from "./controllers/webhooks";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(triggerQueue)],
  serverAdapter: serverAdapter,
});

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/admin/queues", serverAdapter.getRouter());
app.post("/webhook/simple", simpleWebhookHandler);
app.post("/webhook/complex", complexWebhookHandler);
app.post("/webhook/random", randomWebhookHandler);

app.listen(PORT, () => {
  console.log(`Started server in port ${PORT}`);
});
