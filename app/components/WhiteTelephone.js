const React = require('react');
const PropTypes = require('prop-types');
const Launcher = require('./Launcher');
const PubNubReact = require('pubnub-react');

let keys = require('../../.data/pubnubkeys.json');


class WhiteTelephone extends React.Component {
  //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  uidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      messageList: [], 
      connectedToPubNub: false,
      isOpen: false,
      newMessageCount: 0,
    };
    this._handleClick = this._handleClick.bind(this);
    this.onUserInputSubmit = this.onUserInputSubmit.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  onUserInputSubmit(theMessage) {
    console.log(theMessage);
    this.publishToPubNub(theMessage);
  }
  
  publishToPubNub(theMessage) {
    this.pubnub.publish({
        message: theMessage,
        channel: this.customChannel,
    })
  }
  
  onMessageReceived(messageEnvelope) {
    console.log("Received a messageEnvelope")
    console.log(messageEnvelope)
    let message = messageEnvelope.message;
    if (message.type === "text") {
      this.addMessageToChatWindow(message);
    }
  }
    
  addMessageToChatWindow(message) {
    let newMessageList = this.state.messageList;
    newMessageList.push(message)
    this.setState({ messageList: newMessageList })
  }
  
  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: this.customChannel
    });
  }

  componentDidUpdate() {
    if (this.state.isOpen && !this.state.connectedToPubNub) {
      this.connectToPubNub();
    }
  }
  
  connectToPubNub() {
    if (this.state.connectedToPubNub) {
      return;
    }; 
    this.uuid = this.uidv4();
    this.customChannel = "lobby." + this.uuid;
    console.log("Custom channel: " + this.customChannel)
    this.pubnub = new PubNubReact({
      publishKey: keys.PUBNUBPUB,
      subscribeKey: keys.PUBNUBSUB,
      uuid: this.uuid
    });
    this.pubnub.addListener({
      status: (st) => {
        if (st.category === "PNUnknownCategory") {
          var newState = {new: 'error'};
          this.pubnub.setState(
            {
              state: newState
            },
            function (status) {
              console.log(st.errorData.message);
            }
          );
        }  
      },
      message: (messageEnvelope) => {
        this.onMessageReceived(messageEnvelope);
      }
    });

    this.pubnub.subscribe({
      channels: [this.customChannel],
      withPresence: true
    });

    this.addMessageToChatWindow({ 
      "authorType":"system", 
       "data": {
         "text": "Welcome to customer service. Your custom channel is " + this.customChannel +". Someone will be right with you."
       }, 
       "type": "text"
    })

    this.state.connectedToPubNub = true;  
    this.sendFirstMessage();
  }
  
  sendFirstMessage() {
    this.publishToPubNub({
      "type": "serverNotice",
      "notice": "firstMessage",
      "sendingChannel": this.customChannel
    });
  }
  
  render() {
    let classList = [
      "sc-chat-window",
      (this.props.isOpen ? "opened" : "closed")
    ]
    return (
      <Launcher
        agentProfile={{
          teamName: 'Duck Emporium',
          imageUrl: 'https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fduckemporium-thumb.svg?v=1567023369176'
        }}
        newMessagesCount={0}
        handleClick={this._handleClick}
        isOpen={this.state.isOpen}
        messageList={this.state.messageList}
        onUserInputSubmit={this.onUserInputSubmit}
      />
    )
  }
}

WhiteTelephone.propTypes = {

}

module.exports = WhiteTelephone;