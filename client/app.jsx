import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    // Bind event handlers here:
  }

  componentDidMount() {
    let listingNumber = window.location.pathname.slice('/').split('/')[1];
    // Make call to API with listingNumber
    fetch(`../api/${listingNumber}`)
      .then(data => {
        // console.log(data.body);
        // window.d = data;
        return data.json();
      })
      .then(json => {
        let newState = json;
        this.setState(newState);
      });
  }

  render() {
    return (
      <div id="carousel">
        <img
          className="selected"
          src={
            this.state.photos ? this.state.photos[this.state.selected] : null
          }
        />
        <div className="carousel-container">
          <ul className="thumb-list">
            {!this.state.photos
              ? null
              : this.state.photos.map((e, i) => {
                  return (
                    <li className="thumb-item" key={i}>
                      <img className={i === this.state.selected ? 'thumb-image thumb-selected' : 'thumb-image'} src={e} />
                      {/* <img className={"thumb-image " + i} src={e} /> */}
                    </li>
                  );
                })}
          </ul>
          <div className="button-container">
            <div className="floor-plan-button">
              <span className="button-text">
                <img src="/assets/images/floorplan-icon.svg" />
                <p>Floor Plan</p>
              </span>
            </div>
            <div className="map-button">
              <img src={this.state.map ? this.state.map : null} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
