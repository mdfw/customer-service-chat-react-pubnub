const React = require('react');
const WhiteTelephone = require('./WhiteTelephone');

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

      <WhiteTelephone />
      </div>)
  }
}
module.exports = Emporium;