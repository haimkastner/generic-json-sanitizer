# generic-json-sanitizer

Generic json sanitizer is very small generic json sanitizer with express middleware support using 'sanitize-html',
by walking on json tree and cleaning any string.

## Install via NPM:

```bash 

npm install generic-json-sanitizer

```

The sanitizer using [sanitize-html](https://github.com/punkave/sanitize-html) API.
And sanitize option is [IOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/sanitize-html/index.d.ts).

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

```

## Using as express middleware

```typescript
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

```


Async support is readt and wait for awesome 'experimental-worker' to be done.

For real example see `example` folder.
