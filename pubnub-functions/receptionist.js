// Install as a PubNub function using After Publish
// Channel is "lobby.*" <- Wildcards to respond to any lobby.[uuid] items.


export default (request) => { 
    const xhr = require('xhr');
    const pubnub = require('pubnub');

    console.log('request',request); // Log the request envelope passed 
    if (request.message.type === "serverNotice" && request.message.notice === "firstMessage") {
        pubnub.publish({
            message:{
                authorType: "system",
                data: {
                    "text":"Wecome to customer support. Our office is closed, but I will route you to Duckworth, our customer service bot for help. One moment."
                },
                "type":"text"
            },
            channel: request.message.sendingChannel
        })
    }
    return request.ok(); // Return a promise when you're done 
}