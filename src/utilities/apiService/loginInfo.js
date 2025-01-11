export function getLoginInfo() {
    const now = new Date();
    try {
    const encryptainavuser = localStorage.getItem('ainavuser');
    if(encryptainavuser!=undefined) {
        
            const ainavuser=JSON.parse(decode(encryptainavuser));
            if (now.getTime() > ainavuser.expireDate) {
                localStorage.removeItem('ainavuser');
                return {authenticated: false, message: 'User has expired.'}
            } else {
                return ainavuser;
            }

    } else {
        return {authenticated: false, message: 'User is not authenticated.'}
    }
  } catch(error) {
       console.log(`getLoginInfo() error is ${error.message}`);
  }
}
export function setLoginInfo(loginObject) {
          const now = new Date();
          const twoDays = 2 * 24 * 60 * 60 * 1000;
         try {   
            loginObject.authenticated=true;
            loginObject.expireDate=now.getTime() + twoDays;
            const strLogin=encode(JSON.stringify(loginObject));
            localStorage.setItem('ainavuser', strLogin);
            console.log(`setLoginInfo() loginObject ${JSON.stringify(loginObject)}`);
            return true;
         } catch(error) {
            console.log(`setLoginInfo() error is ${error.message}`);
            return false;
         }
}

function encode(data) {
    return btoa(data); // Use btoa to encode the data
  }

  // Decrypt (decode) data
  function decode(data) {
    return atob(data); // Use atob to decode the data
  }