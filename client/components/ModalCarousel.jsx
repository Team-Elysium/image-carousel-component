import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ModalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      mainImages: []
    };
    // Bind event handlers:
    this.selectNext = this.selectNext.bind(this);
    this.selectPrev = this.selectPrev.bind(this);
    this.selectByClick = this.selectByClick.bind(this);
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

  // Establish mainImages in component state when the first photos are passed
  // down as props. Because fetching photos requires an async API request, the
  // component will likely mount and render before a image is available
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.photos.length > 0 && prevState.mainImages.length === 0) {
      return {
        mainImages: [{ key: 0, url: nextProps.photos[0] }]
      };
    }
    return null;
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
    let newMainImages = this.state.mainImages.slice(-1);
    let prevKey = this.state.mainImages.slice(-1)[0].key;
    let newKey = prevKey + 1;
    newMainImages.unshift({ key: newKey, url: this.props.photos[photoIndex] });

    this.shiftThumbnails(photoIndex);

    this.setState({
      selected: photoIndex,
      mainImages: newMainImages
    });
  }

  render() {
    return (
      <div id="modal-carousel-body">
        <div className="modal-main-image-area">
          <ul className="modal-main-image-list">
            <ReactCSSTransitionGroup
              component={React.Fragment}
              transitionName="crossfade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={500}
            >
              {this.state.mainImages.reverse().map((e, i) => {
                return (
                  <li key={e.key} className="modal-main-image-list-item">
                    <img src={e.url} className="modal-main-image" />
                  </li>
                );
              })}
            </ReactCSSTransitionGroup>
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
          <div className="arrow-button-pointer-right" />
        </div>

        <div className="modal-carousel-thumb-container">
          <ul
            className="modal-thumb-list"
            style={{ left: this.state.thumbnailXShift }}
          >
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
            >
              <img src="/assets/images/floorplan-icon-modal.png" />
            </li>
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
