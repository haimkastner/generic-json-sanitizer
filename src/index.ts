import * as sanitizeHtml from 'sanitize-html';
import * as express from 'express';
import { sanitizeJson } from './sanitizer';
import { Worker } from 'worker_threads';

/**
 * Sanitize any json schema. 
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 */
export function sanitizeJsonSync(jsonSchema: any, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) {
    sanitizeJson(jsonSchema, cleanOptions);
}

/**
 * Sanitize any json schema async. 
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 * @returns the sanitized json object.
 */
export async function sanitizeJsonAsync(jsonSchema: Object, cleanOptions: sanitizeHtml.IOptions | undefined = undefined): Promise<Object> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__dirname + '/sanitizer.js', { workerData: { jsonSchema, cleanOptions } });
        worker.on('message', (sanitizedSchema: Object) => {
            resolve(sanitizedSchema)
        })
        worker.on('error', reject);
        worker.on('exit', (code: number) => {
            if (code != 0)
                console.error(new Error(`Worker stopped with exit code ${code}`))
        });
    });
}

/**
 * Sanitize any request.body schema.
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
export function sanitizeExpressMiddleware(request: express.Request, response: express.Response, next: express.NextFunction, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) {

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
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
export async function sanitizeExpressMiddlewareAsync(request: express.Request, response: express.Response, next: express.NextFunction, cleanOptions: sanitizeHtml.IOptions | undefined = undefined) {

    if (typeof request.body !== 'string') {
        request.body = await sanitizeJsonAsync(request.body, cleanOptions);
    } else {
        /** 
         * 'SanitizeValidJson' assume that parameter is passing by ref.
         * So if schema is string, the original request string will not changed.
         */
        const schema = { body: request.body };
        const sanitizedSchema = await sanitizeJsonAsync(schema, cleanOptions) as any;
        request.body = sanitizedSchema.body;
    }
    next();
};