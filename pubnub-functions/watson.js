/*
 * A PubNub Function (https://www.pubnub.com/products/functions/) to connect a PubNub client
 * to IBM's Watson assistant platform (https://www.ibm.com/cloud/watson-assistant/).
 * Uses the Vault vault module (https://www.pubnub.com/docs/blocks/vault-module) to hold api keys
 * Store Watson API Key in the Vault under "apikey" and your Watson assistant Id under "assistant_id"
 */

const vault = require('vault');
const pubnub = require('pubnub');
const xhr = require('xhr');
const query  = require('codec/query_string'); // for HTTP URL encoding
const basicAuth = require('codec/auth');

export default (request) => { 
    let textToSend = "";
    if (request.message.type === "clientToServer" && request.message.notice === "firstMessage") {
        textToSend = "Hello";
    } else if (request.message.type === "text" && request.message.authorType === "client") {
        textToSend = request.message.data.text;
    } else {
        return request.ok();
    }
    let channelToSend = request.channels[0];
    let watsonBody = {
        "input": {
            "message_type": "text",
            "text": textToSend,
            "options": {
                "alternate_intents": true,
                "debug": true
            }
        }
    }

    // Gets the keys from the vault and then put into an object that can be used.
    const getAPIKeys = new Promise((resolve, reject) => {
        vault.get('apikey').then((apikey) => {
            vault.get('assistant_id').then((assistant_id) => {
                resolve({
                    apiKey: apikey,
                    assistantId: assistant_id
                });
            });
        });
    });
    
    return getAPIKeys.then((keys) => {
        //console.log(keys);
        const watsonGetSessionAPIUrl = "https://gateway.watsonplatform.net/assistant/api/v2/assistants/" + keys.assistantId + "/sessions?version=2019-02-28";
        const authenticatedKeys = basicAuth.basic('apikey', keys.apiKey);
        var httpOptions = {
            'method'  : 'POST',
            'headers' : {
                'Authorization' : authenticatedKeys,
                'Content-Type': 'application/json'
            },
            timeout : 5000,  // max 1000 (10s)
        };
 
        
        return xhr.fetch(watsonGetSessionAPIUrl, httpOptions).then((x) => {
            const body = JSON.parse(x.body);
            const watsonWithSessionAPIUrl = "https://gateway.watsonplatform.net/assistant/api/v2/assistants/27865860-a8b7-4b6d-a434-eeefe60027e5/sessions/"+ body.session_id +"/message?version=2019-02-28";
            //console.log("watsonWithSessionAPIUrl: " + watsonWithSessionAPIUrl);
            return xhr.fetch(watsonWithSessionAPIUrl, {
                'method'  : 'POST',
                'headers' : {
                    'Authorization' : authenticatedKeys,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(watsonBody),
                'timeout' : 5000
            });
        }).then((reply) => {
            const responseBody = JSON.parse(reply.body);
            //console.log(responseBody)
            const responseType = responseBody.output.generic[0].response_type;
            //console.log ("response_type: " + responseType)
            if (responseType === "text") {
                const textToReturn = responseBody.output.generic[0].text;
                pubnub.publish ({
                    message:{
                        authorType: "received",
                        data: {
                            "text":textToReturn,
                            "wholeBody": responseBody
                        },
                        "type":"text"
                    },
                    channel: channelToSend
                });         
                return request.ok();
            } else {
                return request.ok();
            }
        }).catch((err) => {
            console.error(err);
            return request.abort();
        });
    
    })
}