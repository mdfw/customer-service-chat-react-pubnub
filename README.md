# Pop-up from the corner style customer service chat front end

The React front end for a "customer service style" chat that pops up from the bottom right of the screen. The chat functionality is provided by PubNub's realtime data network. The Chatbot is powered by Watson assistant. 

Uses 
* [PubNub](https://pubnub.com?devrel_glitch=cust-sv-chat) to provide realtime connections between chat, PubNub Functions and Watson.
* [PubNub Functions](https://www.pubnub.com/products/functions/) for intercepting chat traffic and routing it to the Watson service.
* [IBM's Watson](https://www.ibm.com/cloud/watson-assistant/) assistant for chatbot.

## Remix on Glitch
This project is available to remix on Glitch at [https://glitch.com/~customer-service-chat-react](https://glitch.com/~customer-service-chat-react). To 'remix' a copy for yourself:
1. Make a copy ('remix') of this Glitch.
2. Sign up for a free PubNub Account and get publish and subscribe keys for the resulting demo account.

<a href="https://dashboard.pubnub.com/signup?devrel_glitch=cust-sv-chat)">
    <img alt="PubNub Signup" src="https://i.imgur.com/og5DDjf.png" width=260 height=97/>
</a>

3. Make a copy of the `pubnubkeys-temporary.json` file to `.data/pubnubkeys.json`. Click the 3 dots to the right of the temporary file for the `duplicate` command.
4. Replace `Your publish key here` and `Your subscribe key here` with the PubNub keys given in the Pubnub admin panel. 
5. Follow the instructions in [pubnub-functions/installing-watson-function.md](https://glitch.com/edit/#!/customer-service-chat?path=pubnub-functions/installing-watson-function.md)


### Acknowledgements

Interface based on React Beautiful Chat [https://github.com/mattmezza/react-beautiful-chat](https://github.com/mattmezza/react-beautiful-chat#example)

Icon: Duck by Martin from the Noun Project

Icon: Information by Jean from the Noun Project