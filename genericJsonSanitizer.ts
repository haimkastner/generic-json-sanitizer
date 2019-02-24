import sanitizeHtml from 'sanitize-html';
import * as express from 'express';
import { sanitizeJson } from './backgroundSanitizer';

// Waiting to experimental-worker to be done.
// import { Worker } from 'worker_threads';

/**
 * Sanitize any json schema. 
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 */
export const sanitizeJsonSync = async (jsonSchema: any, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) => {
    sanitizeJson(jsonSchema, cleanOptions);
}

/**
 * Sanitize any json schema async. 
 * By walk on all json tree and cleaning an existing string.
 * note that 'experimental-worker' flag is on. 
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 * @returns the sanitized json object.
 */
// Waiting to experimental-worker to be done.
// export const sanitizeJsonAsync = async (jsonSchema: Object, cleanOptions: sanitizeHtml.IOptions | undefined = undefined): Promise<Object> => {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker(__dirname + '/backgroundSanitizer.js', { workerData: { jsonSchema, cleanOptions } });
//         worker.on('message', (sanitizedSchema: Object) => {
//             resolve(sanitizedSchema)
//         })
//         worker.on('error', reject);
//         worker.on('exit', (code: number) => {
//             if (code != 0)
//                 console.error(new Error(`Worker stopped with exit code ${code}`))
//         });
//     });
// }

/**
 * Sanitize any request.body schema.
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
export const sanitizeExpressMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) => {

    if (typeof request.body !== 'string') {
        sanitizeJson(request.body, cleanOptions);
    } else {
        /** 
         * 'SanitizeValidJson' assume that parameter is passing by ref.
         * So if schema is string, the original request string will not changed.
         */
        const schema = { body: request.body };
        sanitizeJson(schema, cleanOptions);
        request.body = schema.body;
    }
    next();
};

/**
 * Sanitize any request.body schema async.
 * note that 'experimental-worker' flag is on.
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
// Waiting to experimental-worker to be done.
// export const sanitizeExpressMiddlewareAsync = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

//     if (typeof request.body !== 'string') {
//         request.body = await sanitizeJsonAsync(request.body);
//     } else {
//         /** 
//          * 'SanitizeValidJson' assume that parameter is passing by ref.
//          * So if schema is string, the original request string will not changed.
//          */
//         const schema = { body: request.body };
//         const sanitizedSchema = await sanitizeJsonAsync(schema) as any;
//         request.body = sanitizedSchema.body;
//     }
//     next();
// };