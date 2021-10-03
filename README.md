# generic-json-sanitizer

Generic json sanitizer is very small generic json sanitizer with express middleware support using 'sanitize-html',
by walking on json tree and cleaning any string.

[![Build & Test Status](https://github.com/haimkastner/generic-json-sanitizer/workflows/generic-json-sanitizer/badge.svg?branch=master)](https://github.com/haimkastner/generic-json-sanitizer/actions)

## Install via NPM:

```bash 

npm install generic-json-sanitizer

```

The sanitizer using [sanitize-html](https://github.com/punkave/sanitize-html) API.
And sanitize option is [IOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/sanitize-html/index.d.ts).

> Pay attention! The async API uses the JS Worker Thread API- this means Node.JS >= 14 is required and may also cause issues with Webpack bundling.
This does NOT affect the synchronous API.

## Simple using.
```typescript

import { sanitizeJsonSync } from 'generic-json-sanitizer';

const dirtySchema: any = {
    a: 5555,
    b: '<script>alert("hello");</script>',
    c: {
        d: '<script>',
        e: 'hello,; : world--= :',
        f: 54435622
    },
    g: [
        '<script>alert("hello");</script> world',
        {
            h: 'hello <script>alert("world");</script>'
        }
    ]
};

const cleanOptions = {
    allowedAttributes: {},
    allowedTags: [],
}

/** Clean sync dirty schema */
sanitizeJsonSync(dirtySchema, cleanOptions)
console.log(`Sanitized schema: ${JSON.stringify(dirtySchema)}`);

/** Clean big schema async */
sanitizeJsonAsync(bigDirtySchema, cleanOptions)
    .then((sanitizeSchema: any) => {
        console.log(`Async Sanitized schema sample: ${JSON.stringify(sanitizeSchema[55])}`);
    });

```

## Using as express middleware

```typescript
import { sanitizeExpressMiddleware } from 'generic-json-sanitizer';
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
    })
}); 

```


> Async supports only from Node 13.

For real example see `src/example` folder.
