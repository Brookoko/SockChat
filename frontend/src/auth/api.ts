export type APIResponse = {
    status: number,
    body: any
};

export function api_request(url: string, method: string = 'GET', data?: any): Promise<APIResponse | undefined> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, `http://localhost:8080/${url}`);
        if (data !== undefined) {
            req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            data = JSON.stringify(data);
        }
        req.setRequestHeader('x-api-token', localStorage.authToken);
        req.setRequestHeader('Accept', 'application/json;');
        req.send(data);

        req.onload = () => {
            resolve({ status: req.status, body: JSON.parse(req.responseText) })
        };
    });
};

export function api_request_fetch(input: RequestInfo, info?: RequestInit | undefined): Promise<Response | undefined> {
    return fetch(input, info)
      .then(res => {
          if (res.status === 401) {
              window.location.href = '/auth';
              localStorage.authorized = false;
              return undefined;
          }

          return res;
      });
};