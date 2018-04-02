import * as axios from 'axios';
import * as moment from 'moment';

//
// Following are potentially useful
//

export function createBuildInfoElement(style: string, baseUrl: string) {
    const divElement = document.createElement('div');
    divElement.classList.add(style);
    const commitInfo = `Commit: <a href="${baseUrl}${__VERSION__}">${__VERSION__}</a>`;
    const buildDate = `Build date: ${__BUILD__}`;
    divElement.innerHTML = `${commitInfo}<br/>${buildDate}`;
    return divElement;
}

//
// Url fetching
//

export class UrlFetcher {
    // Unfortunately, not all API set the origin, etc. http response header correctly
    // which may cause the request to fail with a denied permission to access.
    // The following are a few public CORS proxies that can add that request to any
    // url response that is used---basically a man-in-the-middle to add CORS.
    // Still not an ideal situation...
    private static CORS_PROXIES = [
        'http://cors-proxy.htmldriven.com/?url=',
        'https://cors-anywhere.herokuapp.com/'
    ];

    constructor(
        private readonly axiosImpl: axios.AxiosStatic = axios.default
    ) { }

    public fetchUrl<T>(url: string, proxyCors: boolean = false): Promise<T> {
        const targetUrl = proxyCors ? this.addCorsProxy(url) : url;
        return this.axiosImpl.get(targetUrl).then(response => response.data);
    }

    public addCorsProxy(url: string) {
        return `${UrlFetcher.CORS_PROXIES[1]}${url}`;
    }
}

//
// Date parsing
//

export class DateFormatter {
    public static fromUtcString(utcDateString: string, useLocal: boolean = true) {
        return new DateFormatter(moment.utc(utcDateString), useLocal);
    }

    private static DATE_FORMAT = 'YYYY-MM-DD';
    private static HOUR_FORMAT = 'HH:mm:ss';

    private readonly now: moment.Moment;

    constructor(now: moment.Moment = moment(), useLocal: boolean = true) {
        this.now = useLocal ? now.local() : now;
    }

    public getTodayAsString() {
        return this.now.format(DateFormatter.DATE_FORMAT);
    }

    public getHourAsString() {
        return this.now.format(DateFormatter.HOUR_FORMAT);
    }

    public getSecondsOfToday() {
        const midnight = this.now.clone().startOf('day');
        return this.now.diff(midnight, 'seconds');
    }

    public getDiffAsString(diffDays: number) {
        // all moments are mutable so we must copy
        return moment(this.now).add(diffDays, 'days').format(DateFormatter.DATE_FORMAT);
    }
}
