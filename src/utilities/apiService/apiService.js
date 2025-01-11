const BASE_URL = 'https://openainavigator.azurewebsites.net/api/{endPoint}?code=aJHzLvHHSfN6OlnFc2MzlyKPc-mvw17QRdc2E5Se7-TcAzFuat7l1g=='; // Replace with your base API URL

/**
 * Generic function to make GET requests.
 * @param {string} endpoint - The API endpoint to fetch.
 * @returns {Promise} - Resolves to the API response data.
 */
export async function fetchGet(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
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

/**
 * Generic function to make POST requests.
 * @param {string} endpoint - The API endpoint to post to.
 * @param {Object} body - The payload to send in the request.
 * @returns {Promise} - Resolves to the API response data.
 */
export async function fetchPost(endpoint, body) {
    var thisresponse={success: false, message: null}
    var reqUrl;
    try {
        reqUrl=BASE_URL.replace('{endPoint}', endpoint);
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
        console.log(`POST Request failed: ${response.status} ${response.statusText}`);
        thisresponse = await response.json();
        console.log(`fetchPost thisresponse: ${thisresponse}`)
        thisresponse.success=true;
    } catch (error) {
        thisresponse={success: false, message: `POST Request failed on catch: ${error.message}`};
    }
    return thisresponse;
}

