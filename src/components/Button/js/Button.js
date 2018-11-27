import React, { Component } from 'react';
import '../sass/button.scss';

export default class Button extends Component {
  render() {
    return (
      <button
        className="tyk-button tyk-button--default"
        type="button"
      >
        Button
      </button>
    );
  }
}
