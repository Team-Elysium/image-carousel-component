import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import MainCarousel from './components/MainCarousel.jsx';
// import MainCarousel from './components/ModalCarousel.jsx'

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showModal: false
    };

    this.modalToggleOn = this.modalToggleOn.bind(this);
    this.modalToggleOff = this.modalToggleOff.bind(this);
  }

  componentDidMount() {
    let listingNumber = window.location.pathname.slice('/').split('/')[1];
    // Make call to API with listingNumber
    fetch(`../api/carousel/${listingNumber}`)
      .then(data => {
        return data.json();
      })
      .then(json => {
        let newState = json;
        newState.photos.push(json.floorPlan);
        newState.photos.push(json.map);
        this.setState(newState);
      });
  }

  modalToggleOn() {
    this.setState({
      showModal: true
    });
  }

  modalToggleOff() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <MainCarousel photos={this.state.photos} map={this.state.map} />
        {/* <ModalCarousel photos={this.state.photos} /> */}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Carousel />, document.getElementById('carousel'));
