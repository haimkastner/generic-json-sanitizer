"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Waiting to experimental-worker to be done.
// import { parentPort, workerData } from 'worker_threads';
const sanitize_html_1 = __importDefault(require("sanitize-html"));
/**
 * Objects in js/json are a tree of values, so the easy way to run on all tree is to run it in recursive.
 * @param jsonSchema Json data to sanitize.
 * @param cleanOptions 'sanitize-html' options, for cleaning any string.
 */
const recursiveJsonSchemaCleaner = (jsonSchema, cleanOptions = undefined) => {
    /** If json is not an object, return. */
    if (typeof jsonSchema !== 'object') {
        return;
    }
    /**
     * Iterate on each object / array value. (array is implementation of object.).
     * And if value is a string, clean it. that's all.
     */
    for (const [key, value] of Object.entries(jsonSchema)) {
        if (typeof value !== 'string') {
            recursiveJsonSchemaCleaner(value, cleanOptions);
        }
        else {
            jsonSchema[key] = sanitize_html_1.default(value, cleanOptions);
        }
    }
};
/**
 * Sanitize any json schema.
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
  */
exports.sanitizeJson = (jsonSchema, cleanOptions = undefined) => {
    recursiveJsonSchemaCleaner(jsonSchema, cleanOptions);
};
/** If using module as 'worker_threads' alloc json from 'workerData' and do work. */
// Waiting to experimental-worker to be done.
// if (workerData)
//     sanitizeJson(workerData.jsonSchema, workerData.cleanOptions);
// /** If there is a parent port, give it result. */
// if (parentPort)
//     parentPort.postMessage(workerData.jsonSchema);
//# sourceMappingURL=backgroundSanitizer.js.map