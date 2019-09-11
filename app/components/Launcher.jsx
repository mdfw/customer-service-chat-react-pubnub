const React = require('react');
const PropTypes = require('prop-types');
const ChatWindow = require('./ChatWindow');
const launcherIcon = 'https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Flogo-no-bg.svg?v=1566853645928';
const launcherIconActive = 'https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fclose-icon.png?v=1566853646326';
const PubNubReact = require('pubnub-react');

class Launcher extends React.Component {
  
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      launcherIcon,
      isOpen: false,
    };
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];
    return (
      <div>
        <div className={classList.join(' ')} onClick={this.handleClick}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={"sc-open-icon"} src={launcherIconActive} />
          <img className={"sc-closed-icon"} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onUserInputSubmit}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          onKeyPress={this.props.onKeyPress}
          onKeyPressDebounce={this.props.onKeyPressDebounce}
          onDelete={this.props.onDelete}
        />
        
      </div>
    );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) { return null }
  return (
    <div className={"sc-new-messsages-count"}>
      {props.count}
    </div>
  )
}

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  onKeyPress: PropTypes.func,
  onDelete: PropTypes.func
};

Launcher.defaultProps = {
  newMessagesCount: 0
}

module.exports = Launcher;