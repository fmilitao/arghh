import * as axios from 'axios';

//
// Following are just test
//

export function printMe() {
    console.log('I get called from print.js!');
}

console.log('hello from "utils.ts"!!');

export const hello = () => 'Hello world!';

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

    public fetchUrl(url: string, proxyCors: boolean = false): Promise<string> {
        const targetUrl = proxyCors ? this.addCorsProxy(url) : url;
        return this.axiosImpl.get(targetUrl).then(response => response.data);
    }

    public addCorsProxy(url: string) {
        return `${UrlFetcher.CORS_PROXIES[1]}${url}`;
    }
}
