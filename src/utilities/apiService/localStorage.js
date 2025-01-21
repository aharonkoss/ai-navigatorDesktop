export function getSavedValues() {
    try {
    const encryptainavvalues = localStorage.getItem('ainavvalues');
    if(encryptainavvalues!=undefined) {
            const ainavvalues=JSON.parse(decode(encryptainavvalues));
                return ainavvalues;
    } else {
        return {saved: false, message: 'No Values Saved'}
    }
  } catch(error) {
       console.log(`getLoginInfo() error is ${error.message}`);
  }
}
export function setSavedValues(savedObj) {
         try {   
            
            const strObj=encode(JSON.stringify(savedObj));
            localStorage.setItem('ainavvalues', strObj);
            console.log(`setSavedValues() savedObj ${JSON.stringify(savedObj)}`);
            return true;
         } catch(error) {
            console.log(`setSavedValues() error is ${error.message}`);
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