"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("@bull-board/express");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const api_1 = require("@bull-board/api");
const config_1 = require("./config");
const serverAdapter = new express_2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(config_1.facebookCommentsQueue)],
    serverAdapter: serverAdapter,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use("/admin/queues", serverAdapter.getRouter());
app.listen(PORT, () => {
    console.log(`Started server in port ${PORT}`);
});
