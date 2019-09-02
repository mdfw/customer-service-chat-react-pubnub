const React = require('react');
const PropTypes = require('prop-types');
const render = require('react-dom');
const SendIcon = require('./icons/SendIcon');
const closeIcon = "https://cdn.glitch.com/36a1e4e9-2b09-43ea-8db4-b5b7259cbb0a%2Fclose.svg?v=1566853646248";
const _ = require('lodash');

class UserInput extends React.Component {

  constructor() {
    super()
    this.state = {
      inputActive: false,
    }
    this.handleKeyPress = _.debounce(this.handleKeyPress.bind(this),1000)
    this.handleKey = this.handleKey.bind(this)

  } 

  handleKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  handleKeyPress() {
    //console.log(this.userInput.textContent);
  }

  _submitText(event) {
    event.preventDefault()
    const text = this.userInput.textContent
    if (text && text.length > 0) {
      this.props.onSubmit({
        authorType: 'client',
        type: 'text',
        data: { text }
      })
      this.userInput.innerHTML = ''
    }
  }

  render() {
    return (
      <div>
        <form className={`sc-user-input ${(this.state.inputActive ? 'active' : '')}`}>
          <div
            role="button"
            tabIndex="0"
            onFocus={() => { this.setState({ inputActive: true }) }}
            onBlur={() => { this.setState({ inputActive: false }) }}
            ref={(e) => { this.userInput = e }}
            onKeyDown={this.handleKey}
            onKeyPress={this.handleKeyPress}
            contentEditable="true"
            placeholder="Write a reply..."
            className="sc-user-input--text"
          >
          </div>
          <div className="sc-user-input--buttons">
            <div className="sc-user-input--button">
              <SendIcon onClick={this._submitText.bind(this)} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

UserInput.defaultProps = {
}

module.exports = UserInput;