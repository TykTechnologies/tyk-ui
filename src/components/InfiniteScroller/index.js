import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { PropTypes } from 'prop-types';

import debounce from '../../utils/debounce';
import { usePrevious, useComponentSize } from '../../hooks';
import Loader from '../Loader';

function InfiniteScroller({
  children,
  hasMore = true,
  initialLoad,
  loadMore,
  pageNumber,
  refChild,
}) {
  const [showLoader, setShowLoader] = useState(false);
  const containerRef = useRef(null);
  const refChildSize = useComponentSize(refChild);

  useEffect(() => {
    if (initialLoad && typeof loadMore === 'function') {
      setShowLoader(false);
      loadMore(pageNumber);
    }
  }, [initialLoad]);

  const shouldLoad = useCallback(() => {
    if (!containerRef.current) return false;
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
    if (hasMore && typeof loadMore === 'function') {
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
    containerRef.current?.addEventListener('scroll', scrollHandler);
    return () => containerRef.current?.removeEventListener('scroll', scrollHandler);
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
    <div className="tyk-infinite-scroller">
      <div
        className="tyk-infinite-scroller__wrapper"
        ref={containerRef}
      >
        { children }
      </div>
      {showLoader && (
        <Loader position="absolute" />
      )}
    </div>
  );
}

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

export default InfiniteScroller;
