const BASE_URL = 'https://openainavigator.azurewebsites.net/api/{endPoint}?code={code}'; // Replace with your base API URL
/**
 * Generic function to make GET requests.
 * @param {string} endpoint - The API endpoint to fetch.
 * @returns {Promise} - Resolves to the API response data.
 */
export async function fetchGet(endpoint,params,code) {
    try {
        const response = await fetch(`https://openainavigator.azurewebsites.net/api/${endpoint}?code=${code}${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`GET Request failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in fetchGet:', error);
        throw error;
    }
}
export async function fetchGetAzure(body) {
    var thisresponse={success: false, message: null}
    var reqUrl='https://openainavigator.azurewebsites.net/api/httpGetReq?code=3z6LJZqcEeCnCz17q9xf57u-cBWB8I9nxLYqrbHNAbedAzFuqmNt1Q==';
    try {
        console.log(`fetchGetAzure body: ${JSON.stringify(body)}`);
        console.log(`fetchGetAzure reqUrl: ${reqUrl}`);
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
       
        if (!response.ok) {
            thisresponse={success: false, message: `POST Request failed: ${response.status} ${response.statusText}`}
        }
        console.log(`POST Request success: ${response.status} ${response.statusText}`);
        thisresponse = await response.json();
        console.log(`fetchGetAzure fetchPost thisresponse: ${thisresponse}`)
    } catch (error) {
        thisresponse={success: false, message: `POST Request failed on catch: ${error.message}`};
    }
    return thisresponse;
}

/**
 * Generic function to make POST requests.
 * @param {string} endpoint - The API endpoint to post to.
 * @param {Object} body - The payload to send in the request.
 * @returns {Promise} - Resolves to the API response data.
 */
export async function fetchPost(endpoint, body, code) {
    var thisresponse={success: false, message: null}
    var reqUrl;
    try {
        reqUrl=BASE_URL.replace('{endPoint}', endpoint)
                       .replace('{code}',code);
        console.log(`body: ${JSON.stringify(body)}`);
        console.log(`reqUrl: ${reqUrl}`);
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
       
        if (!response.ok) {
            thisresponse={success: false, message: `POST Request failed: ${response.status} ${response.statusText}`}
        }
        console.log(`POST Request success! ${response.status} ${response.statusText}`);
        thisresponse = await response.json();
        console.log(`fetchPost thisresponse: ${JSON.stringify(thisresponse)}`)
    } catch (error) {
        thisresponse={success: false, message: `POST Request failed on catch: ${error.message}`};
    }
    return thisresponse;
}
export async function fetchPostAzure(body) {
    var thisresponse={success: false, message: null}
    var reqUrl='https://openainavigator.azurewebsites.net/api/httpPostReq?code=cUcyvMCemt0SrEeRohL0Z6a1_1FHvKpmOxZsMSu00KfaAzFu9ieQhA==';
    try {
        console.log(`body: ${JSON.stringify(body)}`);
        console.log(`reqUrl: ${reqUrl}`);
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
       
        if (!response.ok) {
            thisresponse={success: false, message: `POST Request failed: ${response.status} ${response.statusText}`}
        }
        console.log(`POST Request success: ${response.status} ${response.statusText}`);
        thisresponse = await response.json();
        console.log(`fetchPost thisresponse: ${thisresponse}`)
    } catch (error) {
        thisresponse={success: false, message: `POST Request failed on catch: ${error.message}`};
    }
    return thisresponse;
}
export function encode(data) {
    return btoa(data); // Use btoa to encode the data
  }
