import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class ModalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      mainImages: [{ key: 0, url: "" }]
    };
    // Bind event handlers:
    this.selectNext = this.selectNext.bind(this);
    this.selectPrev = this.selectPrev.bind(this);
    this.selectByClick = this.selectByClick.bind(this);
  }

    componentWillMount() {
      let newMainImages = [];
      let prevKey = this.state.mainImages.slice(-1)[0].key;
      let newKey = prevKey + 1;
      newMainImages.unshift({ key: newKey, url: this.props.photos[this.props.startImageIndex] });

      this.setState({
        selected: this.props.startImageIndex,
        mainImages: newMainImages
      });
    }

  componentDidMount() {
    // Attach global event listeners
    document.onkeyup = key => {
      if (key.key === 'ArrowLeft') {
        return this.selectPrev();
      }
      if (key.key === 'ArrowRight') {
        return this.selectNext();
      }
    };
  }

  selectByClick(event) {
    let selection = parseInt(event.target.dataset.thumbId);
    this.updateMain(selection);
  }

  selectNext() {
    let selection =
      this.state.selected === this.props.photos.length - 1
        ? 0
        : this.state.selected + 1;
    this.updateMain(selection);
  }

  selectPrev() {
    let selection =
      this.state.selected === 0
        ? this.props.photos.length - 1
        : this.state.selected - 1;
    this.updateMain(selection);
  }

  updateMain(photoIndex) {
    if (photoIndex === this.state.selected) return;
    let newMainImages = [];
    let prevKey = this.state.mainImages.slice(-1)[0].key;
    let newKey = prevKey + 1;
    newMainImages.unshift({ key: newKey, url: this.props.photos[photoIndex] });

    this.setState({
      selected: photoIndex,
      mainImages: newMainImages
    });
  }

  render() {
    return (
      <div id="modal-carousel-body">
        <div className="modal-overlay" onClick={this.props.modalToggleOff} />
        <div className="modal-main-image-area">
          <ul className="modal-main-image-list">
            <TransitionGroup>
              {this.state.mainImages.reverse().map(e => (
                <CSSTransition
                  key={e.key}
                  classNames="crossfade"
                  timeout={{ enter: 300, exit: 500 }}
                >
                  <li className="modal-main-image-list-item">
                    <img src={e.url} className="modal-main-image" />
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
        </div>

        <div
          className="modal-arrow-button modal-arrow-left"
          onClick={this.selectPrev}
        >
          <div className="modal-arrow-button-pointer-left" />
        </div>
        <div
          className="modal-arrow-button modal-arrow-right"
          onClick={this.selectNext}
        >
          <div className="modal-arrow-button-pointer-right" />
        </div>

        <div className="modal-carousel-thumb-container">
          <ul className="modal-thumb-list">
            {!this.props.photos
              ? null
              : this.props.photos.slice(0, -2).map((e, i) => {
                  return (
                    <li className="modal-thumb-item" key={i}>
                      <img
                        className={
                          i === this.state.selected
                            ? 'modal-thumb-image modal-thumb-selected'
                            : 'modal-thumb-image'
                        }
                        src={e}
                        onClick={this.selectByClick}
                        data-thumb-id={i}
                      />
                    </li>
                  );
                })}
            <li
              className="modal-floor-plan-button"
              data-thumb-id={this.props.photos.length - 2}
              onClick={this.selectByClick}
            />
            <li className="modal-map-button">
              <img
                src={this.props.map ? this.props.map : null}
                data-thumb-id={this.props.photos.length - 1}
                onClick={this.selectByClick}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ModalCarousel;
