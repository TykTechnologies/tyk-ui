import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const shouldShowPage = (currentNr, pageNr, totalNrOfPages) => {
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

  if ([0, 1, totalNrOfPages - 1, totalNrOfPages].indexOf(currentNr) > -1) {
    return true;
  }

  return false;
};

const getPagesArr = (nrOfPages, selectedPage) => {
  let i; const
    pagesArr = [];

  for (i = 0; i <= nrOfPages; i += 1) {
    if (shouldShowPage(i, selectedPage, nrOfPages)) {
      if (i > pagesArr[pagesArr.length - 1]) {
        pagesArr.push('...');
      }
      pagesArr.push(i + 1);
    }
  }

  return pagesArr;
};

export default class Pagination extends Component {
  static propTypes = {
    value: PropTypes.number,
    totalNrOfPages: PropTypes.number,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const {
      value,
      totalNrOfPages,
    } = this.props;

    this.state = {
      prevProps: this.props,
      selectedPage: value || 0,
      pagesArray: getPagesArr(totalNrOfPages, value),
    };

    this.pageKey = 0;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.value !== prevState.prevProps.value
      || nextProps.totalNrOfPages !== prevState.prevProps.totalNrOfPages
    ) {
      return {
        selectedPage: nextProps.value,
        pagesArray: getPagesArr(nextProps.totalNrOfPages, nextProps.value),
      };
    }

    return null;
  }

  getPageCssClass(pageNr) {
    const { selectedPage } = this.state;
    const cssClasses = [];

    if (selectedPage === pageNr) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  }

  getPageKey() {
    this.pageKey += 1;

    return this.pageKey;
  }

  goToPage(pageNr) {
    const { onChange, totalNrOfPages } = this.props;
    this.setState({
      selectedPage: pageNr,
      pagesArray: getPagesArr(totalNrOfPages, pageNr),
    }, () => {
      if (onChange) {
        onChange(pageNr);
      }
    });
  }

  render() {
    const { totalNrOfPages } = this.props;
    const { pagesArray, selectedPage } = this.state;

    return (
      <Fragment>
        {
          totalNrOfPages
            ? (
              <ul className="tyk-pagination">
                {
                  selectedPage > 0 && totalNrOfPages > 5
                    ? (
                      <li>
                        <button onClick={this.goToPage.bind(this, selectedPage - 1)} type="button">Previous</button>
                      </li>
                    )
                    : null
                }
                {
                  pagesArray.map(pageNr => (
                    <li key={this.getPageKey()} className={this.getPageCssClass(pageNr - 1)}>
                      {
                        pageNr !== '...'
                          ? <button onClick={this.goToPage.bind(this, pageNr - 1)} type="button">{ pageNr }</button>
                          : <span>{ pageNr }</span>
                      }
                    </li>
                  ))
                }
                {
                  selectedPage < totalNrOfPages && totalNrOfPages > 5
                    ? (
                      <li>
                        <button onClick={this.goToPage.bind(this, selectedPage + 1)} type="button">Next</button>
                      </li>
                    )
                    : null
                }
              </ul>
            )
            : null
        }
      </Fragment>
    );
  }
}
