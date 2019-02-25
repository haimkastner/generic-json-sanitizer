import * as sanitizeHtml from 'sanitize-html';
/**
 * Sanitize any json schema.
 * By walk on all json tree and cleaning an existing string.
 * @param jsonSchema Json to sanitize.
 * @param cleanOptions 'sanitize-html' lib options.
  */
export declare const sanitizeJson: (jsonSchema: any, cleanOptions?: sanitizeHtml.IOptions | undefined) => void;
/** If using module as 'worker_threads' alloc json from 'workerData' and do work. */
//# sourceMappingURL=backgroundSanitizer.d.ts.map