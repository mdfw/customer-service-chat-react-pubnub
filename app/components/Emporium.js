const React = require('react');
const PubNubBroker = require('./PubNubBroker');

/* the main page for the index route of this app */
class Emporium extends React.Component {
  
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let duck = params.get('duck');
    console.log(duck)
    return (
    <div>
      <h1>Duck Emporium</h1>

      <p>The largest rubber ducky selection on the internet.</p>
        
      <p>We have green ducks! We have brown ducks!</p>
        
      <p>To get our special price, you have to ask our assistant.</p>

      <PubNubBroker isAgentWindow={false} 
        />
      </div>)
  }
}
module.exports = Emporium;