const React = require('react');
const PropTypes = require('prop-types');
const MessageList = require('./MessageList');
const UserInput = require('./UserInput');
const Header = require('./Header');


class ChatWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let messageList = this.props.messageList || []
    let classList = [
      "sc-chat-window",
      (this.props.isOpen ? "opened" : "closed")
    ]
    return (
      <div className={classList.join(' ')}>
       <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />
       <MessageList
          messages={messageList}
          imageUrl={this.props.agentProfile.imageUrl}
        />
        <UserInput
          onSubmit={this.props.onUserInputSubmit}
          onKeyPress={this.props.onKeyPress} />
      </div>
    )
  }
}

ChatWindow.propTypes = {
  onKeyPress: PropTypes.func,
  messageList: PropTypes.array,
}

module.exports = ChatWindow;