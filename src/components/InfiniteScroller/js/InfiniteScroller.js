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
    hasMore: true,
  };

  state = {
    refChildHeight: 0,
    showLoader: false,
  };

  constructor(props) {
    super(props);

    this.containerRef = createRef();
    this.scrollHandler = this.scrollHandler.bind(this);
    this.stateChanged = false;
  }

  componentDidMount() {
    const { initialLoad, loadMore, pageNumber } = this.props;
    this.containerRef.current.addEventListener('scroll', this.debounce(this.scrollHandler.bind(this, event), 200));

    if (initialLoad && loadMore && typeof loadMore === 'function') {
      loadMore(pageNumber);
    }
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener('scroll', this.scrollHandler.bind(this, event));
  }

  componentDidUpdate() {
    const { refChild, hasMore } = this.props;
    const { refChildHeight, showLoader } = this.state;

    if (refChild.current.clientHeight === refChildHeight && showLoader === false && hasMore) {
      this.setState({
        showLoader: true,
      });
    }

    if (refChild.current.clientHeight > this.containerRef.current.clientHeight && refChild.current.clientHeight > refChildHeight && showLoader === true && refChildHeight) {
      this.setState({
        showLoader: false,
      });
    }

    if (refChild.current.clientHeight < this.containerRef.current.clientHeight && hasMore && !this.stateChanged) {
      this.loadMoreData();

      this.setState({
        showLoader: true,
        refChildHeight: refChild.current.clientHeight,
      });

      this.stateChanged = true;
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this; const
        args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  shouldLoad() {
    const { hasMore, refChild } = this.props;

    return (hasMore && (this.containerRef.current.clientHeight + Math.round(this.containerRef.current.scrollTop) === refChild.current.clientHeight))
      || (hasMore && this.containerRef.current.clientHeight > refChild.current.clientHeight);
  }

  loadMoreData() {
    const { refChild, loadMore, pageNumber } = this.props;

    if (loadMore && typeof loadMore === 'function') {
      loadMore(pageNumber + 1);
    }
  }

  scrollHandler(event) {
    const { refChild } = this.props;

    if (this.shouldLoad()) {
      console.log('aaa');
      this.loadMoreData();
      this.setState({
        refChildHeight: refChild.current.clientHeight,
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
          ref={this.containerRef}
        >
          { this.props.children }
        </div>
        {
          showLoader
            ? (
              <Loader
                position="absolute"
              />
            )
            : null
        }
      </div>
    );
  }
}

export default InfiniteScroller;
