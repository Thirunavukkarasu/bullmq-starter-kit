import express from "express";

import { ExpressAdapter } from "@bull-board/express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import { facebookCommentsQueue } from "./config";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(facebookCommentsQueue)],
  serverAdapter: serverAdapter,
});

const app = express();
const PORT = process.env.PORT || 4000;
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(PORT, () => {
  console.log(`Started server in port ${PORT}`);
});
