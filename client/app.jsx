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
        return data.json();
      })
      .then(json => {
        let newState = json;
        newState.photos.push(json.floorPlan);
        newState.photos.push(json.map);
        newState.photoCount = json.photos.length;
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
        <div className="arrow-button-left"></div>
        <div className="arrow-button-right"></div>
        <div className="carousel-container">
          <ul className="thumb-list">
            {!this.state.photos
              ? null
              : this.state.photos.map((e, i) => {
                  return (
                    <li className="thumb-item" key={i}>
                      <img className={i === this.state.selected ? 'thumb-image thumb-selected'  : 'thumb-image'} src={e} />
                    </li>
                  );
                })}
          </ul>
          <div className="carousel-counter">
            <p>{this.state.selected + 1} of {!!this.state.photos ? this.state.photoCount : '0'}</p>
          </div>
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
