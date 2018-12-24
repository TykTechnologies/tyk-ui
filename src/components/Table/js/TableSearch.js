import React, { Component } from 'react';

export default class TableSearch extends Component {
  render() {
    return (
      <div className="tyk-table-search">
        { this.props.children }
      </div>
    );
  }
}
