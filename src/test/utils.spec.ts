import axios from 'Axios';
import 'jasmine';
import * as utils from '../utils';

const TARGET: string = 'Hello world!';

console.log(`HELLO FROM SPEC ${TARGET}`);

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = utils.hello();
        expect(result).toEqual(TARGET);
    });
});

describe('utils.createBuildInfoElement', () => {
    it('should add style and commit url', () => {
        const customStyle = 'custom';
        const customUrl = 'url';
        const div = utils.createBuildInfoElement(customStyle, customUrl);
        expect(div.classList.contains(customStyle)).toEqual(true);
        const references = div.getElementsByTagName('a');
        expect(references.length).toEqual(1);
        const item = references[0];
        expect(item.href).toContain(customUrl);
    });
    it('should add build version and date', () => {
        const div = utils.createBuildInfoElement('style', 'url');
        expect(div.innerHTML).toContain(__VERSION__);
        expect(div.innerHTML).toContain(__BUILD__);
    });
});

describe('utils.UrlFetcher', () => {
    it('should ??', () => {
        spyOn(axios, 'get').and.callFake((url: string) => {
            console.log(url);
            return { then: () => ({ catch: () => { } }) };
        });
        const urlFetcher = new utils.UrlFetcher(axios);
        urlFetcher.fetchUrl('asd', console.log);

        expect(axios.get).toHaveBeenCalled();
    });
});
