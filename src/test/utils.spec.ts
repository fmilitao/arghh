import axios from 'axios';
import 'jasmine';
import * as moment from 'moment';
import * as utils from '../utils';

console.log('Test runner.');
Promise.resolve('Promises work in tests!').then(console.log);

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
    it('should fetch a url', done => {
        const fakeUrl = 'hello/how/are/you?';
        spyOn(axios, 'get').and.callFake((url: string) => Promise.resolve({data: url}));
        const urlFetcher = new utils.UrlFetcher(axios);
        urlFetcher.fetchUrl(fakeUrl).then(result => {
            expect(axios.get).toHaveBeenCalled();
            expect(result).toEqual(fakeUrl);
            done();
        });
    });
});

describe('utils.DateFormatter', () => {
    const testMoment = moment('2017-08-08');
    const formatter = new utils.DateFormatter(testMoment);

    it('should format hours as HH:mm:ss', () => {
        const time = utils.DateFormatter.fromUtcString('2017-08-08 20:31:12', false);
        expect(time.getHourAsString()).toEqual('20:31:12');
    });

    it('should format today as YYYY-MM-DD', () => {
        expect(formatter.getTodayAsString()).toEqual('2017-08-08');
    });
    it('should format future dates as YYYY-MM-DD', () => {
        expect(formatter.getDiffAsString(1)).toEqual('2017-08-09');
        expect(formatter.getDiffAsString(2)).toEqual('2017-08-10');
    });
    it('should format current date as YYYY-MM-DD', () => {
        expect(formatter.getDiffAsString(0)).toEqual('2017-08-08');
    });
    it('should format past dates as YYYY-MM-DD', () => {
        expect(formatter.getDiffAsString(-2)).toEqual('2017-08-06');
        expect(formatter.getDiffAsString(-1)).toEqual('2017-08-07');
    });

    it('should parse UTC string dates', () => {
        const value = utils.DateFormatter.fromUtcString('2018-02-28T07:43:35+00:00');
        expect(value.getTodayAsString()).toEqual('2018-02-28');
    });

    [
        { date: '2018-01-21T00:00:00', expected: 0 },
        { date: '2018-01-21T00:01:00', expected: 60 },
        { date: '2018-01-21T23:59:59', expected: (24 * 60 * 60 - 1) }
    ].forEach(({ date, expected }) => {
        it(`should get ${expected} seconds since start of day ${date}`, () => {
            const value = utils.DateFormatter.fromUtcString(date);
            expect(value.getSecondsOfToday()).toEqual(expected);
        });
    });
});
