## Installing the PubNub Function to communicate with Watson.

The `pubnub-functions/watson.js` is code that allows the customer service chat to communicate with the Watson API. It is installed inside of a PubNub Function. PubNub Functions are serverless components that allow a developer to add functionality to realtime applications. A developer can intercept a PubNub message before it is published or react to one after it's delivered.

In this case, we will react after a message is published. To install:
1. If you haven't already, follow the steps in `/README.md`
2. If you haven't already, sign up for Watson assistant. When you are done, you will need:
    * The APIKey
    * The Assistant ID
2. In the PubNub admin panel, click the Functions link (probably to the left side).
3. If necessary, select your app.
4. Create a new module. The name is not important (maybe 'customer service chat').
5. Create a function inside the new module. 
    * Function name is up to you, I called it "Chat with Watson". 
    * Event type is `After publish or fire`. 
    * Channel name is `chatbot.*`.
6. Add APIKey and Assistant ID to PubNub Vault
    * Click "My Secrets" on the left side of your "Chat with Watson" module screen.
    * Add `apikey` for `Key` and your Watson APIkey as the `Value`
    * Add `assistant_id` for `Key` and your Watson assistant key as the `Value`
    * Close secrets.
7. Paste in the contents of `watson.js`.
8. Test from your application (On Glitch, see the 'Show' option at the top of the window.). If everything is working properly, you should see "Good day to you" when you open the chat in the lower left.