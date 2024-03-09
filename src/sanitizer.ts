import { parentPort, workerData } from 'worker_threads';
import * as sanitizeHtml from 'sanitize-html';

/**
 * Objects in js/json are a tree of values, so the easy way to run on all tree is to run it in recursive.  
 * @param jsonSchema Json data to sanitize.
 * @param cleanOptions 'sanitize-html' options, for cleaning any string.
 */
 function recursiveJsonSchemaCleaner(jsonSchema: any, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) {

    /** If json is not an object, return. */
    if (!jsonSchema || typeof jsonSchema !== 'object') {
        return;
    }

    /** 
     * Iterate on each object / array value. (array is implementation of object.).
     * And if value is a string, clean it. that's all.
     */
    for (const [key, value] of Object.entries(jsonSchema)) {
        if (typeof value !== 'string') {
            recursiveJsonSchemaCleaner(value, cleanOptions);
        } else {
            jsonSchema[key] = sanitizeHtml(value, cleanOptions)
        }
    }
}

/**
 * Sanitize any json schema.
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
  */
export function sanitizeJson(jsonSchema: any, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) {
    recursiveJsonSchemaCleaner(jsonSchema, cleanOptions);
}

/** If using module as 'worker_threads' alloc json from 'workerData' and do work. */
if (workerData)
    sanitizeJson(workerData.jsonSchema, workerData.cleanOptions);
/** If there is a parent port, give it the result. */
if (parentPort)
    parentPort.postMessage(workerData.jsonSchema);