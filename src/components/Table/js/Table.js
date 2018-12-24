import React, { Component } from 'react';
import { change, Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { isCollection } from 'immutable';

import { FieldPagination } from '../../Pagination';
import { Form } from '../../Form';
import '../sass/Table.scss';

class Table extends Component {
  static propTypes = {
    form: PropTypes.string,
    initialValues: PropTypes.object,
    onSearch: PropTypes.func,
    searchOnChange: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array
    ]),
    pages: PropTypes.number
  };

  state = {
    formValues: {},
    pagination: {},
    currentPage: 0
  }

  constructor(props) {
    super(props);

    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  handleTableSearch(values) {
    const { dispatch, form, onSearch } = this.props;
    const { currentPage } = this.state;
    let newValues = values.toMap();

    if(onSearch && typeof onSearch === 'function') {
      if(values.get('p') === currentPage) {
        dispatch(change(form, 'p', 0));
        newValues = newValues.set('p', 0);
      }

      onSearch(newValues);
    }
  }

  onPaginationChange(e, newValue, previousValue, name) {
    const { dispatch } = this.props;

    this.setState({
      currentPage: newValue
    }, () => {
      change(this.props.form, name, newValue);
    });
  }

  render() {
    const { form, pages, handleSubmit } = this.props;

    return (
      <div className="tyk-table">
        <Form
          onSubmit={ handleSubmit(this.handleTableSearch.bind(this)) }
        >
          { this.props.children }
          <Field
            component={ FieldPagination }
            name="p"
            onChange={ this.onPaginationChange }
            totalNrOfPages={ pages }
          />
        </Form>
      </div>
    );
  }
}

const checkIfValuesChanged = (prevValues, currentValues, acceptedFields) => {
  let fields = acceptedFields.slice(0);
  fields.push('p');

  let diffs = fields.filter((field) => {
    //hacky check for date range as it contains momentJS Object
    if(field === 'dateRange') {
      let previousDate = prevValues.get(field).toJS();
      let currentDate = currentValues.get(field).toJS();

      if(
        !previousDate.startDate.isSame(currentDate.startDate, 'day') ||
        !previousDate.endDate.isSame(currentDate.endDate, 'day')
      ) {
        return true;
      }
    } else {
      if(isCollection(currentValues.get(field)) && isCollection(prevValues.get(field))) {
        return !currentValues.get(field).equals(prevValues.get(field));
      } else if (!isCollection(currentValues.get(field)) && !isCollection(prevValues.get(field))) {
        return currentValues.get(field) !== prevValues.get(field);
      } else if (
        !isCollection(currentValues.get(field)) && isCollection(prevValues.get(field)) ||
        isCollection(currentValues.get(field)) && !isCollection(prevValues.get(field))
      ) {
        return true;
      }
    }

    return false;
  });

  return diffs.length > 0;
};

Table = reduxForm({
  enableReinitialize: true,
  onChange: (values, dispatch, props, previousValues) => {
    let newValues = values.toMap();

    if(
      (props.searchOnChange === true || checkIfValuesChanged(previousValues, values, props.searchOnChange))
      && props.onSearch
      && typeof props.onSearch === 'function'
    ) {
      if(values.get('p') === previousValues.get('p')) {
        dispatch(change(props.form, 'p', 0));
        newValues = newValues.set('p', 0);
      }

      if(props.dirty) {
        props.onSearch(newValues);
      }
    }
  }
})(Table);

export default Table;
