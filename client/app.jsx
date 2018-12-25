import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      photoCount: 0
    };
    // Bind event handlers here:
    this.selectNext = this.selectNext.bind(this);
    this.selectPrev = this.selectPrev.bind(this);
    this.select = this.select.bind(this);
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

    // Attach global event listeners
    document.onkeyup = (key) => {
      if (key.key === "ArrowLeft") {
        return this.selectPrev();
      }
      if (key.key === "ArrowRight") {
        return this.selectNext();
      }
    };
  }

  select(event) {
    let selection = parseInt(event.target.dataset.thumbId);

    console.log('thumb id', selection);

    this.setState({
      selected: selection
    })
  }

  selectNext() {
    let selection = this.state.selected === this.state.photoCount ? 0 : this.state.selected - 1;

    this.setState({
      selected: (this.state.selected + 1) % this.state.photoCount
    })
  }

  selectPrev() {
    let selection = this.state.selected === 0 ? this.state.photoCount - 1 : this.state.selected - 1;

    this.setState({
      selected: selection
    })
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

        <div className="arrow-button-left" onClick={this.selectPrev}></div>
        <div className="arrow-button-right" onClick={this.selectNext}></div>

        <div className="carousel-container">

          <ul className="thumb-list">
            {!this.state.photos
              ? null
              : this.state.photos.slice(0,-2).map((e, i) => {
                  return (
                    <li className="thumb-item" key={i}>
                      <img className={i === this.state.selected ? 'thumb-image thumb-selected'  : 'thumb-image'}
                      src={e}
                      onClick={this.select}
                      data-thumb-id={i}
                      />
                    </li>
                  );
                })}
          </ul>

          <div className="carousel-counter">
            <p>{this.state.selected + 1} of {!!this.state.photos ? this.state.photoCount : '0'}</p>
          </div>

          <div className="button-container">

            <div className="floor-plan-button">
              <span className="button-text" data-thumb-id={this.state.photoCount - 2} onClick={this.select}>
                Floor Plan
              </span>
            </div>

            <div className="map-button">
              <img src={this.state.map ? this.state.map : null} data-thumb-id={this.state.photoCount - 1} onClick={this.select} />
            </div>

          </div>

        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
