const React = require('react');
const closeIcon = "https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fclose-icon.png?v=1566853646326";

class Header extends React.Component {

  render() {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

module.exports = Header;