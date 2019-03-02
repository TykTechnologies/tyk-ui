import React, { Component, createRef } from 'react';
import { PropTypes } from 'prop-types';

import Loader from '../../Loader';

class InfiniteScroller extends Component {
  static propTypes = {
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    pageNumber: PropTypes.number,
    loadMore: PropTypes.func,
    refChild: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    hasMore: true,
  };

  static debounce(func, wait, immediate) {
    let timeout;
    return function debouncer(...args) {
      const context = this;
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
    this.containerRef.current.addEventListener('scroll', InfiniteScroller.debounce(this.scrollHandler.bind(this), 200));
    console.log(this.props);
    if (initialLoad && loadMore && typeof loadMore === 'function') {
      loadMore(pageNumber);
    }
  }

  componentDidUpdate() {
    const { refChild, hasMore } = this.props;
    const { refChildHeight, showLoader } = this.state;

    if (refChild.current.clientHeight === refChildHeight && showLoader === false && hasMore) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showLoader: true,
      });
    }

    if (
      refChild.current.clientHeight > this.containerRef.current.clientHeight
      && refChild.current.clientHeight > refChildHeight && showLoader === true
      && refChildHeight
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showLoader: false,
      });
    }

    if (
      refChild.current.clientHeight < this.containerRef.current.clientHeight
      && hasMore
      && !this.stateChanged
    ) {
      this.loadMoreData();

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showLoader: true,
        refChildHeight: refChild.current.clientHeight,
      });

      this.stateChanged = true;
    }
  }

  componentWillUnmount() {
    this.containerRef.current.removeEventListener('scroll', this.scrollHandler.bind(this));
  }

  shouldLoad() {
    const { hasMore, refChild } = this.props;
    const { clientHeight, scrollTop } = this.containerRef.current;
    return (
      hasMore
      && (
        clientHeight + Math.round(scrollTop) === refChild.current.clientHeight)
    )
      || (hasMore && clientHeight > refChild.current.clientHeight);
  }

  loadMoreData() {
    const { loadMore, pageNumber } = this.props;

    if (loadMore && typeof loadMore === 'function') {
      loadMore(pageNumber + 1);
    }
  }

  scrollHandler() {
    const { refChild } = this.props;

    if (this.shouldLoad()) {
      this.loadMoreData();
      this.setState({
        refChildHeight: refChild.current.clientHeight,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { showLoader } = this.state;

    return (
      <div
        className="tyk-infinite-scroller"
      >
        <div
          className="tyk-infinite-scroller__wrapper"
          ref={this.containerRef}
        >
          { children }
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
