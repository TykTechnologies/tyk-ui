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
    className: PropTypes.string,
  };

  getCssClasses() {
    const { noPadding, className } = this.props;
    return [
      'tyk-panel__body',
      className,
      noPadding && 'no-padding',
    ].filter(Boolean).join(' ');
  }

  render() {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <PortalContext.Consumer>
        {
          portalContext => (
            portalContext.collapsable
              ? (
                <Collapsible
                  {...rest}
                  collapsed={portalContext.collapsed}
                  className={this.getCssClasses()}
                >
                  { children }
                </Collapsible>
              )
              : (
                <div
                  {...rest}
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
