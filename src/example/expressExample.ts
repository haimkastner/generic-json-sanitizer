import { sanitizeExpressMiddleware, sanitizeExpressMiddlewareAsync } from '..';
import * as express from 'express';

const app = express();

/** For default options */
app.use(sanitizeExpressMiddleware);
/** To sanitize big schema, you can use async sanitizer */
app.use(sanitizeExpressMiddlewareAsync);


/** Set 'sanitize-html' options */
app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    sanitizeExpressMiddleware(request, response, next, {
        allowedAttributes: {},
        allowedTags: [],
    });
}); 