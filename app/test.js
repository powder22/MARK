let { SmartAPI, WebSocket } = require("smartapi-javascript");

let smart_api = new SmartAPI({
    api_key: "smartapi_key",    // PROVIDE YOUR API KEY HERE
     // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor. 
    // access_token: "YOUR_ACCESS_TOKEN",
    // refresh_token: "YOUR_REFRESH_TOKEN"
});

// If user does not have valid access token and refresh token then use generateSession method 
smart_api.generateSession("R384596", "Boopathi@1")
    .then((data) => {
        var errorCount = 0;
        setInterval(() => {
            smart_api.getPosition().then((response) => {
                errorCount = 0;
                var realised = 0;
                var nonrealised = 0;
                response.data.forEach(pos => {
                    if(pos.pnl == pos.realised){
                        realised += Number(pos.pnl);
                    }
                    else{
                        nonrealised += Number(pos.pnl);
                    }
                });
                console.log("realised : "+realised);
                console.log("non-realised : "+nonrealised);
                if(realised+nonrealised > 7000){
                    window.alert('error');
                }
            }).catch(ex =>{
                if(errorCount < 10){
                    errorCount++;
                }
                else{
                    console.error(ex)
                }
            }); 
        }, 3000);

        smart_api.getHolding().then((response) => {
            console.log(response);
        });

    })
    .catch(ex => {
        console.error(ex);
    })

    // TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
    smart_api.setSessionExpiryHook(customSessionHook);

    function customSessionHook() {
        console.log("User loggedout");
        
        // NEW AUTHENTICATION CAN TAKE PLACE HERE
    }