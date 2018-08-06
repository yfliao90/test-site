const assert = require('assert');

const sum = require('../hello');

describe('#async hello.js', () => {

    describe('#asyncCalculate()', () => {

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });
        
    });
});