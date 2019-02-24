import sanitizeHtml from 'sanitize-html';
import * as express from 'express';
/**
 * Sanitize any json schema.
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 */
export declare const sanitizeJsonSync: (jsonSchema: any, cleanOptions?: sanitizeHtml.IOptions | undefined) => Promise<void>;
/**
 * Sanitize any json schema async.
 * By walk on all json tree and cleaning an existing string.
 * note that 'experimental-worker' flag is on.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
 * @returns the sanitized json object.
 */
/**
 * Sanitize any request.body schema.
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
export declare const sanitizeExpressMiddleware: (request: express.Request, response: express.Response, next: express.NextFunction, cleanOptions?: sanitizeHtml.IOptions | undefined) => void;
/**
 * Sanitize any request.body schema async.
 * note that 'experimental-worker' flag is on.
 * @param request express request.
 * @param response express response.
 * @param next express next.
 * @param cleanOptions optional 'sanitize-html' lib options, if undefined using default.
 */
//# sourceMappingURL=genericJsonSanitizer.d.ts.map