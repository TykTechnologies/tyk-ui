import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Message } from '../../Message';

export default class InfoNote extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ])
  };

  render() {
    return (
      <div className="tyk-info-note">
        <Message theme="info">
        { this.props.children }
        </Message>
      </div>
    );
  }
}
