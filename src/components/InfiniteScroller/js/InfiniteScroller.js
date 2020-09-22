import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { PropTypes } from 'prop-types';

import debounce from '../../../utils/debounce';
import { usePrevious, useComponentSize } from '../../../hooks';
import Loader from '../../Loader';

const InfiniteScroller = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const containerRef = useRef(null);
  const {
    children,
    hasMore,
    initialLoad,
    loadMore,
    pageNumber,
    refChild,
  } = props;
  const refChildSize = useComponentSize(refChild);

  useEffect(() => {
    if (initialLoad && loadMore && typeof loadMore === 'function') {
      setShowLoader(false);
      loadMore(pageNumber);
    }
  }, [initialLoad]);

  const shouldLoad = useCallback(() => {
    const { clientHeight, scrollTop } = containerRef.current;

    return (
      hasMore
      && (
        (clientHeight + Math.round(scrollTop) === refChildSize.height)
        || (clientHeight >= refChildSize.height)
      )
    );
  }, [containerRef, refChildSize.height]);

  const loadMoreData = useCallback(() => {
    if (loadMore && typeof loadMore === 'function' && hasMore) {
      loadMore(pageNumber + 1);
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [hasMore, pageNumber]);

  const prevPageNumber = usePrevious(pageNumber);
  const scrollHandler = useCallback(debounce(() => {
    if (shouldLoad() && prevPageNumber <= pageNumber) {
      loadMoreData();
    }
  }, 200), [loadMoreData, shouldLoad]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener('scroll', scrollHandler);
    }

    return () => {
      containerRef.current.removeEventListener('scroll', scrollHandler);
    };
  }, [containerRef, scrollHandler]);


  // if content resets (page number resets) scroll to top
  useEffect(() => {
    if (prevPageNumber > 0 && pageNumber === 0) {
      containerRef.current.scrollTop = 0;
    }
  }, [containerRef, pageNumber]);

  const prevRefChildSize = usePrevious(refChildSize);
  useEffect(() => {
    if (
      refChildSize && prevRefChildSize
      && refChildSize.height !== prevRefChildSize.height
      && showLoader === true
    ) {
      setShowLoader(false);
    }
  }, [showLoader, refChildSize.height]);

  useEffect(() => {
    if (
      refChild && refChildSize.height < containerRef.current.clientHeight
      && refChildSize.height
      && hasMore
    ) {
      loadMoreData();
    }
  }, [containerRef, refChildSize, refChild, hasMore]);

  return (
    <div
      className="tyk-infinite-scroller"
    >
      <div
        className="tyk-infinite-scroller__wrapper"
        ref={containerRef}
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
};

InfiniteScroller.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  hasMore: PropTypes.bool,
  initialLoad: PropTypes.bool,
  pageNumber: PropTypes.number,
  loadMore: PropTypes.func,
  refChild: PropTypes.instanceOf(Object),
};

InfiniteScroller.defaultProps = {
  hasMore: true,
};

export default InfiniteScroller;
