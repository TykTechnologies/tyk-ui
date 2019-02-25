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

  for (i = 0; i <= nrOfPages; i++) {
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
    prevProps: PropTypes.object,
    value: PropTypes.number,
    nrItemsOnPage: PropTypes.number,
    totalNrOfPages: PropTypes.number,
    onChange: PropTypes.func,
  };

  state = {
    prevProps: this.props,
    selectedPage: this.props.value || 0,
    nrPages: this.props.totalNrOfPages,
    pagesArray: getPagesArr(this.props.totalNrOfPages, this.props.value),
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.prevProps.value || nextProps.totalNrOfPages !== prevState.prevProps.totalNrOfPages) {
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
                      <a onClick={this.goToPage.bind(this, selectedPage - 1)}>Previous</a>
                    </li>
                  )
                  : null
              }
              {
                pagesArray.map((pageNr, key) => (
                  <li key={key} className={this.getPageCssClass(pageNr - 1)}>
                    {
                        pageNr !== '...'
                          ? <a onClick={this.goToPage.bind(this, pageNr - 1)}>{ pageNr }</a>
                          : <span>{ pageNr }</span>
                      }
                  </li>
                ))
              }
              {
                selectedPage < totalNrOfPages && totalNrOfPages > 5
                  ? (
                    <li>
                      <a onClick={this.goToPage.bind(this, selectedPage + 1)}>Next</a>
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
