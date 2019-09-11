const React = require('react');
const TextMessage = require('./TextMessage');
const themIconUrl = "https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fduckemporium-thumb.svg?v=1567023369176";
const infoIconUrl = "https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fnoun_Information_2171847.svg?v=1567035630582";

class Message extends React.Component {

  _renderMessageOfType(type) {
    switch (type) {
      case 'text':
        return <TextMessage message={this.props.message} onDelete={this.props.onDelete} />
    }
  }

  render() {
    let contentClassList = ["sc-message--content"];
    let avatarURL = themIconUrl;
    if (this.props.message.authorType === "client") {
      contentClassList = ["sc-message--content","sent"];
    } else if (this.props.message.authorType === "system") {
      contentClassList = ["sc-message--content","system"];
      avatarURL = infoIconUrl;
    } else {
        contentClassList = ["sc-message--content","received"];
    }
    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          <div className="sc-message--avatar" style={{
            backgroundImage: `url(${avatarURL})`
          }}></div>
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>)
  }
}

module.exports = Message;