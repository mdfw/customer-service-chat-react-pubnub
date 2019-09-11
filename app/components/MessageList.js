const React = require('react');
const Message = require('./Messages');

class MessageList extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render () {
    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={i} onDelete={this.props.onDelete} />
        })}
      </div>)
  }
}

module.exports = MessageList;