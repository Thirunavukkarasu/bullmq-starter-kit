import { Queue } from "bullmq";
import { connection } from "../config";

export const triggerQueue = new Queue("trigger", connection);

export const actionQueue = new Queue("action", connection);

export const flowsQueue = new Queue("flow", connection);
