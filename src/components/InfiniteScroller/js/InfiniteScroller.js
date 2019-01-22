import React, { Component, createRef } from 'react';
import { PropTypes } from 'prop-types';

import { Loader } from '../../Loader';

class InfiniteScroller extends Component {
  static propTypes = {
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    pageNumber: PropTypes.number,
    loadMore: PropTypes.func,
  };

  static defaultProps = {
    hasMore: true
   };

  state = {
    refChildHeight: 0,
    showLoader: false
  };

  constructor(props) {
    super(props);

    this.containerRef = createRef();
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidMount() {
    const { initialLoad, loadMore, pageNumber } = this.props;
    this.containerRef.current.addEventListener('scroll', this.debounce(this.scrollHandler.bind(this, event), 200));

    if(initialLoad && loadMore && typeof loadMore === 'function') {
      loadMore(pageNumber);
    }
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener('scroll', this.scrollHandler.bind(this, event));
  }

  componentDidUpdate() {
    const { refChild } = this.props;
    const { refChildHeight, showLoader } = this.state;

    if(refChild.current.clientHeight === refChildHeight && showLoader === false) {
      this.setState({
        showLoader: true
      });
    }

    if(refChild.current.clientHeight !== refChildHeight && showLoader === true) {
      this.setState({
        showLoader: false
      });
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = () => {
      timeout = null;
      if (!immediate) {
          func.apply(context, args);
        }
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  shouldLoad() {
    const { hasMore, refChild } = this.props;

    return hasMore && (this.containerRef.current.clientHeight + this.containerRef.current.scrollTop === refChild.current.clientHeight);
  }

  scrollHandler(event) {
    const { refChild, loadMore, pageNumber } = this.props;

    if(this.shouldLoad()) {
      if(loadMore && typeof loadMore === 'function') {
        loadMore(pageNumber + 1);
      }

      this.setState({
        refChildHeight: refChild.current.clientHeight
      });
    }
  }

  render() {
    const { showLoader } = this.state;
    return (
      <div
        className="tyk-infinite-scroller"
      >
        <div
          className="tyk-infinite-scroller__wrapper"
          ref={ this.containerRef }
        >
        { this.props.children }
        </div>
        {
          showLoader
            ? <Loader
                position="absolute"
              />
            : null
        }
      </div>
    );
  }
}

export default InfiniteScroller;
