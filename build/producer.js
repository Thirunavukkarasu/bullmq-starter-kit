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
exports.startProducer = void 0;
const config_1 = require("./config");
function startProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        const noOfMessages = process.argv[2];
        console.log(noOfMessages);
        const data = {
            message: "Hello there",
            user: "11dante",
        };
        for (let i = 0; i < parseInt(noOfMessages); i++) {
            yield config_1.facebookCommentsQueue.add(`job-${i}`, data);
        }
        process.exit();
    });
}
exports.startProducer = startProducer;
startProducer();
