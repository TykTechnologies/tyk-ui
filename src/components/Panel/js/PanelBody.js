import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapsible from '../../Collapsible';
import { PortalContext } from '../panel-context';

export default class PanelBody extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    noPadding: PropTypes.bool,
  };

  getCssClasses() {
    const { noPadding } = this.props;
    const cssClasses = ['tyk-panel__body'];

    if (noPadding) {
      cssClasses.push('no-padding');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <PortalContext.Consumer>
        {
          portalContext => (
            portalContext.collapsable
              ? (
                <Collapsible
                  collapsed={portalContext.collapsed}
                  className={this.getCssClasses()}
                >
                  { children }
                </Collapsible>
              )
              : (
                <div
                  className={this.getCssClasses()}
                >
                  { children }
                </div>
              )
          )
        }
      </PortalContext.Consumer>
    );
  }
}
