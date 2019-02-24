"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genericJsonSanitizer_1 = require("../genericJsonSanitizer");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
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