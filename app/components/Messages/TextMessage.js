const React = require('react');
const Component = require('react');

const TextMessage = (props) => {
  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  const authorType = props.message.authorType
  return (
    <div className="sc-message--text">
      {text}
      {meta && <p className='sc-message--meta'>{meta}</p>}
    </div>
    )
}

module.exports = TextMessage;