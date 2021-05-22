import { sanitizeJsonAsync, sanitizeJsonSync } from '..';

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


const bigDirtySchema: any = {};
for (let i = 0; i < 30000; i++) {
    bigDirtySchema[i] = {
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
};

/** Clean big schema async */
sanitizeJsonAsync(bigDirtySchema, cleanOptions)
    .then((sanitizeSchema: any) => {
        console.log(`Async Sanitized schema sample: ${JSON.stringify(sanitizeSchema[55])}`);
    });
