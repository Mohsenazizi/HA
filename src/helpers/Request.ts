// ToDo : change any for fetch options, params
//ToDo: how to check content-type
export type ResponseResultType<T> = Response['body'] | T | null;

export type RequestResultType<T> =  {
    headers: Response['headers'];
    status: Response['status'];
    data: ResponseResultType<T>;
}

export  class Request {
    baseUrl: string;
    config: object;
    constructor (baseUrl: string, config = {}) {
        this.baseUrl = baseUrl;
        this.config = config;
    }
    
     async makeRequest<T>(endpoint?: string, options?: any): Promise<RequestResultType<T>> {   
       

        const response: Response = await fetch(`${this.baseUrl }${endpoint?endpoint:''}`, options);
        const result: RequestResultType<T> = {
            headers: response.headers,
            status: response.status,
            data: null
        };
            console.log(response.headers.get('content-type'))
        if (response.headers.get('content-type')?.includes('json')) {
            const json: T = await response.json();
            result.data = json;
        } else {
            result.data = response.body;
        }

        if (response.ok) {
            return result;
        }

        return Promise.reject(result);
    } 
    
     createBody(body: object) {
        if (typeof body === 'object' && body !== null) {
            return JSON.stringify(body)
        } 
        return body;
    }

    get<T>(endpoint?: string, params?: { [key: string | number]: string }) {
        let path = endpoint;

        if (params) {
            const query = new URLSearchParams(params);
            path += `?${query.toString()}`;
        }

        return this.makeRequest<T>(path);
    } 
}
