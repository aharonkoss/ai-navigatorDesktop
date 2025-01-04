const BASE_URL = 'https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/'; // Replace with your base API URL

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
    var auth={};
    var thisresponse={success: false, message: null}
    try {
        auth=getSalesforceAccessToken();
        console.log(`auth: ${JSON.stringify(auth)}`);
        if(auth.success) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth.access_token
            },
            body: JSON.stringify(body),
        });
       
        if (!response.ok) {
            thisresponse={success: false, message: `POST Request failed: ${response.status} ${response.statusText}`}
        }
        thisresponse = await response.json();
        thisresponse.success=true;
    } else {
        thisresponse={success: false, message: `Authentication to Salesforce Failed: ${auth.message}`}
    }
    } catch (error) {
        thisresponse={success: false, message: `POST Request failed on catch: ${error.message}`};
    }
    return thisresponse;
}
async function getSalesforceAccessToken() {
    const clientId = '3MVG9JJwBBbcN47JWtNnxb2WxGpuru2eXunu.omitS.9Ae4s7SlPigW_rqD.JqUVn0ZgaRkO.LozffGTItwQ4';
    const clientSecret = 'D1B6F5C03AB3853F3FA61E57C05B997D0B8DA3757D59916BA009E5A6CCE92146';
    const username = 'ronbuck@ainavigator.com';
    const password = 'NavigationAi@7';
    const tokenUrl = 'https://login.salesforce.com/services/oauth2/token';
    var accessToken={};
    const body = {
                    grant_type: 'password',
                    client_id: clientId,
                    client_secret: clientSecret,
                    username: username,
                    password: password,
                  };
    try {
        const response = await fetch(`https://login.salesforce.com/services/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            accessToken = {access_token: null, success: false, message: `Auth POST Request failed: ${response.status} ${response.statusText}`};
        }
        accessToken = await response.json();
        accessToken.success=true;
        accessToken.error='Authentication Succeeded!'
    } catch (error) {
        accessToken = {access_token: null, success: false, message: error.message};
    }
        return accessToken;
  }

