import 'jasmine';
import { hello } from '../print';

const TARGET: string = 'Hello world!';

console.log(`HELLO FROM SPEC ${TARGET}`);

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = hello();
        expect(result).toEqual(TARGET);
    });
});
