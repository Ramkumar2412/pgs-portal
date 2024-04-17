import { debounce, isEmpty } from 'lodash';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import progressToast, { toast } from 'react-hot-toast';

import AuthService from './authService';

const DEFAULT_TIMEOUT = 40000;
const TYPE_JSON = 'application/json';

const fnGetFileNameFromContentDispostionHeader = (header) => {
  let fileName = 'downloaded.csv';
  if (isEmpty(header)) {
    return fileName;
  }

  const contentDisposition = header.split(';');
  const fileNameToken = `filename*=UTF-8''`;

  // eslint-disable-next-line no-restricted-syntax
  for (const thisValue of contentDisposition) {
    if (thisValue.trim().indexOf(fileNameToken) === 0) {
      fileName = decodeURIComponent(thisValue.trim().replace(fileNameToken, ''));
      break;
    }
  }

  return fileName;
};

const ErrorToast = debounce((message) => {
  progressToast.error(message);
}, 1000);

const APIService = {
  _getJsonData(data) {
    return isString(data) ? data : JSON.stringify(data);
  },

  async request(options, cb = noop) {
    /**
     * Validating Token
     */
    // const tokenExp = isTokenExpired();
    // const refreshToken = AuthService._getRefreshToken();
    // if (tokenExp && refreshToken) await getAccessToken(refreshToken);
    // if (tokenExp && !refreshToken) {
    //   return;
    // }

    const { url, method = 'GET', data, customHeaders, isNonServiceCall, fileName, isFileData = false } = options;

    let dataWithStoreAndTerminal = data;
    let urlWithStoreAndTerminal = url;

    console.log('fff', dataWithStoreAndTerminal, urlWithStoreAndTerminal);

    let headers = {
      Accept: 'application/json',
      
    };

    if (!isFileData) {
      headers['Content-Type'] = TYPE_JSON;
    }
    /**
     * Attaching Bearer token
     */
    headers = {
      ...headers,
      ...{
        AuthCode: AuthService.getAuthCode(),
        accessToken:AuthService._getAccessToken(),
       
      },
    };
    if (customHeaders) {
      headers = { ...headers, ...customHeaders };
    }

    let fetchOptions = {
      method,
      headers,
      body:
        headers['Content-Type'] === TYPE_JSON && !isFileData
          ? this._getJsonData(dataWithStoreAndTerminal)
          : dataWithStoreAndTerminal,
      params: { format_type: 'json' },
      mode: isNonServiceCall ? 'cors' : 'no-cors',
    };

    if (fileName) {
      fetchOptions.fileName = fileName;
    }

    if (!isNonServiceCall) {
      fetchOptions = { ...fetchOptions, mode: 'cors' };
    }

    this._fetch(urlWithStoreAndTerminal, fetchOptions, cb);
  },

  _fetchWithTimeout(url, options, cb, timeout = DEFAULT_TIMEOUT) {
    console.groupCollapsed('Request');
    console.log('%cpayload', 'color:#2E8B57;', options);
    console.groupEnd();
    return Promise.race([
      fetch(url, options, cb),
      new Promise((resolve, reject) =>
        setTimeout(
          () =>
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: 900,
              detail: 'Connection Timeout, Please check your Internet',
            }),
          timeout
        )
      ),
    ]);
  },

  _fetch(url, options, cb) {
    let response;
    this._fetchWithTimeout(url, options, cb)
      .then((serverResponse) => {
        response = serverResponse;
        console.groupCollapsed('Response');
        console.log('serverResponse', serverResponse);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          if (response.status === 204) {
            return '{}';
          }
          return serverResponse.json();
        }
        if (contentType && contentType.indexOf('text/csv') !== -1) {
          return response.blob();
        }
        return serverResponse.text();
      })
      .then((parsedResponse) => {
        console.log('parsed Response', parsedResponse);
        console.log('Status Code ', response.status);
        console.groupEnd();

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('text/csv') !== -1) {
          const fileURL = window.URL.createObjectURL(parsedResponse);
          const a = document.createElement('a');
          a.href = fileURL;
          a.download =
            options.fileName || fnGetFileNameFromContentDispostionHeader(response.headers.get('content-disposition'));
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); // afterwards we remove the element again
        }

        const { status } = response;
        // If it is not success then respond with error on the response status
        if (includes([200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210], response.status)) {
          return cb(null, parsedResponse);
        }
        if (!includes([200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 400, 404], response.status)) {
          console.log(parsedResponse.message || 'Error Occurred');
        }
        if (status === 400) {
          console.log(parsedResponse);
          toast.error(get(parsedResponse, "0.ErrDesc"));
          if (response?.message === 'Oops! ID not found') {
            console.log('ID Not found');
          } else {
            console.log('Bad Request', parsedResponse);
          }
        }
        if (status === 404) {
          if (response?.statusText === 'Not found') {
            console.log('Not Found');
            AuthService.goto404();
          } else {
            console.log('Not Found', response);
          }
        }
        if (status === 403) {
          console.log('You do not have permission to do this operation');
        }
        if (status === 401) {
          console.log('This is an authenticated URL show login screen');
          AuthService.logout();
          return cb({ detail: 'Contact Administrator', response: { ...parsedResponse } });
        }
        return cb(
          {
            status: response.status,
            statusText: response.statusText,
            message: get(parsedResponse, 'message'),

            error_code: get(parsedResponse, 'error_code'),
            errorResponse: parsedResponse,
          },
          parsedResponse
        );
      })
      .catch((err) => {
        console.groupCollapsed('Error');
        console.log('API Request Error', err);
        console.groupEnd();
        cb(err);
      });
  },
  /**
   * General purpose fetch
   * @param {*} url
   * @param {*} params
   * @param {*} cb
   */
  fetch(url, params, cb) {
    let response;
    this._fetchWithTimeout(url, params, cb)
      .then((serverResponse) => {
        response = serverResponse;
        console.log('serverResponse', serverResponse);
        if (includes(url, 's3.')) {
          return { message: 's3 uploaded' };
        }
        return serverResponse.json();
      })
      .then((parsedResponse) => {
        console.log('fetch -> parsedResponse', parsedResponse);
        if (includes([200, 201], response.status)) {
          return cb(null, parsedResponse);
        }
        if (!includes([200, 201], response.status)) {
          console.log(parsedResponse.message || 'Error Occurred');
        }

        return cb(
          {
            status: response.status,
            statusText: response.statusText,
            detail: parsedResponse.message,
            error_code: parsedResponse.code,
          },
          parsedResponse
        );
      })
      .catch((err) => {
        console.log('API Request Error', err);
        cb(err);
      });
  },
  fetchJSON(path) {
    return fetch(path)
      .then((data) => data.text())
      .then((res) => {
        return JSON.parse(res);
      });
  },
  /**
   * Used to download file from other URLS
   * @param {*} url
   */
  fetchBlobURL(blobURL, fileName = 'file', extension = 'csv') {
    fetch(blobURL, {
      method: 'GET',
      headers: { 'Content-Security-Policy': 'upgrade-insecure-requests' },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.${extension}`;
        document.body.appendChild(a); // to Support Firefox
        a.click();
        a.remove(); // afterwards we remove the element again
      });
  },
  fetchImage(url, params, cb) {
    let response;
    this._fetchWithTimeout(url, params, cb)
      .then((serverResponse) => {
        response = serverResponse;
        console.log('serverResponse', serverResponse);
        return serverResponse.blob();
      })
      .then((parsedResponse) => {
        console.log('fetch -> parsedResponse', parsedResponse);
        if (includes([200, 201], response.status)) {
          return cb(null, parsedResponse);
        }
        if (!includes([200, 201], response.status)) {
          console.log(parsedResponse.message || 'Error Occurred');
        }
        return cb(
          {
            status: response.status,
            statusText: response.statusText,
            detail: parsedResponse.message,
            error_code: parsedResponse.code,
          },
          parsedResponse
        );
      })
      .catch((err) => {
        console.log('API Request Error', err);
        cb(err);
      });
  },
};
export default APIService;
