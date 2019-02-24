import { sanitizeExpressMiddleware } from '../genericJsonSanitizer';
import express from 'express';

const app = express();

/** For default options */
app.use(sanitizeExpressMiddleware);

/** Set 'sanitize-html' options */
app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    sanitizeExpressMiddleware(request, response, next, {
        allowedAttributes: {},
        allowedTags: [],
    })
}); 