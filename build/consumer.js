"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = void 0;
const bullmq_1 = require("bullmq");
const config_1 = require("./config");
function startConsumer() {
    const worker = new bullmq_1.Worker("facebook-comments-queue", (job) => __awaiter(this, void 0, void 0, function* () {
        console.log("Job Done", job.data);
    }), config_1.connection);
    ``;
    worker.on("completed", (job) => {
        console.log(`${job.id} has completed!`);
    });
    worker.on("failed", (job, err) => {
        console.log(`${job.id} has failed with ${err.message}`);
    });
}
exports.startConsumer = startConsumer;
startConsumer();
