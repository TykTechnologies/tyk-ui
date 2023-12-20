import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

function shouldShowPage(currentNr, pageNr, totalNrOfPages) {
  const basePageNr = 5;
  const minimumNrOfPages = 10;

  if (totalNrOfPages < minimumNrOfPages) {
    return true;
  }

  if (
    pageNr < basePageNr
    && currentNr < basePageNr
  ) {
    return true;
  }

  if (
    pageNr > totalNrOfPages - basePageNr
    && currentNr > totalNrOfPages - basePageNr
  ) {
    return true;
  }

  if (
    currentNr >= pageNr - 2
    && currentNr <= pageNr + 2
  ) {
    return true;
  }

  if ([0, 1, totalNrOfPages - 1, totalNrOfPages].includes(currentNr)) {
    return true;
  }

  return false;
}

function getPagesArr(nrOfPages, selectedPage) {
  let i;
  const pagesArr = [];

  for (i = 0; i <= nrOfPages; i += 1) {
    if (shouldShowPage(i, selectedPage, nrOfPages)) {
      if (i > pagesArr.at(-1)) {
        pagesArr.push(`...-${i}`);
      }
      pagesArr.push(i + 1);
    }
  }

  return pagesArr;
}

function Pagination(props) {
  const {
    value = 0,
    totalNrOfPages,
    onChange,
  } = props;

  const [selectedPage, setSelectedPage] = useState(value);

  const pagesArray = useMemo(
    () => getPagesArr(totalNrOfPages, selectedPage),
    [selectedPage, totalNrOfPages],
  );

  function goToPage(pageNr) {
    setSelectedPage(pageNr);
    if (onChange) onChange(pageNr);
  }

  return (
    totalNrOfPages
      ? (
        <ul className="tyk-pagination">
          {selectedPage > 0 && totalNrOfPages > 5 && (
            <li>
              <button onClick={() => goToPage(selectedPage - 1)} type="button">Previous</button>
            </li>
          )}
          {
            pagesArray.map((pageNr) => (
              <li key={pageNr} className={selectedPage === pageNr - 1 ? 'active' : ''}>
                {
                  String(pageNr).startsWith('...')
                    ? <span>...</span>
                    : <button onClick={() => goToPage(pageNr - 1)} type="button">{ pageNr }</button>
                }
              </li>
            ))
          }
          {selectedPage < totalNrOfPages && totalNrOfPages > 5 && (
            <li>
              <button onClick={() => goToPage(selectedPage + 1)} type="button">Next</button>
            </li>
          )}
        </ul>
      )
      : null
  );
}

Pagination.propTypes = {
  value: PropTypes.number,
  totalNrOfPages: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
