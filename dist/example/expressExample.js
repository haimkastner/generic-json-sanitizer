"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericJsonSanitizer_1 = require("../genericJsonSanitizer");
const express = require("express");
const app = express();
/** For default options */
app.use(genericJsonSanitizer_1.sanitizeExpressMiddleware);
/** Set 'sanitize-html' options */
app.use((request, response, next) => {
    genericJsonSanitizer_1.sanitizeExpressMiddleware(request, response, next, {
        allowedAttributes: {},
        allowedTags: [],
    });
});
//# sourceMappingURL=expressExample.js.map